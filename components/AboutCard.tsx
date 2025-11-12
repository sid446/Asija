// components/AboutCard.tsx
import React from 'react';

type AboutCardProps = {
  image: string;
  title: string;
  description: string;
  buttonContent?: string;
};

const AboutCard = ({ image, title, description, buttonContent = 'Learn More' }: AboutCardProps) => {
  return (
    <div className="group w-full max-w-sm mx-auto bg-[#222222] border-t-4 border-[#1DCD9F] shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-300 group-hover:text-[#1DCD9F] transition-colors duration-300">
          {title}
        </h2>
        <p className="text-sm lg:text-base leading-relaxed text-gray-400 line-clamp-3">
          {description}
        </p>

        {/* Button with fallback */}
        <button className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1DCD9F] rounded-full overflow-hidden transition-all duration-300 group-hover:bg-zinc-600 group-hover:text-[#1DCD9F] focus:outline-none focus:ring-2 focus:ring-[#1DCD9F] focus:ring-offset-2 focus:ring-offset-[#222222]">
          <span className="relative z-10">{buttonContent}</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default AboutCard;