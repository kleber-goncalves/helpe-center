import { Children, cloneElement, useEffect, useId, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { gsap } from "gsap";

import { useReducedMotion } from "../hooks/useReducedMotion";

export function ImageLightbox({ src, alt, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const reduceMotion = useReducedMotion();

    const dialogRef = useRef(null);
    const imageRef = useRef(null);
    const closeButtonRef = useRef(null);
    const closeLightboxRef = useRef(null);
    const dialogTitleId = useId();

    const openLightbox = () => {
        setIsClosing(false);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        if (isClosing) {
            return;
        }

        if (reduceMotion) {
            setIsOpen(false);
            return;
        }

        setIsClosing(true);

        const timeline = gsap.timeline({
            onComplete: () => {
                setIsOpen(false);
                setIsClosing(false);
            },
        });

        timeline
            .to(closeButtonRef.current, {
                autoAlpha: 0,
                x: 12,
                duration: 0.2,
                ease: "power2.in",
            })
            .to(
                imageRef.current,
                {
                    autoAlpha: 0,
                    scale: 0.94,
                    y: 8,
                    duration: 0.28,
                    ease: "power2.in",
                },
                "<"
            )
            .to(
                dialogRef.current,
                {
                    autoAlpha: 0,
                    duration: 0.22,
                    ease: "power2.in",
                },
                "<0.08"
            );
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
                closeLightbox();
                return;
            }

            if (event.key === "Tab") {
                event.preventDefault();
                closeButtonRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        if (reduceMotion) {
            closeButtonRef.current?.focus();
        } else {
            const context = gsap.context(() => {
                gsap.fromTo(
                    dialogRef.current,
                    { autoAlpha: 0 },
                    {
                        autoAlpha: 1,
                        duration: 0.28,
                        ease: "power2.out",
                    }
                );

                gsap.fromTo(
                    imageRef.current,
                    {
                        autoAlpha: 0,
                        scale: 0.88,
                        y: 12,
                    },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.48,
                        ease: "power3.out",
                        delay: 0.02,
                    }
                );

                gsap.fromTo(
                    closeButtonRef.current,
                    {
                        autoAlpha: 0,
                        x: 12,
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.32,
                        ease: "power2.out",
                        delay: 0.16,
                    }
                );
            }, dialogRef);

            requestAnimationFrame(() => {
                closeButtonRef.current?.focus();
            });

            return () => {
                context.revert();
                document.removeEventListener("keydown", handleKeyDown);
                document.body.style.overflow = previousOverflow;

                if (previousActiveElement instanceof HTMLElement) {
                    previousActiveElement.focus();
                }
            };
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;

            if (previousActiveElement instanceof HTMLElement) {
                previousActiveElement.focus();
            }
        };
    }, [isOpen, reduceMotion]);

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
            <div className="group relative">
                {trigger}

                <span
                    className="
                        pointer-events-none
                        absolute
                        right-3
                        top-3
                        z-10
                        flex
                        size-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-ink/75
                        text-white
                        opacity-90
                        shadow-soft
                        transition-[opacity,background-color,transform]
                        duration-200
                        group-hover:scale-105
                        group-hover:bg-ink/90
                        sm:size-10
                        motion-reduce:transition-none
                    "
                    aria-hidden="true"
                >
                    <Maximize2 className="size-4 sm:size-5" />
                </span>
            </div>

            {isOpen && (
                <div
                    ref={dialogRef}
                    className="fixed inset-0 z-[200] grid place-items-center bg-black/56 p-4 sm:p-6"
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

                    <div
                        className="
                            flex
                            max-h-[92vh]
                            max-w-[96vw]
                            items-center
                            justify-center
                            gap-3
                            sm:gap-4
                        "
                    >
                        <img
                            ref={imageRef}
                            src={src}
                            alt={alt}
                            className="
                                max-h-[88vh]
                                max-w-[calc(100vw-5rem)]
                                object-contain
                                sm:max-w-[calc(92vw-4rem)]
                            "
                            draggable="false"
                        />

                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={closeLightbox}
                            aria-label="Fechar imagem ampliada"
                            title="Fechar imagem ampliada"
                            className="
                                flex
                                size-10
                                shrink-0
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-lg
                                bg-black/80
                                text-white
                                shadow-soft
                                transition-[background-color,transform]
                                duration-200
                                hover:scale-105
                                hover:bg-black/90
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-white
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-black
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
