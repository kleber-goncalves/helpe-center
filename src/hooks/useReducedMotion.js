import { useEffect, useState } from "react";
import { shouldReduceMotion, subscribeReducedMotion } from "../lib/accessibilityMotion";

export function useReducedMotion() {
    const [reduceMotion, setReduceMotion] = useState(() => shouldReduceMotion());

    useEffect(() => {
        return subscribeReducedMotion(setReduceMotion);
    }, []);

    return reduceMotion;
}
