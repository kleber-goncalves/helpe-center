const CONTRAST_STORAGE_KEY = "hauy-conecta-high-contrast";
const FONT_SCALE_STORAGE_KEY = "hauy-conecta-font-scale";
const REDUCED_MOTION_STORAGE_KEY = "hauy-conecta-reduced-motion";

const FONT_SCALES = {
    small: 1,
    medium: 1.15,
    large: 1.3,
};

const DEFAULT_SCALE = "small";

/*
 * ==========================================
 * LER BOOLEANO
 * ==========================================
 */
function getStoredBoolean(key) {
    try {
        return localStorage.getItem(key) === "true";
    } catch {
        return false;
    }
}

/*
 * ==========================================
 * LER TAMANHO DO TEXTO
 * ==========================================
 */
function getStoredFontScale() {
    try {
        const savedScale = localStorage.getItem(FONT_SCALE_STORAGE_KEY);

        if (savedScale && Object.prototype.hasOwnProperty.call(FONT_SCALES, savedScale)) {
            return savedScale;
        }
    } catch {
        // localStorage indisponível.
    }

    return DEFAULT_SCALE;
}

/*
 * ==========================================
 * ALTO CONTRASTE
 * ==========================================
 */
function applyContrast(enabled) {
    const root = document.documentElement;

    if (enabled) {
        root.dataset.accessibilityContrast = "high";
    } else {
        delete root.dataset.accessibilityContrast;
    }
}

/*
 * ==========================================
 * TAMANHO DO TEXTO
 * ==========================================
 */
function applyFontScale(scale) {
    const root = document.documentElement;

    const value = FONT_SCALES[scale] ?? FONT_SCALES[DEFAULT_SCALE];

    root.style.setProperty("--accessibility-font-scale", String(value));
}

/*
 * ==========================================
 * TEMA
 * ==========================================
 */
function applyTheme(highContrast) {
    const root = document.documentElement;

    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("theme");
    } catch {
        // localStorage indisponível.
    }

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDark = highContrast || savedTheme === "dark" || (savedTheme !== "light" && systemPrefersDark);

    root.classList.toggle("dark", isDark);
}

/*
 * ==========================================
 * INICIALIZA ACESSIBILIDADE
 * ==========================================
 */
export function initializeAccessibility() {
    const root = document.documentElement;

    /*
     * CONTRASTE
     */
    const highContrast = getStoredBoolean(CONTRAST_STORAGE_KEY);

    applyContrast(highContrast);

    /*
     * TEMA
     */
    applyTheme(highContrast);

    /*
     * TAMANHO DO TEXTO
     */
    const fontScale = getStoredFontScale();

    applyFontScale(fontScale);

    /*
     * MOVIMENTO
     */
    const reducedMotion = getStoredBoolean(REDUCED_MOTION_STORAGE_KEY);

    if (reducedMotion) {
        root.dataset.accessibilityMotion = "reduced";
    } else {
        delete root.dataset.accessibilityMotion;
    }
}
