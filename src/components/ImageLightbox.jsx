import { Children, cloneElement, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

export function ImageLightbox({ src, alt, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const closeButtonRef = useRef(null);
    const dialogTitleId = useId();

    const openLightbox = () => {
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousActiveElement = document.activeElement;
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                return;
            }

            if (event.key === "Tab") {
                event.preventDefault();
                closeButtonRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        requestAnimationFrame(() => {
            closeButtonRef.current?.focus();
        });

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;

            if (previousActiveElement instanceof HTMLElement) {
                previousActiveElement.focus();
            }
        };
    }, [isOpen]);

    const child = Children.only(children);

    const trigger = cloneElement(child, {
        onClick: (event) => {
            child.props.onClick?.(event);

            if (!event.defaultPrevented) {
                openLightbox();
            }
        },
        onKeyDown: (event) => {
            child.props.onKeyDown?.(event);

            if (event.defaultPrevented) {
                return;
            }

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox();
            }
        },
        role: "button",
        tabIndex: 0,
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        "aria-label": "Ampliar imagem: " + alt,
    });

    return (
        <>
            {trigger}

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={dialogTitleId}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeLightbox();
                        }
                    }}
                >
                    <div className="sr-only" id={dialogTitleId}>
                        {alt}
                    </div>

                    <div className="relative flex max-h-[92vh] max-w-[96vw] items-center justify-center">
                        <img
                            src={src}
                            alt={alt}
                            className="max-h-[88vh] max-w-[92vw] object-contain"
                            draggable="false"
                        />

                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={closeLightbox}
                            aria-label="Fechar imagem ampliada"
                            className="
                                absolute
                                right-2
                                top-2
                                flex
                                size-10
                                items-center
                                justify-center
                                rounded-full
                                bg-ink/80
                                text-white
                                shadow-soft
                                transition-[background-color,transform]
                                duration-200
                                hover:scale-105
                                hover:bg-ink
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-white
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-ink
                                motion-reduce:transform-none
                            "
                        >
                            <X className="size-5" aria-hidden="true" />
                        </button>
                    </div>

                    <p className="sr-only">
                        Pressione Esc ou use o botão fechar para sair da imagem ampliada.
                    </p>
                </div>
            )}
        </>
    );
}
