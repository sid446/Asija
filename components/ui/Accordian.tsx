"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-gray-200 dark:border-gray-700", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center text-white justify-between py-4 text-left font-semibold transition-all group",
          className,
        )}
        onClick={(e) => {
          const state = e.currentTarget.getAttribute('data-state');
          setIsOpen(state === 'open');
        }}
        {...props}
      >
        {children}
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChevronDown
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </motion.div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden"
    {...props}
  >
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2, ease: "easeInOut" }
      }}
    >
      <div className={cn("pb-4 pt-0 text-sm", className)}>{children}</div>
    </motion.div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Demo Component
export default function AccordionDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Find answers to common questions below
        </p>
        
        <Accordion type="single" collapsible className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6 text-slate-900 dark:text-slate-100">
              What is Framer Motion?
            </AccordionTrigger>
            <AccordionContent className="px-6 text-slate-700 dark:text-slate-300">
              Framer Motion is a production-ready motion library for React. It provides simple yet powerful animations with declarative syntax, making it easy to add smooth transitions and interactions to your components.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="px-6 text-slate-900 dark:text-slate-100">
              How do I install it?
            </AccordionTrigger>
            <AccordionContent className="px-6 text-slate-700 dark:text-slate-300">
              You can install Framer Motion using npm or yarn. Simply run: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">npm install framer-motion</code> or <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">yarn add framer-motion</code>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="px-6 text-slate-900 dark:text-slate-100">
              What are the benefits of using motion?
            </AccordionTrigger>
            <AccordionContent className="px-6 text-slate-700 dark:text-slate-300">
              Motion animations improve user experience by providing visual feedback, guiding attention, and making interfaces feel more responsive and polished. They help users understand state changes and create a more engaging interaction.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="px-6 text-slate-900 dark:text-slate-100">
              Can I customize the animations?
            </AccordionTrigger>
            <AccordionContent className="px-6 text-slate-700 dark:text-slate-300">
              Absolutely! Framer Motion offers extensive customization options. You can adjust duration, easing functions, stagger effects, and create complex animation sequences. The transition prop accepts various configuration options to fine-tune your animations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };