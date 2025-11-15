'use client';

import React, { useState } from 'react';
import { Clock, CreditCard, Truck, ChevronDown } from 'lucide-react';

type FAQItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  answer: string;
};

// Simple Accordion Components
const Accordion = ({ children, ...props }: { children: React.ReactNode; type: string; collapsible: boolean; className?: string }) => (
  <div {...props}>{children}</div>
);

const AccordionItem = ({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) => (
  <div data-value={value} className={className}>{children}</div>
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

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const faqItems: FAQItem[] = [
    {
      id: 'item-1',
      icon: Clock,
      question: 'What are your business hours?',
      answer:
        'Our customer service team is available Monday–Friday from 9:00 AM to 8:00 PM IST. Weekends: 10:00 AM to 6:00 PM IST. Holiday hours will be updated on our site.',
    },
    {
      id: 'item-2',
      icon: CreditCard,
      question: 'How do subscription payments work?',
      answer:
        'Payments are auto-charged monthly or annually to your saved card. Manage billing, update payment method, or view history in your account dashboard.',
    },
    {
      id: 'item-3',
      icon: Truck,
      question: 'Can I expedite my shipping?',
      answer:
        'Yes. Choose Express (1–2 days) or Same-Day (select cities) at checkout. Available for orders placed before 2:00 PM IST. International options vary.',
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="bg-[#1DCD9F] min-h-[400px] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
          
          {/* Title Section - Not sticky on mobile */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="md:sticky md:top-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                Frequently Asked <br className="sm:hidden" />
                <span >Questions</span>
              </h2>
              <p className="text-zinc-800 mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed">
                Can't find what you're looking for? Reach our{' '}
                <a
                  href="mailto:support@asija.in"
                  className="text-zinc-900 font-semibold  hover:text-white transition-colors"
                >
                  support team
                </a>
                {' '} we reply in under 2 hours.
              </p>
            </div>
          </div>

          {/* Accordion Section */}
          <div className="w-full">
            <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
              {faqItems.map((item, index) => {
                const Icon = item.icon;
                const isOpen = openItem === item.id;
                
                return (
                  <div
                    key={item.id}
                    className={`transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  >
                    <AccordionItem
                      value={item.id}
                      className="bg-[#2A2A2A] rounded-lg sm:rounded-xl shadow-lg border border-white/10 overflow-hidden hover:border-white/20 transition-all"
                    >
                      <AccordionTrigger 
                        className="px-4 sm:px-6 py-4 sm:py-5 group touch-manipulation"
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex items-center justify-between w-full gap-3">
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1DCD9F]/20 rounded-full flex items-center justify-center group-hover:bg-[#1DCD9F]/30 transition-colors flex-shrink-0">
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1DCD9F]" />
                            </div>
                            <span className="text-sm sm:text-base font-medium text-white group-hover:text-[#1DCD9F] transition-colors text-left">
                              {item.question}
                            </span>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </AccordionTrigger>
                      
                      <AccordionContent isOpen={isOpen}>
                        <div className="px-4 sm:px-6 md:px-14 pb-4 sm:pb-5 md:pb-6">
                          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          </div>

          {/* Mobile CTA */}
          <div className={`md:hidden text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a 
              href="mailto:support@asija.in"
              className="inline-block px-6 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-all active:scale-95 touch-manipulation shadow-lg"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}