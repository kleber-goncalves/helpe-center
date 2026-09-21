import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



export function Reveal({ children, autoAlpha = 1, ease = "power2.out", className = "", y = 92, duration = 2, delay = 0 }) {
    const ref = useRef(null);

    useGSAP(
        () => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (reduceMotion) return;

            gsap.fromTo(
                ref.current,
                {
                    autoAlpha,
                    y,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration,
                    delay,
                    ease,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 88%",
                        once: true,
                    },
                },
            );
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
