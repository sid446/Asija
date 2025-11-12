'use client';

import React, { useRef } from 'react';
import { Inter } from 'next/font/google';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Button from './Button';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

function About() {
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  // Refs for both images
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);

  // Scroll progress for left image → move up 80px
  const { scrollYProgress: leftProgress } = useScroll({
    target: leftImageRef,
    offset: ['start end', 'end start'],
  });
  const leftY = useTransform(leftProgress, [0, 1], [0, -80]);

  // Scroll progress for right image → move up 100px
  const { scrollYProgress: rightProgress } = useScroll({
    target: rightImageRef,
    offset: ['start end', 'end start'],
  });
  const rightY = useTransform(rightProgress, [0, 1], [0, -100]);

  const aboutItems = [
    {
      id: 1,
      title: 'Our Mission',
      short: (
        <>
          To achieve significant presence in every region of India while delivering client-defined services on global standards.{' '}
          We provide balanced expertise in{' '}
          <span className="font-semibold text-[#1A3D64]">Audit, Taxation & Consultancy</span>, always placing clients' interests first.{' '}
          Our vision is to be the most respected CA firm in the country — known for unmatched quality, dedication, and being the top choice for both clients and aspiring Chartered Accountants.
        </>
      ),
      full: (
        <>
          Achieve significant presence in every region of the country.<br />
          Provide client-defined, quality services on global standards.<br />
          Deliver balanced threefold services in Audit, Taxation & Consultancy.<br />
          Place clients' interests ahead of the firm.<br />
          Emerge as a leader among CA firms through dedication and quality.<br />
          <br />
          Our vision is to be a well-recognized firm that excellently meets client needs and remains the preferred choice for trainees. At{' '}
          <strong>Asija & Associates LLP</strong>, we continuously seek value-added knowledge — for our people, our clients, and society — blending professionalism with high service standards in pursuit of excellence.
        </>
      ),
    },
    {
      id: 2,
      title: 'Our Rich History',
      short: (
        <>
          Founded on <span className="font-semibold text-[#1A3D64]">1st April 1986</span> by{' '}
          <span className="font-semibold text-[#1A3D64]">CA Uttam Chandra Asija</span>, we have grown over the past 39+ years into one of Lucknow’s most trusted and prominent Chartered Accountancy firms.{' '}
          From day one, our foundation has been built on unwavering commitment to client satisfaction and excellence across Accounting, Auditing, Taxation, Assurance and Business Advisory services.
        </>
      ),
      full: (
        <>
          With over 39 years of excellence, we are one of the most prominent Chartered Accountancy firms in Lucknow, delivering a wide array of financial and advisory services to Government, Corporate, and Private Sector clients.<br />
          <br />
          On 1st April 1986, <strong>CA Uttam Chandra Asija (Founder)</strong> established the firm with a strong emphasis on client satisfaction and excellence in Accounting, Auditing, Taxation, Assurance, and Business Advisory services.
        </>
      ),
    },
    {
      id: 3,
      title: 'Area & Infrastructure',
      short: (
        <>
          Spread across an expansive <span className="font-semibold text-[#1A3D64]">6,050 sq. ft.</span> — one of the largest CA offices in Lucknow — our fully air-conditioned head office is located in the prime commercial hub of the city with 100% power backup.{' '}
          The space is thoughtfully divided into dedicated verticals: Audit & Assurance (2,800 sq. ft.), Taxation (1,250 sq. ft.), and Corporate Law + Admin (2,000 sq. ft.).
        </>
      ),
      full: (
        <>
          Our firm spans a sprawling 6,050 sq. ft. — one of the largest CA offices in Lucknow. Fully air-conditioned with 100% power backup via generators and inverters.<br />
          <br />
          Strategically located in the commercial heart of Lucknow, our Head Office is divided into dedicated verticals:<br />
          • Audit & Assurance: 2,800 sq. ft.<br />
          • Direct & Indirect Taxation: 1,250 sq. ft.<br />
          • Corporate Law + Admin & HR: 2,000 sq. ft.<br />
          <br />
          We are committed to fostering an environment that nurtures personal and professional growth for all our team members.
        </>
      ),
    },
  ];

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`w-screen min-h-screen bg-[#F4F4F4] flex flex-col lg:flex-row ${inter.variable} font-sans`}
    >
      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-full lg:w-[20%] border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-400 py-10 text-[#1A3D64] flex flex-col">
        <div className="flex items-center gap-3">
         
          
        </div>

        {/* LEFT IMAGE - SCROLL UP 80px */}
        <div ref={leftImageRef} className="mt-100 px-6">
          <motion.div style={{ y: leftY }}>
            <img
              src="/about1.jpg"
              alt="About Asija & Associates"
              className="w-full max-w-xs mx-auto lg:mx-0 shadow-md"
            />
          </motion.div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="w-full lg:w-[55%] px-6 lg:px-15 pt-5 lg:pt-10 pb-10 lg:pb-20 flex flex-col gap-10 text-[#262D33]">
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-[#0C2B4E] mb-10">About Us</h2>
          <p className="text-3xl lg:text-4xl font-semibold leading-tight">
            <span className="text-[#1A3D64]">Asija & Associates LLP</span>, Chartered Accountants was established on{' '}
            <span className="text-[#1A3D64]">1st April 1986</span> by our founder member{' '}
            <span className="text-[#1A3D64]">CA. Uttam Chandra Asija</span> with the aim of providing a wide range of Accounting and Financial services to clients in Government, Corporate & Private Sectors.
          </p>

          <p className="text-xl leading-loose max-w-4xl">
            Over the years, the firm has been built around a team of seasoned professionals possessing vast experience in the areas of auditing, accounting, taxation, company law matters, along with a host of other financial services.
          </p>
        </section>

        {/* ── EXPANDABLE GRID ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 mb-12 mt-12">
          {aboutItems.map((item) => {
            const isOpen = expandedId === item.id;

            return (
              <motion.article
                key={item.id}
                layout
                onClick={() => toggleExpand(item.id)}
                className="cursor-pointer border-b-2 border-transparent hover:border-[#69213f] transition-colors pb-4"
              >
                <h3 className="text-2xl font-bold text-[#1A3D64] mb-2">{item.title}</h3>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? 'full' : 'short'}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm lg:text-base leading-relaxed text-[#262D33]">
                      {isOpen ? item.full : item.short}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-1 mt-2 text-[#1A3D64] text-sm font-medium">
                  {isOpen ? (
                    <>
                      Tap to collapse <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      ... Read More <ChevronDown size={16} />
                    </>
                  )}
                </div>
              </motion.article>
            );
          })}
        </section>
        <Button 
  label="Learn More"
  link="/test"
  color1="#69213f"      // red background
  textColor="#ffffff"    // white text/arrow
  position="left"
/>
      </main>

      {/* ── RIGHT SIDEBAR - SCROLL UP 100px ── */}
      <aside className="w-full lg:w-[25%] border-t-2 lg:border-t-0 lg:border-l-2 border-zinc-400 p-5 lg:p-8 flex items-start justify-center lg:justify-start">
        <div ref={rightImageRef} className="w-full max-w-md mt-20 ">
          <motion.div style={{ y: rightY }}>
            <img
              src="/about2.jpg"
              alt="Office Infrastructure"
              className="w-full h-auto object-cover shadow-md"
            />
          </motion.div>
        </div>
      </aside>
    </div>
  );
}

export default About;