import { Link } from "react-router-dom";
import { Card } from "./ui";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CategoryCard({ category }) {
    const cardRef = useRef(null);
    const Icon = category.icon;

    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion || !cardRef.current) {
                return;
            }

            gsap.from(cardRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 88%",
                    once: true,
                },
            });
        },
        { scope: cardRef },
    );

    return (
        <Link ref={cardRef} to={`/categorias/${category.id}`} className={["group relative block h-full", "pt-7", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-coral/50", "focus-visible:ring-offset-2"].join(" ")}>
            {/* Ícone destacado */}
            <span className={["absolute left-1/2 top-0 z-20", "-translate-x-1/2", "grid size-14 place-items-center", "rounded-full", "border-4 border-background", "bg-mist3 text-petrol", "transition-all duration-300 ease-out", "group-hover:bg-coral-soft", "group-hover:text-coral", "group-hover:scale-105"].join(" ")} aria-hidden="true">
                <Icon className="size-6" strokeWidth={1.75} />
            </span>

            <Card className={["h-full", "bg-card dark:bg-paper", "border border-line", "p-5 pt-10", "text-center", "shadow-soft", "transition-all duration-300 ease-in-out", "group-hover:-translate-y-0.5", "group-hover:border-coral/60", "group-hover:shadow-lifted", "dark:group-hover:shadow-lifted-dark"].join(" ")}>
                <div className="flex flex-col items-center">
                    <h3 className="font-bold text-ink">{category.name}</h3>

                    <p className="mt-2 text-sm leading-5 text-muted-ink">{category.description}</p>
                </div>
            </Card>
        </Link>
    );
}
