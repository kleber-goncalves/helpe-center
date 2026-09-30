import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui";
export function FAQAccordion({ items }) {
    return (
        <Accordion type="single" collapsible >
            {items.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`} className="border-border/80 ">
                    <AccordionTrigger className=" py-5 text-left font-display text-base  text-foreground hover:no-underline hover:text-coral [&>svg]:size-5 [&>svg]:text-muted-foreground">
                        <span className="flex items-start gap-3">
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                            {item.question}
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-[18px] text-base leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
