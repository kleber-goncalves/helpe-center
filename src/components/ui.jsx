import { forwardRef } from "react";

import { Check, ChevronDown, X } from "lucide-react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "../lib/utils";

/* =========================================================
   BUTTON
========================================================= */

export const Button = forwardRef(function Button({ className, variant = "default", ...props }, ref) {
    const variants = {
        default: "bg-ink text-white hover:bg-[#1d4a60]",

        outline: "border border-line bg-white text-ink hover:bg-mist",

        coral: "bg-coral-button text-white hover:bg-coral-button-hover",
    };

    return <button ref={ref} className={cn(["inline-flex min-h-11", "cursor-pointer", "items-center justify-center", "gap-2", "rounded-lg", "px-4", "text-sm font-semibold", "transition-colors", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-ink", "focus-visible:ring-offset-2", "disabled:´pointer-events-none", "disabled:opacity-60"].join(" "), variants[variant], className)} {...props} />;
});

/* =========================================================
   CARD
========================================================= */

export function Card({ className, ...props }) {
    return <div className={cn("min-w-0 rounded-xl border border-line bg-white", className)} {...props} />;
}

/* =========================================================
   BADGE
========================================================= */

export function Badge({ children, className }) {
    return <span className={cn(["inline-flex shrink-0", "items-center justify-center", "whitespace-nowrap", "rounded-full", "bg-[#edf4f5]", "px-2.5", "text-xs font-semibold", "text-[#31566a]"].join(" "), className)}>{children}</span>;
}

/* =========================================================
   SEPARATOR
========================================================= */

export function Separator({ className }) {
    return <div className={cn("h-px bg-line", className)} />;
}

/* =========================================================
   INPUT
========================================================= */

export const Input = forwardRef(function Input({ className, type = "text", ...props }, ref) {
    return <input ref={ref} type={type} className={cn(["flex h-11 w-full", "rounded-lg", "border border-line", "bg-background", "px-3", "text-sm text-foreground", "shadow-none", "outline-none", "transition-[border-color,box-shadow,background-color]", "placeholder:text-muted-foreground", "focus:border-coral", "focus:ring-2", "focus:ring-coral/15", "disabled:cursor-not-allowed", "disabled:opacity-60", "aria-invalid:border-coral", "aria-invalid:ring-2", "aria-invalid:ring-coral/15"].join(" "), className)} {...props} />;
});

/* =========================================================
   TEXTAREA
========================================================= */

export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(["flex min-h-32 w-full", "resize-y", "rounded-lg", "border border-line", "bg-background", "px-3 py-3", "text-sm leading-6 text-foreground", "shadow-none", "outline-none", "transition-[border-color,box-shadow,background-color]", "placeholder:text-muted-foreground", "focus:border-coral", "focus:ring-2", "focus:ring-coral/15", "disabled:cursor-not-allowed", "disabled:opacity-60", "aria-invalid:border-coral", "aria-invalid:ring-2", "aria-invalid:ring-coral/15"].join(" "), className)} {...props} />;
});

/* =========================================================
   FIELD
========================================================= */

export function Field({ className, children, ...props }) {
    return (
        <div className={cn("grid gap-2", className)} {...props}>
            {children}
        </div>
    );
}

/* =========================================================
   FIELD GROUP
========================================================= */

export function FieldGroup({ className, ...props }) {
    return <div className={cn("grid gap-6", className)} {...props} />;
}

/* =========================================================
   FIELD LABEL
========================================================= */

export function FieldLabel({ className, ...props }) {
    return <label className={cn(["text-sm", "font-bold", "leading-none", "text-foreground", "peer-disabled:cursor-not-allowed", "peer-disabled:opacity-60"].join(" "), className)} {...props} />;
}

/* =========================================================
   FIELD DESCRIPTION
========================================================= */

export function FieldDescription({ className, ...props }) {
    return <p className={cn(["text-sm", "leading-6", "text-muted-foreground"].join(" "), className)} {...props} />;
}

/* =========================================================
   FIELD ERROR
========================================================= */

export function FieldError({ className, children, ...props }) {
    if (!children) {
        return null;
    }

    return (
        <p role="alert" className={cn(["text-sm", "font-medium", "leading-5", "text-coral"].join(" "), className)} {...props}>
            {children}
        </p>
    );
}

/* =========================================================
   SELECT
========================================================= */

export const Select = SelectPrimitive.Root;

/* =========================================================
   SELECT VALUE
========================================================= */

export const SelectValue = SelectPrimitive.Value;

/* =========================================================
   SELECT TRIGGER
========================================================= */

