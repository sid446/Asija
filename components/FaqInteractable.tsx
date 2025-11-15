// components/FAQAccordion.tsx
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordian';
import { Clock, CreditCard, Truck, Globe, Package } from 'lucide-react';
import { motion } from 'framer-motion';

type FAQItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  answer: string;
};

export default function FAQAccordion() {
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

  return (
    <section className="bg-[#1DCD9F] h-[52vh] py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* LEFT: Sticky Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <div className="sticky top-24">
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-zinc-900">
                Frequently Asked <span className="text-[#1DCD9F]">Questions</span>
              </h2>
              <p className="text-zinc-800 mt-4 text-lg">
                Can’t find what you’re looking for? Reach our{' '}
                <a
                  href="mailto:support@asija.in"
                  className="text-zinc-900 font-medium"
                >
                  support team
                </a>{' '}
                 we reply in under 2 ho urs.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Accordion */}
          <div className="md:w-2/3   ">
            <Accordion type="single" collapsible className="w-full space-y-3 ">
              {faqItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={item.id}
                      className="bg-[#2A2A2A] rounded-xl shadow-md border border-white/10 overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-5  group">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-[#1DCD9F]/20 rounded-full flex items-center justify-center group-hover:bg-[#1DCD9F]/30 transition-colors">
                            <Icon className="w-5 h-5 text-[#1DCD9F]" />
                          </div>
                          <span className="text-sm font-medium text-white group-hover:text-[#1DCD9F] transition-colors">
                            {item.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-14 pb-6">
                          <p className="text-white/70  leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}