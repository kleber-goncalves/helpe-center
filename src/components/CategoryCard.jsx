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
    // const count = tutorials.filter((tutorial) => tutorial.category === category.id).length;

    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) return;

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
        <Link ref={cardRef} to={`/categorias/${category.id}`} className="group block">
            <Card
                className="flex flex-col items-center text-center h-full p-5 transition bg-card
            dark:bg-paper hover:-translate-y-0.5 border hover:border-coral/60 hover:shadow-lifted dark:hover:shadow-lifted-dark shadow-soft duration-300 ease-in-out"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-mist3 text-petrol transition-colors group-hover:bg-coral-soft group-hover:text-coral">
                        <Icon className="h-5.5 w-5.5" />
                    </span>
                    <h3 className="mt-1 font-bold text-ink">{category.name}</h3>
                </div>

                <p className="mt-2 text-sm leading-5 text-muted-ink">{category.description}</p>
                {/* <p className="mt-4 text-xs font-semibold text-[#527282]">
                    {count} {count === 1 ? "tutorial" : "tutoriais"}
                </p> */}
            </Card>
        </Link>
    );
}
