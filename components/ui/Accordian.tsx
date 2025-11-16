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



export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };