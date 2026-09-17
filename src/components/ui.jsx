import { ChevronDown, X } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../lib/utils";

export function Button({ className, variant = "default", ...props }) {
    const variants = { default: "bg-ink text-white hover:bg-[#1d4a60]", outline: "border border-line bg-white text-ink hover:bg-mist", coral: "bg-coral text-white hover:bg-[#cf5f4b]" };
    return <button className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2", variants[variant], className)} {...props} />;
}
export function Card({ className, ...props }) {
    return <div className={cn("rounded-xl border border-line bg-white", className)} {...props} />;
}
export function Badge({ children, className }) {
    return <span className={cn("rounded-full bg-[#edf4f5] px-2.5 py-1 text-xs font-semibold text-[#31566a]", className)}>{children}</span>;
}
export function Separator({ className }) {
    return <div className={cn("h-px bg-line", className)} />;
}
export const Accordion = AccordionPrimitive.Root;
export function AccordionItem({ children, value }) {
    return (
        <AccordionPrimitive.Item value={value} className="border-b border-line">
            {children}
        </AccordionPrimitive.Item>
    );
}
export function AccordionTrigger({ children }) {
    return (
        <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30">
                {children}
                <ChevronDown className="h-5 w-5 text-muted-ink transition-transform group-data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}
export function AccordionContent({ children }) {
    return (
        <AccordionPrimitive.Content className="overflow-hidden text-sm leading-6 text-muted-ink">
            <div className="pb-5">{children}</div>
        </AccordionPrimitive.Content>
    );
}
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export function SheetContent({ children }) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/30" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,360px)] flex-col bg-paper p-6 shadow-xl">
                <Dialog.Close className="ml-auto rounded-lg p-2 hover:bg-mist" aria-label="Fechar menu">
                    <X className="h-5 w-5" />
                </Dialog.Close>
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    );
}
