import { cn } from "../lib/utils";

const shapes = {
    wide: ["M0 180V116c112 9 198 1 280-18 117-28 182-16 247 4 72 23 135 20 191-11 58-32 87-80 151-83 68-3 94 48 167 58 87 13 170-22 257 3 61 17 103 53 147 42v69H0Z", "M946 3128-20 74-16 93 8 18 22 3 48-31 55-37 8-82-8-84-33-1-11 7-21 22-30Z"],

    ribbon: ["M0 180V91c103-31 188-24 276 2 74 22 144 47 234 37 97-12 142-69 234-79 112-13 183 54 285 57 138 5 236-89 411-67v139H0Z", "M111 55c32-18 83-11 100 15 15 24-11 44-50 44-43 1-85-21-76-42 4-7 12-12 26-17Z"],

    ribbon2: ["M0 180V91c103-31 188-24 276 2 74 22 144 47 234 57 97-12 142-69 234-79 112-13 183 54 285 57 138 5 236-89 411-67v139H0Z", " 44-43 1-85-21-76-42 4-7 12-12 26-17Z"],

    fold: ["M0 180v-52c82-28 171-20 248-1 93 24 157 31 238-5 78-35 118-84 221-79 96 5 132 59 223 66 90 8 140-30 218-47 102-23 196-12 292 26v92H0Z", "M691 8c42-11 88 0 "],

    notch: ["M0 180V80c152 15 240 67 390 56 123-9 157-71 282-76 106-5 159 44 260 39 129-6 109-150 331-72 68 4 124 25 117 58v98H0Z", "M1184 28c35-13 81-4 92 19 10 22-15 42-52 44-41 3-80-14-78-34 1-12 15-23 38-29Z"],

    notch2: ["M0 180V80c152 15 240 67 390 56 123-9 157-71 282-76 106-5 159 44 260 39 129-6 199-80 331-72 68 4 124 25 177 55v98H0Z", "M1184 18c35-13 81-4 92 19 10 22-15 42-52 44-41 3-80-14-78-34 1-12 15-23 38-29Z"],
};

const sizes = {
    small: "h-14 sm:h-20",
    medium: "h-20 sm:h-11",
    large: "h-24 sm:h-36 lg:h-40",
};

const surfaces = {
    background: "bg-background  ",
    mist: "bg-mist3",
    "mist-deep": "bg-mist-deep",
    "coral-soft": "bg-coral-soft",
    "petrol-soft": "bg-petrol-soft",
};

const inks = {
    background: "text-background",
    mist: "text-mist3",
    "mist-deep": "text-mist-deep",
    "coral-soft": "text-coral-soft",
    "petrol-soft": "text-petrol-soft",
};

export function SectionTransition({ src, variant = "wide", position = "bottom", size = "medium", from = "background", to = "mist", animation = false, className }) {
    const paths = shapes[variant] ?? shapes.wide;

    return (
        <div className={cn("relative isolate w-full overflow-hidden", sizes[size] ?? sizes.medium, surfaces[from] ?? surfaces.background, className)} aria-hidden="true">
            {src ? (
                <img src={src} alt="" className={cn("pointer-events-none absolute -inset-x-[4%] inset-y-0 h-full w-[108%] object-fill", position === "top" && "rotate-180", animation && "motion-safe:animate-organic-drift")} />
            ) : (
                <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className={cn("pointer-events-none absolute -inset-x-[4%] inset-y-0 h-full w-[108%] section-transition-color", inks[to] ?? inks.mist, position === "top" && "rotate-180", animation && "motion-safe:animate-organic-drift")}>
                    {paths.map((path) => (
                        <path key={path} d={path} fill="currentColor" />
                    ))}
                </svg>
            )}
        </div>
    );
}
