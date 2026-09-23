import { useEffect, useRef, useState } from "react";

import { Check, Send } from "lucide-react";

import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "./ui";

import { SUPPORT_ENDPOINT } from "./support";

import { categories, devices, questionSchema } from "../schemas/questionSchema";

const REQUEST_TIMEOUT = 15000;

const INITIAL_FORM = {
    category: "",
    message: "",
    name: "",
    contact: "",
    device: "",
};

/* =========================================================
   CONTACT MASK
========================================================= */

    function formatContactValue(value) {
        /*
         * Se a pessoa começou a digitar um e-mail,
         * não aplicamos máscara de telefone.
         */
        if (/[a-zA-Z@]/.test(value)) {
            return value;
        }

        const digits = value.replace(/\D/g, "");

        if (!digits) {
            return "";
        }

        let nationalDigits = digits;
        let countryPrefix = "";

        /*
         * DDI Brasil.
         */
        if (digits.length > 11 && digits.startsWith("55")) {
            countryPrefix = "+55 ";
            nationalDigits = digits.slice(2);
        }

        nationalDigits = nationalDigits.slice(0, 11);

        /*
         * Apenas DDD.
         */
        if (nationalDigits.length <= 2) {
            return countryPrefix + nationalDigits;
        }

        const ddd = nationalDigits.slice(0, 2);

        const phone = nationalDigits.slice(2);

        /*
         * Celular.
         */
        if (phone.startsWith("9")) {
            const firstPart = phone.slice(0, 5);

            const secondPart = phone.slice(5, 9);

            return `${countryPrefix}(${ddd}) ${firstPart}${secondPart ? `-${secondPart}` : ""}`;
        }

        /*
         * Fixo.
         */
        const firstPart = phone.slice(0, 4);

        const secondPart = phone.slice(4, 8);

        return `${countryPrefix}(${ddd}) ${firstPart}${secondPart ? `-${secondPart}` : ""}`;
    }

/* =========================================================
   COMPONENT
========================================================= */

