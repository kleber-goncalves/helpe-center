import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui";

export function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    const buttonRef = useRef(null);
    const overlayRef = useRef(null);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        const root = document.documentElement;

        root.classList.toggle("dark", theme === "dark");

        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        if (isAnimatingRef.current) return;

        const button = buttonRef.current;
        const overlay = overlayRef.current;

        if (!button || !overlay) return;

        isAnimatingRef.current = true;

        const nextTheme = theme === "dark" ? "light" : "dark";

        const buttonRect = button.getBoundingClientRect();

        const centerX = buttonRect.left + buttonRect.width / 2;
        const centerY = buttonRect.top + buttonRect.height / 2;

        const radius = 40;

        const distanceTopLeft = Math.hypot(centerX, centerY);

        const distanceTopRight = Math.hypot(window.innerWidth - centerX, centerY);

        const distanceBottomLeft = Math.hypot(centerX, window.innerHeight - centerY);

        const distanceBottomRight = Math.hypot(window.innerWidth - centerX, window.innerHeight - centerY);

        const maxDistance = Math.max(distanceTopLeft, distanceTopRight, distanceBottomLeft, distanceBottomRight);

        const scale = maxDistance / radius;

        gsap.set(overlay, {
            left: centerX,
            top: centerY,
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            autoAlpha: 1,
        });

        const timeline = gsap.timeline({
            onComplete: () => {
                isAnimatingRef.current = false;
            },
        });

        timeline
            .to(overlay, {
                scale,
                duration: 0.45,
                ease: "power3.inOut",
            })
            .add(() => {
                setTheme(nextTheme);
            })
            .to(overlay, {
                scale: 0,
                autoAlpha: 0,
                duration: 0.4,
                ease: "power3.inOut",
            });
    }

    const isDark = theme === "dark";

    return (
        <>
            <Button ref={buttonRef} type="button" variant="ghost" size="icon" onClick={toggleTheme} aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"} title={isDark ? "Ativar modo claro" : "Ativar modo escuro"} className="relative z-[10000] cursor-pointer text-muted-ink hover:bg-mist">
                <span className="relative flex h-4 w-4 items-center justify-center">
                    <Sun className={`absolute h-4 w-4 transition-all duration-300 ease-out ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-[#b58100]"}`} strokeWidth={1.8} aria-hidden="true" />

                    <Moon className={`absolute h-4 w-4 transition-all duration-300 ease-out ${isDark ? "rotate-0 scale-100 opacity-100 text-[#8da9b6]" : "-rotate-90 scale-0 opacity-0"}`} strokeWidth={1.8} aria-hidden="true" />
                </span>
            </Button>

            <div ref={overlayRef} aria-hidden="true" className="pointer-events-none will-change-transform invisible fixed left-1/2 top-1/2 z-[9999] h-20 w-20 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-black opacity-0" />
        </>
    );
}
