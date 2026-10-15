"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS, type FaqItem } from "@/lib/faq-data";

export { FAQ_ITEMS };

export function FaqSection({
  items = FAQ_ITEMS as unknown as FaqItem[],
  limit,
}: {
  items?: FaqItem[];
  limit?: number;
}) {
  const shown = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <Accordion type="single" collapsible className="w-full">
      {shown.map((item, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="mb-3 overflow-hidden rounded-xl border border-border bg-card shadow-sm last:border-b"
        >
          <AccordionTrigger className="px-5 py-4 text-left font-heading text-[15px] font-bold text-foreground hover:no-underline sm:px-6 sm:text-base">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground sm:px-6">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
