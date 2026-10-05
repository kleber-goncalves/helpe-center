import {
    ArrowUpRight,
    BookOpen,
    MessageCircleQuestion,
    Search,
    Send,
    Youtube,
    X,
} from "lucide-react";

import { useRef, useState } from "react";

import { Link } from "react-router-dom";

import { askAssistant } from "../lib/assistant";

const MAX_MESSAGE_LENGTH = 1000;

const suggestions = [
    "Como criar um sumário no Word?",
    "Como compartilhar um arquivo?",
    "Como começar a usar o Excel?",
];

export function HauyAssistant({
    inputRef: externalInputRef = null,
    onClose = null,
    compact = false,
}) {
    const internalInputRef = useRef(null);

    const inputRef = externalInputRef || internalInputRef;

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    /*
     * =========================================================
     * ENVIO
     * =========================================================
     */

    async function handleSubmit(event) {
        event.preventDefault();

        const value = message.trim();

        if (!value || loading) {
            return;
        }

        setError("");

        /*
         * Mostra imediatamente a pergunta do usuário.
         */

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
                    source: data.source ?? "tutorials",
                    query: value,
                },
            ]);
        } catch (requestError) {
            setError(
                requestError.message ||
                    "Não foi possível responder agora.",
            );
        } finally {
            setLoading(false);

            /*
             * Mantém o foco no campo depois da resposta.
             *
             * preventScroll evita que o Android/Chrome
             * tente reposicionar a página.
             */

            requestAnimationFrame(() => {
                inputRef.current?.focus({
                    preventScroll: true,
                });
            });
        }
    }

    /*
     * =========================================================
     * SUGESTÕES
     * =========================================================
     */

    function handleSuggestion(suggestion) {
        setMessage(suggestion);

        requestAnimationFrame(() => {
            inputRef.current?.focus({
                preventScroll: true,
            });
        });
    }

    return (
        <section
            aria-label="Assistente Hauy"
            className={
                compact
                    ? `
                        flex
                        h-full
                        min-h-0
                        w-full
                        max-w-none
                        flex-col
                    `
                    : "mx-auto w-full max-w-4xl"
            }
        >
            {/* ==================================================
                CABEÇALHO
            ================================================== */}

            <header
                className={
                    compact
                        ? `
                            shrink-0
                            border-b
                            border-line
                            bg-background
                            px-5
                            py-4
                        `
                        : "mb-8"
                }
            >
                <div className="flex items-center gap-3">
                    {/* Ícone */}

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
                        aria-hidden="true"
                    >
                        <MessageCircleQuestion className="size-5" />
                    </div>

                    {/* Título */}

                    <div
                        className="
                            min-w-0
                            flex-1
                        "
                    >
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
                                text-xl
                                font-bold
                                text-ink
                            "
                        >
                            Tire uma dúvida
                        </h2>
                    </div>

                    {/* Fechar */}

                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Fechar Assistente Hauy"
                            className="
                                flex
                                size-10
                                shrink-0
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-line
                                text-muted-ink
                                transition-colors
                                hover:bg-mist
                                hover:text-ink
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-coral
                                focus-visible:ring-offset-2
                            "
                        >
                            <X
                                className="size-5"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                </div>

                <p
                    className={
                        compact
                            ? `
                                mt-3
                                text-sm
                                leading-6
                                text-muted-foreground
                            `
                            : `
                                mt-4
                                max-w-2xl
                                text-base
                                text-muted-foreground
                            `
                    }
                >
                    Pergunte sobre os assuntos disponíveis na Central de
                    Ajuda.
                </p>
            </header>

            {/* ==================================================
                CONVERSA
            ================================================== */}

            <div
                className={
                    compact
                        ? `
                            min-h-0
                            flex-1
                            overflow-y-auto
                            overscroll-contain
                            px-5
                            py-5
                            [scrollbar-gutter:stable]
                            [-webkit-overflow-scrolling:touch]
                        `
                        : "space-y-5"
                }
                aria-live="polite"
            >
                {/* =================================================
                    ESTADO INICIAL
                ================================================= */}

                {messages.length === 0 && (
                    <div
                        className="
                            rounded-2xl
                            border
                            border-line
                            bg-mist
                            p-5
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
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Experimente uma destas dúvidas:
                        </p>

                        <div
                            className="
                                mt-4
                                flex
                                flex-col
                                gap-2
                            "
                        >
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() =>
                                        handleSuggestion(suggestion)
                                    }
                                    className="
                                        min-h-11
                                        cursor-pointer
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
                                        focus-visible:ring-offset-2
                                    "
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* =================================================
                    MENSAGENS
                ================================================= */}

                <div className="mt-5 space-y-5">
                    {messages.map((item, index) => (
                        <div
                            key={`${item.role}-${index}`}
                            className={
                                item.role === "user"
                                    ? "flex justify-end"
                                    : "flex justify-start"
                            }
                        >
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

                                {/* =================================
                                    ALTERNATIVAS EXTERNAS
                                ================================= */}

                                {item.role === "assistant" &&
                                    item.source === "none" &&
                                    item.query && (
                                        <div
                                            className="
                                                mt-6
                                                border-t
                                                border-line
                                                pt-5
                                            "
                                        >
                                            <p
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-ink
                                                "
                                            >
                                                Você pode continuar sua busca:
                                            </p>

                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    flex-col
                                                    gap-2
                                                "
                                            >
                                                <a
                                                    href={`https://www.google.com/search?q=${encodeURIComponent(item.query.trim())}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`Pesquisar "${item.query}" no Google`}
                                                    className="
                                                        group
                                                        flex
                                                        min-h-11
                                                        min-w-0
                                                        items-center
                                                        gap-3
                                                        rounded-xl
                                                        border
                                                        border-line
                                                        bg-mist
                                                        px-4
                                                        py-3
                                                        text-left
                                                        transition-colors
                                                        hover:border-coral
                                                        hover:bg-background
                                                        focus-visible:outline-none
                                                        focus-visible:ring-2
                                                        focus-visible:ring-coral
                                                        focus-visible:ring-offset-2
                                                    "
                                                >
                                                    <Search
                                                        className="
                                                            size-5
                                                            shrink-0
                                                            text-coral
                                                        "
                                                        aria-hidden="true"
                                                    />

                                                    <span
                                                        className="
                                                            min-w-0
                                                            flex-1
                                                            truncate
                                                            text-sm
                                                            font-bold
                                                            text-ink
                                                        "
                                                    >
                                                        Pesquisar "
                                                        {item.query}
                                                        " no Google
                                                    </span>

                                                    <ArrowUpRight
                                                        className="
                                                            size-4
                                                            shrink-0
                                                            text-muted-foreground
                                                            transition-colors
                                                            group-hover:text-coral
                                                        "
                                                        aria-hidden="true"
                                                    />
                                                </a>

                                                <a
                                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.query.trim())}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`Ver vídeos sobre "${item.query}" no YouTube`}
                                                    className="
                                                        group
                                                        flex
                                                        min-h-11
                                                        min-w-0
                                                        items-center
                                                        gap-3
                                                        rounded-xl
                                                        border
                                                        border-line
                                                        bg-mist
                                                        px-4
                                                        py-3
                                                        text-left
                                                        transition-colors
                                                        hover:border-coral
                                                        hover:bg-background
                                                        focus-visible:outline-none
                                                        focus-visible:ring-2
                                                        focus-visible:ring-coral
                                                        focus-visible:ring-offset-2
                                                    "
                                                >
                                                    <Youtube
                                                        className="
                                                            size-5
                                                            shrink-0
                                                            text-coral
                                                        "
                                                        aria-hidden="true"
                                                    />

                                                    <span
                                                        className="
                                                            min-w-0
                                                            flex-1
                                                            truncate
                                                            text-sm
                                                            font-bold
                                                            text-ink
                                                        "
                                                    >
                                                        Ver vídeos sobre "
                                                        {item.query}
                                                        "
                                                    </span>

                                                    <ArrowUpRight
                                                        className="
                                                            size-4
                                                            shrink-0
                                                            text-muted-foreground
                                                            transition-colors
                                                            group-hover:text-coral
                                                        "
                                                        aria-hidden="true"
                                                    />
                                                </a>

                                                <Link
                                                    to="/enviar-duvida"
                                                    className="
                                                        inline-flex
                                                        min-h-11
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-coral-button
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        font-bold
                                                        text-white
                                                        transition-colors
                                                        hover:bg-coral-button-hover
                                                        focus-visible:outline-none
                                                        focus-visible:ring-2
                                                        focus-visible:ring-coral
                                                        focus-visible:ring-offset-2
                                                    "
                                                >
                                                    Enviar essa dúvida para a equipe
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                {/* =================================
                                    TUTORIAIS
                                ================================= */}

                                {item.role === "assistant" &&
                                    item.tutorials?.length > 0 && (
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
                                                <BookOpen
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />

                                                <span>
                                                    Tutoriais relacionados
                                                </span>
                                            </div>

                                            {item.tutorials.map(
                                                (tutorial) => (
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
                                                            focus-visible:outline-none
                                                            focus-visible:ring-2
                                                            focus-visible:ring-coral
                                                            focus-visible:ring-offset-2
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
                                                                {
                                                                    tutorial.title
                                                                }
                                                            </p>

                                                            <p
                                                                className="
                                                                    mt-1
                                                                    text-sm
                                                                    leading-5
                                                                    text-muted-foreground
                                                                "
                                                            >
                                                                {
                                                                    tutorial.description
                                                                }
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
                                                ),
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    ))}

                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loading && (
                        <div
                            className="flex justify-start"
                            role="status"
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
                                O Assistente Hauy está preparando uma
                                resposta...
                            </div>
                        </div>
                    )}

                    {/* =================================================
                        ERRO
                    ================================================= */}

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
            </div>

            {/* ==================================================
                CAMPO DE PERGUNTA
            ================================================== */}

            <form
                onSubmit={handleSubmit}
                className={
                    compact
                        ? `
                            shrink-0
                            border-t
                            border-line
                            bg-background
                            px-4
                            pb-[calc(1rem+env(safe-area-inset-bottom))]
                            pt-4
                        `
                        : "mt-8"
                }
            >
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
                    <label
                        htmlFor="hauy-assistant-input"
                        className="sr-only"
                    >
                        Digite sua dúvida
                    </label>

                    <textarea
                        ref={inputRef}
                        id="hauy-assistant-input"
                        value={message}
                        onChange={(event) =>
                            setMessage(event.target.value)
                        }
                        placeholder="O que você precisa aprender?"
                        rows={2}
                        maxLength={MAX_MESSAGE_LENGTH}
                        disabled={loading}
                        enterKeyHint="send"
                        className="
                            min-h-12
                            max-h-32
                            flex-1
                            resize-none
                            overflow-y-auto
                            bg-transparent
                            px-3
                            py-2
                            text-base
                            leading-6
                            text-foreground
                            outline-none
                            placeholder:text-muted-foreground
                        "
                    />

                    <button
                        type="submit"
                        disabled={
                            loading || !message.trim()
                        }
                        aria-label="Enviar dúvida"
                        className="
                            flex
                            size-11
                            shrink-0
                            cursor-pointer
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
                            focus-visible:ring-offset-2
                        "
                    >
                        <Send
                            className="size-5"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div
                    className="
                        mt-2
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >
                    <p
                        className="
                            text-xs
                            leading-5
                            text-muted-foreground
                        "
                    >
                        O Assistente utiliza os conteúdos disponíveis na
                        Central.
                    </p>

                    <span
                        className="
                            shrink-0
                            text-xs
                            text-muted-foreground
                        "
                        aria-hidden="true"
                    >
                        {message.length}/{MAX_MESSAGE_LENGTH}
                    </span>
                </div>
            </form>
        </section>
    );
}