export const SelectTrigger = forwardRef(function SelectTrigger({ className, children, ...props }, ref) {
    return (
        <SelectPrimitive.Trigger ref={ref} className={cn(["flex h-11 w-full", "items-center justify-between", "gap-2", "rounded-lg", "border border-line", "bg-background", "px-3", "text-sm text-foreground", "outline-none", "transition-[border-color,box-shadow,background-color]", "focus:border-coral", "focus:ring-2", "focus:ring-coral/15", "disabled:cursor-not-allowed cursor-pointer", "disabled:opacity-60", "data-[placeholder]:text-muted-foreground", "aria-invalid:border-coral", "aria-invalid:ring-2", "aria-invalid:ring-coral/15", "[&>span]:line-clamp-1"].join(" "), className)} {...props}>
            {children}

            <SelectPrimitive.Icon asChild>
                <ChevronDown className="size-4 shrink-0 text-muted-ink transition-transform" aria-hidden="true" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
});

/* =========================================================
   SELECT CONTENT
========================================================= */

export const SelectContent = forwardRef(function SelectContent({ className, position = "popper", children, ...props }, ref) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content ref={ref} position={position} sideOffset={4} className={cn(["relative", "z-[100]", "max-h-72", "min-w-[8rem]", "overflow-hidden", "rounded-lg", "border border-line", "bg-background", "p-1", "text-foreground", "shadow-lift"].join(" "), className)} {...props}>
                <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
});

/* =========================================================
   SELECT ITEM
========================================================= */

export const SelectItem = forwardRef(function SelectItem({ className, children, ...props }, ref) {
    return (
        <SelectPrimitive.Item ref={ref} className={cn(["relative", "flex h-10 w-full", "cursor-pointer", "select-none", "items-center", "rounded-md", "py-2 pl-8 pr-3", "text-sm", "outline-none", "transition-colors", "focus:bg-mist", "focus:text-foreground", "data-[disabled]:pointer-events-none", "data-[disabled]:opacity-50"].join(" "), className)} {...props}>
            <span className="absolute left-2 flex size-4 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <Check className="size-4 text-coral" strokeWidth={2} aria-hidden="true" />
                </SelectPrimitive.ItemIndicator>
            </span>

            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
});

/* =========================================================
   ACCORDION
========================================================= */

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ children, value }) {
    return (
        <AccordionPrimitive.Item value={value} className="border-b border-line text-base">
            {children}
        </AccordionPrimitive.Item>
    );
}

export function AccordionTrigger({ children }) {
    return (
        <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className={["group flex w-full", "cursor-pointer", "items-center justify-between", "gap-4", "py-5", "text-left", "font-semibold text-ink", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-ink/30", "hover:text-coral"].join(" ")}>
                {children}

                <ChevronDown className="h-5 w-5 text-muted-ink transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

export function AccordionContent({ children }) {
    return (
        <AccordionPrimitive.Content className="pb-6 pl-[18px] text-base leading-relaxed text-muted-foreground">
            <div>{children}</div>
        </AccordionPrimitive.Content>
    );
}

/* =========================================================
   SHEET
========================================================= */

export const Sheet = Dialog.Root;

export const SheetTrigger =
    Dialog.Trigger;

export const SheetTitle =
    Dialog.Title;

export const SheetDescription =
    Dialog.Description;

export const SheetClose =
    Dialog.Close;

export function SheetContent({
    children,
    className,
    side = "right",
    ...props
}) {
    const sideClasses = {
        right: [
            "inset-y-0 right-0",
            "border-l border-line",
        ],

        left: [
            "inset-y-0 left-0",
            "border-r border-line",
        ],
    };

    return (
        <Dialog.Portal>
            {/* Overlay */}
            <Dialog.Overlay
                className={[
                    "fixed inset-0 z-40",
                    "bg-ink/30",
                    "data-[state=open]:animate-in",
                    "data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0",
                    "data-[state=open]:fade-in-0",
                ].join(" ")}
            />

            {/* Content */}
            <Dialog.Content
                className={cn(
                    [
                        "fixed z-50",
                        "flex flex-col",
                        "bg-paper",
                        "shadow-xl",
                        "outline-none",

                        "data-[state=open]:animate-in",
                        "data-[state=closed]:animate-out",

                        "data-[state=closed]:duration-200",
                        "data-[state=open]:duration-300",

                        side === "right"
                            ? "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
                            : "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
                    ].join(" "),
                    sideClasses[side]?.join(
                        " ",
                    ),
                    className,
                )}
                {...props}
            >
                {/* 
                 * Botão padrão do Radix.
                 *
                 * O MobileHeader pode escondê-lo usando:
                 * [&>button]:hidden
                 */}
                <Dialog.Close
                    className={[
                        "absolute right-4 top-4",
                        "z-10",
                        "inline-flex size-8",
                        "items-center justify-center",
                        "rounded-md",
                        "text-muted-ink",
                        "transition-colors",
                        "hover:bg-mist",
                        "hover:text-ink",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-ink/30",
                    ].join(" ")}
                    aria-label="Fechar menu"
                >
                    <X
                        className="size-5"
                        aria-hidden="true"
                    />
                </Dialog.Close>

                {children}
            </Dialog.Content>
        </Dialog.Portal>
    );
}
