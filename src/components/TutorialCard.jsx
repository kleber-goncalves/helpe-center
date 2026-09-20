import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { Badge, Card } from "./ui";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TutorialCard({ tutorial }) {
    const category = categories.find((item) => item.id === tutorial.category);
    const Icon = tutorial.icon;
    const IconCategory = category.icon;

    const gridRef = useRef(null);

    useGSAP(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) return;

        gsap.fromTo(
            gridRef.current.children,
            {
                autoAlpha: 0,
                y: 20,
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 88%",
                    once: true,
                },
            },
        );
    }, []);

    return (
        <Card
            ref={gridRef}
            className="flex group h-full cursor-pointer flex-col p-5 transition bg-card dark:bg-paper hover:-translate-y-0.5 duration-300 border hover:border-coral/60 hover:shadow-lifted dark:hover:shadow-lifted-dark shadow-soft focus-visible:ring-2
focus-visible:ring-coral ease-in-out"
        >
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <Badge className="py-1 flex items-center gap-1.5 ">
                        <span className="flex ">
                            <IconCategory className="size-5" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        {category?.name}
                    </Badge>
                    <Badge className=" bg-[#fff1ec] text-[#a94c3c]">
                        <span className="flex mb-1">
                            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        {tutorial.difficulty}
                    </Badge>
                </div>

                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-ink">
                    <Clock className="h-3.5 w-3.5" />
                    {tutorial.duration}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 mt-4">
                <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{tutorial.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-ink">{tutorial.description}</p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-coral">
                <Link to={`/tutoriais/${tutorial.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-coral hover:text-coral">
                    Ver tutorial <ArrowRight className="h-4 w-4 text-coral group-hover:translate-x-0.75 transition-transform duration-200" />
                </Link>
            </div>
        </Card>
    );
}
