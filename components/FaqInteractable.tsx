'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CreditCard, Truck, ChevronDown, HelpCircle } from 'lucide-react';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';

type FAQItem = {
  _id: string;
  question: string;
  answer: string;
};

// Simple Accordion Components
const Accordion = ({ children, ...props }: { children: React.ReactNode; type: string; collapsible: boolean; className?: string }) => (
  <div {...props}>{children}</div>
);

const AccordionItem = ({ children, value, className, style }: { children: React.ReactNode; value: string; className?: string; style?: React.CSSProperties }) => (
  <div data-value={value} className={className} style={style}>{children}</div>
);

const AccordionTrigger = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <button onClick={onClick} className={`w-full text-left ${className}`}>
    {children}
  </button>
);

const AccordionContent = ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => (
  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
    {children}
  </div>
);

export default function FAQAccordion() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setIsVisible(true);
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/admin/faq');
      const data = await res.json();
      if (Array.isArray(data)) {
        setFaqs(data);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const getIcon = (index: number) => {
    const icons = [Clock, CreditCard, Truck];
    return icons[index % icons.length];
  };

  return (
    <section className="bg-[#009edb] min-h-[400px] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
          
          {/* Title Section - Not sticky on mobile */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="md:sticky md:top-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Frequently Asked <br className="sm:hidden" />
                <span >Questions</span>
              </h2>
              <p className="text-white/90 mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed">
                Can't find what you're looking for? Reach our{' '}
                <a
                  href="mailto:support@asija.in"
                  className="text-white font-semibold  hover:text-white/80 transition-colors"
                >
                  support team
                </a>
                {' '} we reply in under 2 hours.
              </p>
            </div>
          </div>

          {/* Accordion Section */}
          <div className="w-full">
            {loading ? (
              <div className="text-white text-center">Loading FAQs...</div>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
                {faqs.map((item, index) => {
                  const Icon = getIcon(index);
                  const isOpen = openItem === item._id;
                  
                  return (
                    <div
                      key={item._id}
                      className={`transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    >
                      <AccordionItem
                        value={item._id}
                        className="rounded-lg sm:rounded-xl shadow-lg border border-white/10 overflow-hidden hover:border-white/20 transition-all"
                        style={{ backgroundColor: '#000000' }}
                      >
                        <AccordionTrigger 
                          className="px-4 sm:px-6 py-4 sm:py-5 group touch-manipulation"
                          onClick={() => toggleItem(item._id)}
                        >
                          <div className="flex items-center justify-between w-full gap-3">
                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#009edb]/20 rounded-full flex items-center justify-center group-hover:bg-[#009edb]/30 transition-colors shrink-0">
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#009edb]" />
                              </div>
                              <span className="text-sm sm:text-base font-medium group-hover:text-[#009edb] transition-colors text-left" style={{ color: 'white' }}>
                                {item.question}
                              </span>
                            </div>
                            <ChevronDown 
                              className={`w-5 h-5 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                            />
                          </div>
                        </AccordionTrigger>
                        
                        <AccordionContent isOpen={isOpen}>
                          <div className="px-4 sm:px-6 md:px-14 pb-4 sm:pb-5 md:pb-6">
                            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              {item.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  );
                })}
              </Accordion>
            )}
          </div>




          {/* Mobile CTA */}
          <div className={`md:hidden text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="mailto:support@asija.in">
              <InteractiveHoverButton
                text="Contact Support"
                className="w-full justify-center"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}