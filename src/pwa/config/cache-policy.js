/**
 * Políticas de armazenamento do PWA.
 *
 * O app shell contém código e recursos essenciais. Imagens gerais entram
 * no cache runtime ao serem solicitadas. Pacotes de tutoriais possuem
 * caches próprios e só são criados por uma ação explícita da pessoa.
 */
export const APP_SHELL_CACHE_VERSION = "v2";

export const PRECACHE_ASSETS = [
    "favicon.ico",
    "icons/apple-touch-icon.png",
    "logo.svg",
    "iloveIMG.svg",
    "ilovePDF.svg",
];

export const PRECACHE_GLOB_PATTERNS = [
    "**/*.{js,css,html,ico,webmanifest}",
    "icons/*.png",
];

export const PRECACHE_GLOB_IGNORES = [
    "**/tutoriais/**",
    "**/*.mp4",
];

export const MAX_PRECACHE_FILE_SIZE_BYTES = 2 * 1024 * 1024;

/**
 * O limite comporta o conjunto atual de imagens gerais e suas variantes
 * responsivas sem permitir crescimento ilimitado do cache runtime.
 */
export const RUNTIME_IMAGE_CACHE_NAME = "hauy-conecta-runtime-images-v1";
export const MAX_RUNTIME_IMAGE_CACHE_ENTRIES = 1000;

/**
 * Cada tutorial possui um cache independente para que a remoção de um
 * pacote não apague recursos de outros tutoriais.
 */
export const TUTORIAL_PACKAGE_CACHE_PREFIX = "hauy-conecta-tutorial-package-v1-";
export const TUTORIAL_PACKAGE_VERSION = 1;