export function QuestionForm() {
    const [form, setForm] = useState(INITIAL_FORM);

    const [errors, setErrors] = useState({});

    const [submitting, setSubmitting] = useState(false);

    const [submitted, setSubmitted] = useState(false);

    const categoryRef = useRef(null);

    const messageRef = useRef(null);

    const nameRef = useRef(null);

    const contactRef = useRef(null);

    const deviceRef = useRef(null);

    const successHeadingRef = useRef(null);

    const formErrorRef = useRef(null);

    /* =====================================================
       SUCCESS FOCUS
    ====================================================== */

    useEffect(() => {
        if (!submitted) {
            return;
        }

        requestAnimationFrame(() => {
            successHeadingRef.current?.focus();
        });
    }, [submitted]);

    /* =====================================================
       GENERAL ERROR FOCUS
    ====================================================== */

    useEffect(() => {
        if (!errors.form) {
            return;
        }

        requestAnimationFrame(() => {
            formErrorRef.current?.focus();
        });
    }, [errors.form]);

    /* =====================================================
       INPUT / TEXTAREA
    ====================================================== */

    function handleChange(event) {
        const { name, value } = event.target;

        const nextValue = name === "contact" ? formatContactValue(value) : value;

        setForm((current) => ({
            ...current,
            [name]: nextValue,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
            form: "",
        }));
    }

    /* =====================================================
       SELECT
    ====================================================== */

    function handleSelectChange(name, value) {
        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
            form: "",
        }));
    }

    /* =====================================================
       FIELD VALIDATION
    ====================================================== */

    function validateField(fieldName, value = form[fieldName]) {
        const fieldSchema = questionSchema.shape[fieldName];

        if (!fieldSchema) {
            return true;
        }

        const result = fieldSchema.safeParse(value);

        if (result.success) {
            setErrors((current) => ({
                ...current,
                [fieldName]: "",
            }));

            return true;
        }

        const message = result.error.issues?.[0]?.message || "Valor inválido.";

        setErrors((current) => ({
            ...current,
            [fieldName]: message,
            form: "",
        }));

        return false;
    }

    /* =====================================================
       FOCUS FIRST INVALID
    ====================================================== */

    function focusFirstInvalidField(fieldErrors) {
        const fieldOrder = ["category", "message", "name", "contact", "device"];

        const firstInvalidField = fieldOrder.find((field) => fieldErrors[field]);

        if (!firstInvalidField) {
            return;
        }

        const refs = {
            category: categoryRef,

            message: messageRef,

            name: nameRef,

            contact: contactRef,

            device: deviceRef,
        };

        requestAnimationFrame(() => {
            refs[firstInvalidField]?.current?.focus();
        });
    }

    /* =====================================================
       SERVER FIELD ERRORS
    ====================================================== */

    function applyServerErrors(fieldErrors) {
        const nextErrors = {
            category: fieldErrors?.category?.[0] || "",

            message: fieldErrors?.message?.[0] || "",

            name: fieldErrors?.name?.[0] || "",

            contact: fieldErrors?.contact?.[0] || "",

            device: fieldErrors?.device?.[0] || "",
        };

        setErrors(nextErrors);

        focusFirstInvalidField(nextErrors);
    }

    /* =====================================================
       SUBMIT
    ====================================================== */

    async function handleSubmit(event) {
        event.preventDefault();

        if (submitting) {
            return;
        }

        /* ===============================================
           FRONTEND ZOD
        ============================================== */

        const result = questionSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const nextErrors = {
                category: fieldErrors.category?.[0] || "",

                message: fieldErrors.message?.[0] || "",

                name: fieldErrors.name?.[0] || "",

                contact: fieldErrors.contact?.[0] || "",

                device: fieldErrors.device?.[0] || "",
            };

            setErrors(nextErrors);

            focusFirstInvalidField(nextErrors);

            return;
        }

        /* ===============================================
           VALID DATA
        ============================================== */

        const validData = result.data;

        setErrors({});

        setSubmitting(true);

        setSubmitted(false);

        /* ===============================================
           BODY
        ============================================== */

        const body = new URLSearchParams();

        body.set("category", validData.category);

        body.set("message", validData.message);

        body.set("name", validData.name);

        body.set("contact", validData.contact);

        body.set("device", validData.device);

        body.set("website", "");

        /* ===============================================
           TIMEOUT
        ============================================== */

        const controller = new AbortController();

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, REQUEST_TIMEOUT);

        try {
            const response = await fetch(SUPPORT_ENDPOINT, {
                method: "POST",

                headers: {
                    Accept: "application/json",
                },

                body,

                signal: controller.signal,
            });

            let payload = null;

            try {
                payload = await response.json();
            } catch {
                payload = null;
            }

            /* ===========================================
               SERVER VALIDATION
            ========================================== */

            if (!response.ok) {
                if (response.status === 400) {
                    if (payload?.fieldErrors) {
                        applyServerErrors(payload.fieldErrors);
                    } else {
                        setErrors({
                            form: payload?.message || "Confira os dados preenchidos.",
                        });
                    }

                    setSubmitting(false);

                    return;
                }

                if (response.status === 429) {
                    setSubmitting(false);

                    setErrors({
                        form: "Muitas tentativas de envio. Aguarde alguns minutos e tente novamente.",
                    });

                    return;
                }

                if (response.status === 502 || response.status === 504) {
                    setSubmitting(false);

                    setErrors({
                        form: "O serviço de atendimento não respondeu corretamente. Tente novamente em alguns instantes.",
                    });

                    return;
                }

                setSubmitting(false);

                setErrors({
                    form: payload?.message || "Não foi possível enviar sua dúvida.",
                });

                return;
            }

            /* ===========================================
               SUCESSO REAL
            ========================================== */

            if (!payload?.ok) {
                setSubmitting(false);

                setErrors({
                    form: "Não foi possível confirmar o envio da sua dúvida.",
                });

                return;
            }

            setForm(INITIAL_FORM);

            setErrors({});

            setSubmitting(false);

            setSubmitted(true);
        } catch (error) {
            setSubmitting(false);

            if (error?.name === "AbortError") {
                setErrors({
                    form: "O envio demorou mais que o esperado. Verifique sua conexão e tente novamente.",
                });

                return;
            }

            setErrors({
                form: "Não foi possível enviar sua dúvida. Verifique sua conexão e tente novamente.",
            });
        } finally {
            clearTimeout(timeoutId);
        }
    }

    /* =====================================================
       SUCCESS
    ====================================================== */

    if (submitted) {
        return (
            <section className={["border border-line", "bg-card dark:bg-paper", "p-8 text-center", "shadow-soft sm:p-10"].join(" ")} role="status" aria-live="polite" aria-labelledby="question-success-title">
                <div className={["mx-auto grid size-14", "place-items-center", "rounded-full", "bg-coral-soft text-coral"].join(" ")} aria-hidden="true">
                    <Check className="size-7" strokeWidth={2} />
                </div>

                <h2 ref={successHeadingRef} id="question-success-title" tabIndex={-1} className={["mt-5", "font-display", "text-2xl font-extrabold", "text-foreground", "outline-none"].join(" ")}>
                    Dúvida enviada!
                </h2>

                <p className="mx-auto mt-3 max-w-md text-base leading-7 text-muted-foreground">Recebemos sua mensagem. A equipe do Hauy Conecta vai analisar sua dúvida e, caso você tenha informado um contato, poderá entrar em contato para ajudar.</p>

                <button
                    type="button"
                    onClick={() => {
                        setSubmitted(false);

                        requestAnimationFrame(() => {
                            categoryRef.current?.focus();
                        });
                    }}
                    className={["mt-6", "inline-flex min-h-11", "items-center justify-center", "rounded-lg", "border border-line", "px-4", "text-sm font-semibold", "text-foreground", "transition-colors", "hover:bg-mist", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2"].join(" ")}
                >
                    Enviar outra dúvida
                </button>
            </section>
        );
    }

    /* =====================================================
       FORM
    ====================================================== */

    return (
        <form onSubmit={handleSubmit} noValidate aria-busy={submitting} aria-describedby="question-form-help" className={["border border-line", "bg-card dark:bg-paper", "p-6 shadow-soft", "sm:p-8"].join(" ")}>
            {/* Honeypot */}
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Não preencher</label>

                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <p id="question-form-help" className="sr-only">
                Preencha os campos obrigatórios para enviar sua dúvida para a equipe do Hauy Conecta.
            </p>

            <div className="grid gap-6">
                {/* =================================================
                    CATEGORIA
                ================================================== */}

                <div>
                    <label htmlFor="category" className="block text-sm font-bold text-foreground">
                        Sobre o que você precisa de ajuda?
                        <span className="ml-1 text-coral" aria-hidden="true">
                            *
                        </span>
                        <span className="sr-only">obrigatório</span>
                    </label>

                    <Select value={form.category} onValueChange={(value) => handleSelectChange("category", value)} disabled={submitting}>
                        <SelectTrigger ref={categoryRef} id="category" aria-required="true" aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "category-error" : undefined} onBlur={() => validateField("category")} className="mt-2">
                            <SelectValue placeholder="Escolha uma opção" />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errors.category && (
                        <p id="category-error" className="mt-2 text-sm text-coral">
                            {errors.category}
                        </p>
                    )}
                </div>

                {/* =================================================
                    DÚVIDA
                ================================================== */}

                <div>
                    <label htmlFor="message" className="block text-sm font-bold text-foreground">
                        Conte-nos sua dúvida
                        <span className="ml-1 text-coral" aria-hidden="true">
                            *
                        </span>
                        <span className="sr-only">obrigatório</span>
                    </label>

                    <p id="message-help" className="mt-1 text-sm text-muted-foreground">
                        Explique o que você está tentando fazer e onde encontrou dificuldade.
                    </p>
                    <p id="message-help" className="mt-1 text-sm text-muted-foreground">
                        Ex: Estou tentando criar um sumário automático no Word,
                        mas a opção não aparece em Referências no Sumário.
                    </p>

                    <Textarea ref={messageRef} id="message" name="message" value={form.message} onChange={handleChange} onBlur={() => validateField("message")} disabled={submitting} required aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={["message-help", errors.message ? "message-error" : ""].filter(Boolean).join(" ")} rows={6} minLength={10} maxLength={2000} spellCheck={true} className="mt-3" placeholder="Ex.: Não consigo criar um sumário automático no Word..." />

                    <div className="mt-2 flex items-center justify-between gap-4">
                        {errors.message ? (
                            <p id="message-error" className="text-sm text-coral">
                                {errors.message}
                            </p>
                        ) : (
                            <span />
                        )}

                        <span className="shrink-0 text-xs text-muted-foreground" aria-live="polite">
                            {form.message.length}
                            /2000
                        </span>
                    </div>
                </div>

                {/* =================================================
                    NOME E CONTATO
                ================================================== */}

                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Nome */}

                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-foreground">
                            Seu nome
                            <span className="ml-1 text-xs font-normal text-muted-foreground">opcional</span>
                        </label>

                        <Input ref={nameRef} id="name" name="name" type="text" value={form.name} onChange={handleChange} onBlur={() => validateField("name")} disabled={submitting} minLength={2} maxLength={100} autoComplete="name" spellCheck={false} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className="mt-2" placeholder="Como podemos chamar você?" />

                        {errors.name && (
                            <p id="name-error" className="mt-2 text-sm text-coral">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Contato */}

                    <div>
                        <label htmlFor="contact" className="block text-sm font-bold text-foreground">
                            Como podemos entrar em contato com você?
                            <span className="ml-1 text-xs font-normal text-muted-foreground">opcional</span>
                        </label>

                        <p id="contact-help" className="mt-1 text-sm leading-6 text-muted-foreground">
                            Caso queira receber uma resposta, informe seu e-mail ou seu número de WhatsApp com DDD.
                        </p>

                        <Input ref={contactRef} id="contact" name="contact" type="text" value={form.contact} onChange={handleChange} onBlur={() => validateField("contact")} disabled={submitting} maxLength={200} autoComplete="off" inputMode="text" spellCheck={false} aria-invalid={Boolean(errors.contact)} aria-describedby={["contact-help", errors.contact ? "contact-error" : ""].filter(Boolean).join(" ")} className="mt-2" placeholder="Ex.: (33) 99999-9999 ou nome@email.com" />

                        {errors.contact && (
                            <p id="contact-error" className="mt-2 text-sm text-coral">
                                {errors.contact}
                            </p>
                        )}
                    </div>
                </div>

                {/* =================================================
                    DISPOSITIVO
                ================================================== */}

                <div>
                    <label htmlFor="device" className="block text-sm font-bold text-foreground">
                        Onde você está tentando realizar essa tarefa?
                        <span className="ml-1 text-coral" aria-hidden="true">
                            *
                        </span>
                        <span className="sr-only">obrigatório</span>
                    </label>

                    <Select value={form.device} onValueChange={(value) => handleSelectChange("device", value)} disabled={submitting}>
                        <SelectTrigger ref={deviceRef} id="device" aria-required="true" aria-invalid={Boolean(errors.device)} aria-describedby={errors.device ? "device-error" : undefined} onBlur={() => validateField("device")} className="mt-2">
                            <SelectValue placeholder="Escolha uma opção" />
                        </SelectTrigger>

                        <SelectContent>
                            {devices.map((device) => (
                                <SelectItem key={device} value={device}>
                                    {device}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errors.device && (
                        <p id="device-error" className="mt-2 text-sm text-coral">
                            {errors.device}
                        </p>
                    )}
                </div>

                {/* =================================================
                    AVISO
                ================================================== */}

                <div className="border-l-2 border-coral pl-4" role="note">
                    <p className="text-sm leading-6 text-muted-foreground">
                        <strong className="text-foreground">Importante:</strong> não envie senhas, códigos de acesso, documentos pessoais ou outras informações confidenciais.
                    </p>
                </div>

                {/* =================================================
                    ERRO GERAL
                ================================================== */}

                {errors.form && (
                    <div ref={formErrorRef} role="alert" tabIndex={-1} className={["border border-coral/30", "bg-coral-soft", "p-4", "text-sm text-foreground", "outline-none"].join(" ")}>
                        {errors.form}
                    </div>
                )}

                {/* =================================================
                    ENVIO
                ================================================== */}

                <div className="flex items-center justify-end gap-4">
                    <span className="sr-only" role="status" aria-live="polite">
                        {submitting ? "Enviando sua dúvida..." : ""}
                    </span>

                    <Button type="submit" variant="coral" disabled={submitting} aria-busy={submitting}>
                        <Send className="size-4" aria-hidden="true" />

                        {submitting ? "Enviando..." : "Enviar dúvida"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
