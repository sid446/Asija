import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Otp from '@/models/Otp';
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Restrict login to @asija.in domain only
        if (!credentials.email.endsWith('@asija.in')) {
          throw new Error('Only @asija.in addresses are allowed');
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found");
        }

        const maybeOtp = String(credentials.password || '');
        const isOtp = /^\d{6}$/.test(maybeOtp);

        if (isOtp) {
          // verify OTP from Otp collection
          const otpDoc = await Otp.findOne({ email: credentials.email });
          if (!otpDoc || otpDoc.otp !== maybeOtp) {
            throw new Error('Invalid OTP');
          }

          // consume OTP
          await Otp.deleteOne({ email: credentials.email });

          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
        }

        // Fallback to password-based login
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // ensure TS knows 'role' may exist on the user object
        (token as any).role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
