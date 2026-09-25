import { ArrowUpRight, BookOpen, MessageCircleQuestion, Send } from "lucide-react";

import { useRef, useState } from "react";

import { Link } from "react-router-dom";

import { askAssistant } from "../lib/assistant";

const MAX_MESSAGE_LENGTH = 1000;

const suggestions = ["Como criar um sumário no Word?", "Como compartilhar um arquivo?", "Como começar a usar o Excel?"];

export function HauyAssistant() {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const inputRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const value = message.trim();

        if (!value || loading) {
            return;
        }

        setError("");

        setMessages((current) => [
            ...current,
            {
                role: "user",
                content: value,
            },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const data = await askAssistant(value);

            setMessages((current) => [
                ...current,
                {
                    role: "assistant",
                    content: data.answer,
                    tutorials: data.tutorials ?? [],
                },
            ]);
        } catch (requestError) {
            setError(requestError.message || "Não foi possível responder agora.");
        } finally {
            setLoading(false);

            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        }
    }

    function handleSuggestion(suggestion) {
        setMessage(suggestion);

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    }

    return (
        <section className="mx-auto w-full max-w-4xl">
            {/* =========================================
                CABEÇALHO
            ========================================= */}

            <header className="mb-8">
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            size-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-line
                            bg-mist
                            text-coral
                        "
                    >
                        <MessageCircleQuestion className="size-5" aria-hidden="true" />
                    </div>

                    <div>
                        <p
                            className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-muted-foreground
                            "
                        >
                            Assistente Hauy
                        </p>

                        <h2
                            className="
                                mt-1
                                text-2xl
                                font-bold
                                text-ink
                            "
                        >
                            Tire uma dúvida
                        </h2>
                    </div>
                </div>

                <p
                    className="
                        mt-4
                        max-w-2xl
                        text-base
                        text-muted-foreground
                    "
                >
                    Pergunte sobre os assuntos disponíveis na Central de Ajuda.
                </p>
            </header>

            {/* =========================================
                CONVERSA
            ========================================= */}

            <div
                className="
                    space-y-5
                "
            >
                {messages.length === 0 && (
                    <div
                        className="
                            rounded-2xl
                            border
                            border-line
                            bg-mist
                            p-6
                        "
                    >
                        <p
                            className="
                                font-semibold
                                text-ink
                            "
                        >
                            Olá! Como posso ajudar?
                        </p>

                        <p
                            className="
                                mt-2
                                text-muted-foreground
                            "
                        >
                            Experimente uma destas dúvidas:
                        </p>

                        <div
                            className="
                                mt-4
                                flex
                                flex-wrap
                                gap-2
                            "
                        >
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => handleSuggestion(suggestion)}
                                    className="
                                            rounded-lg
                                            border
                                            border-line
                                            bg-background
                                            px-3
                                            py-2
                                            text-left
                                            text-sm
                                            font-semibold
                                            text-ink
                                            transition-colors
                                            hover:border-coral
                                            hover:text-coral
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-coral
                                        "
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((item, index) => (
                    <div key={`${item.role}-${index}`} className={item.role === "user" ? "flex justify-end" : "flex justify-start"}>
                        <div
                            className={
                                item.role === "user"
                                    ? `
                                            max-w-[85%]
                                            rounded-2xl
                                            bg-ink
                                            px-5
                                            py-4
                                            text-paper
                                        `
                                    : `
                                            w-full
                                            max-w-[92%]
                                            rounded-2xl
                                            border
                                            border-line
                                            bg-background
                                            px-5
                                            py-5
                                        `
                            }
                        >
                            <p
                                className="
                                        whitespace-pre-wrap
                                        text-base
                                        leading-7
                                    "
                            >
                                {item.content}
                            </p>

                            {item.role === "assistant" && item.tutorials?.length > 0 && (
                                <div
                                    className="
                                                mt-5
                                                space-y-3
                                            "
                                >
                                    <div
                                        className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    font-bold
                                                    text-ink
                                                "
                                    >
                                        <BookOpen className="size-4" aria-hidden="true" />
                                        Tutoriais relacionados
                                    </div>

                                    {item.tutorials.map((tutorial) => (
                                        <Link
                                            key={tutorial.id}
                                            to={`/tutoriais/${tutorial.id}`}
                                            className="
                                                            group
                                                            flex
                                                            items-start
                                                            justify-between
                                                            gap-4
                                                            rounded-xl
                                                            border
                                                            border-line
                                                            bg-mist
                                                            p-4
                                                            transition-colors
                                                            hover:border-coral
                                                        "
                                        >
                                            <div>
                                                <p
                                                    className="
                                                                    font-bold
                                                                    text-ink
                                                                    group-hover:text-coral
                                                                "
                                                >
                                                    {tutorial.title}
                                                </p>

                                                <p
                                                    className="
                                                                    mt-1
                                                                    text-sm
                                                                    text-muted-foreground
                                                                "
                                                >
                                                    {tutorial.description}
                                                </p>
                                            </div>

                                            <ArrowUpRight
                                                className="
                                                                mt-1
                                                                size-4
                                                                shrink-0
                                                                text-muted-foreground
                                                                group-hover:text-coral
                                                            "
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div
                        className="
                            flex
                            justify-start
                        "
                        aria-live="polite"
                    >
                        <div
                            className="
                                rounded-2xl
                                border
                                border-line
                                bg-mist
                                px-5
                                py-4
                                text-sm
                                font-semibold
                                text-muted-foreground
                            "
                        >
                            O Assistente Hauy está preparando uma resposta...
                        </div>
                    </div>
                )}

                {error && (
                    <p
                        className="
                            text-sm
                            font-semibold
                            text-coral-button
                        "
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>

            {/* =========================================
                CAMPO
            ========================================= */}

            <form onSubmit={handleSubmit} className="mt-8">
                <div
                    className="
                        flex
                        items-end
                        gap-3
                        rounded-2xl
                        border
                        border-line
                        bg-background
                        p-2
                        transition-colors
                        focus-within:border-coral
                    "
                >
                    <label htmlFor="hauy-assistant-input" className="sr-only">
                        Digite sua dúvida
                    </label>

                    <textarea
                        ref={inputRef}
                        id="hauy-assistant-input"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="O que você precisa aprender?"
                        rows={2}
                        maxLength={MAX_MESSAGE_LENGTH}
                        disabled={loading}
                        className="
                            min-h-12
                            flex-1
                            resize-none
                            bg-transparent
                            px-3
                            py-2
                            text-base
                            text-foreground
                            outline-none
                            placeholder:text-muted-foreground
                        "
                    />

                    <button
                        type="submit"
                        disabled={loading || !message.trim()}
                        aria-label="Enviar dúvida"
                        className="
                            flex
                            size-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-coral-button
                            text-white
                            transition-colors
                            hover:bg-coral-button-hover
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-coral
                        "
                    >
                        <Send className="size-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-2 flex justify-between gap-4">
                    <p
                        className="
                            text-xs
                            text-muted-foreground
                        "
                    >
                        O Assistente utiliza os conteúdos disponíveis na Central.
                    </p>

                    <span
                        className="
                            shrink-0
                            text-xs
                            text-muted-foreground
                        "
                    >
                        {message.length}/{MAX_MESSAGE_LENGTH}
                    </span>
                </div>
            </form>
        </section>
    );
}
