import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "./ui";

export function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.toggle("dark", theme === "dark");

        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        const nextTheme = theme === "dark" ? "light" : "dark";
        const transition = document.querySelector("#theme-transition");

        if (!transition) {
            setTheme(nextTheme);
            return;
        }

        const nextColor = nextTheme === "dark" ? "rgb(18, 40, 56)" : "rgb(253, 253, 251)";

        gsap.set(transition, {
            backgroundColor: nextColor,
            opacity: 0,
        });

        gsap.to(transition, {
            opacity: 1,
            duration: 0.12,
            ease: "power2.out",
            onComplete: () => {
                setTheme(nextTheme);

                gsap.to(transition, {
                    opacity: 0,
                    duration: 0.18,
                    ease: "power2.inOut",
                });
            },
        });
    }

    const isDark = theme === "dark";

    return (
        <Button type="button" variant="ghost" size="icon" onClick={toggleTheme} aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"} title={isDark ? "Ativar modo claro" : "Ativar modo escuro"} className="cursor-pointer text-muted-ink hover:bg-mist">
            <span className="relative flex h-4 w-4 items-center justify-center">
                <Sun className={`absolute h-4 w-4 transition-all duration-300 ease-out ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-[#b58100]"}`} strokeWidth={1.8} aria-hidden="true" />

                <Moon className={`absolute h-4 w-4 transition-all duration-300 ease-out ${isDark ? "rotate-0 scale-100 opacity-100 text-[#8da9b6]" : "-rotate-90 scale-0 opacity-0"}`} strokeWidth={1.8} aria-hidden="true" />
            </span>
        </Button>
    );
}
