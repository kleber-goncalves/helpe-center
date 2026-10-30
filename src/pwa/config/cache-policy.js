/**
 * Recursos permitidos no precache inicial.
 *
 * A biblioteca de tutoriais, suas imagens e todos os vídeos ficam fora
 * desta lista. Downloads escolhidos pelo usuário terão outro ciclo de vida.
 */
export const APP_SHELL_CACHE_VERSION = "v1";

export const PRECACHE_GLOB_PATTERNS = [
    "**/*.{js,css,html,ico,webmanifest}",
    "icons/*.png",
];

export const PRECACHE_GLOB_IGNORES = [
    "**/tutoriais/**",
    "**/*.mp4",
];

export const MAX_PRECACHE_FILE_SIZE_BYTES = 2 * 1024 * 1024;
