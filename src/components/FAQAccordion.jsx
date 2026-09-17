import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui'
export function FAQAccordion({ items }) { return <Accordion type="single" collapsible>{items.map((item, index) => <AccordionItem key={item.question} value={`item-${index}`}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>)}</Accordion> }
