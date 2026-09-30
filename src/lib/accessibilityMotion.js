const STORAGE_KEY = "hauy-conecta-reduced-motion";

export const REDUCED_MOTION_EVENT = "hauy-conecta-motion-change";

/*
 * ==========================================
 * LER PREFERÊNCIA SALVA
 * ==========================================
 */
export function getStoredReducedMotion() {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        return false;
    }
}

/*
 * ==========================================
 * VERIFICAR PREFERÊNCIA DO SISTEMA
 * ==========================================
 */
function getSystemReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/*
 * ==========================================
 * VERIFICAR ESTADO ATUAL
 * ==========================================
 *
 * A redução de movimento será ativada quando:
 *
 * 1. O usuário ativou no Hauy Conecta
 * OU
 * 2. O sistema operacional/navegador
 *    solicita reduced motion.
 */
export function shouldReduceMotion() {
    const userPreference = getStoredReducedMotion();

    const systemPreference = getSystemReducedMotion();

    return userPreference || systemPreference;
}

/*
 * ==========================================
 * ALTERAR PREFERÊNCIA DO SITE
 * ==========================================
 */
export function setReducedMotionPreference(enabled) {
    const root = document.documentElement;

    /*
     * Atualiza o atributo usado pelo CSS.
     */
    if (enabled) {
        root.dataset.accessibilityMotion = "reduced";
    } else {
        delete root.dataset.accessibilityMotion;
    }

    /*
     * Persiste a preferência.
     */
    try {
        localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
        // localStorage indisponível.
    }

    /*
     * Avisa componentes que possuem
     * animações controladas por JavaScript.
     */
    window.dispatchEvent(
        new CustomEvent(REDUCED_MOTION_EVENT, {
            detail: {
                enabled,
            },
        }),
    );
}

/*
 * ==========================================
 * OUVIR ALTERAÇÕES
 * ==========================================
 */
export function subscribeReducedMotion(callback) {
    function handleSitePreference() {
        callback(shouldReduceMotion());
    }

    window.addEventListener(REDUCED_MOTION_EVENT, handleSitePreference);

    /*
     * Também acompanha a preferência
     * do sistema operacional.
     */
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const handleSystemPreference = () => {
        callback(shouldReduceMotion());
    };

    mediaQuery?.addEventListener("change", handleSystemPreference);

    /*
     * Cleanup.
     */
    return () => {
        window.removeEventListener(REDUCED_MOTION_EVENT, handleSitePreference);

        mediaQuery?.removeEventListener("change", handleSystemPreference);
    };
}
