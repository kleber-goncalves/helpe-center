import { useEffect, useState } from "react";

const MIN_LOADING_TIME = 1500;

/*
 * =========================================================
 * CACHE GLOBAL DA SESSÃO
 * =========================================================
 *
 * completedMedia:
 * mídias que já terminaram de carregar.
 *
 * pendingMedia:
 * Promises de mídias que ainda estão carregando.
 *
 * Dessa forma, uma mídia:
 * - não é carregada duas vezes;
 * - pode ser reutilizada quando o usuário volta ao passo;
 * - não precisa mostrar o preloader novamente.
 */
const completedMedia = new Set();
const pendingMedia = new Map();

/*
 * =========================================================
 * OBTÉM AS MÍDIAS DO PASSO
 * =========================================================
 */

function getStepMedia(step) {
    const images = [];
    const videos = [];

    if (step?.image) {
        images.push(step.image);
    }

    if (step?.video) {
        videos.push(step.video);
    }

    if (step?.poster) {
        images.push(step.poster);
    }

    for (const example of step?.examples ?? []) {
        if (example.image) {
            images.push(example.image);
        }

        if (example.poster) {
            images.push(example.poster);
        }

        if (example.video) {
            videos.push(example.video);
        }
    }

    return {
        images: [...new Set(images)],
        videos: [...new Set(videos)],
    };
}

/*
 * =========================================================
 * AGUARDA UM TEMPO
 * =========================================================
 */

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/*
 * =========================================================
 * CARREGAR IMAGEM
 * =========================================================
 */

function loadImage(src) {
    const cacheKey = `image:${src}`;

    /*
     * Já terminou de carregar.
     */
    if (completedMedia.has(cacheKey)) {
        return Promise.resolve();
    }

    /*
     * Já existe um carregamento acontecendo.
     * Reutilizamos a mesma Promise.
     */
    if (pendingMedia.has(cacheKey)) {
        return pendingMedia.get(cacheKey);
    }

    const promise = new Promise((resolve) => {
        const image = new Image();

        const finish = () => {
            completedMedia.add(cacheKey);
            pendingMedia.delete(cacheKey);
            resolve();
        };

        image.onload = finish;
        image.onerror = finish;

        image.src = src;
    });

    pendingMedia.set(cacheKey, promise);

    return promise;
}

/*
 * =========================================================
 * CARREGAR VÍDEO
 * =========================================================
 */

function loadVideo(src) {
    const cacheKey = `video:${src}`;

    /*
     * Já terminou de preparar.
     */
    if (completedMedia.has(cacheKey)) {
        return Promise.resolve();
    }

    /*
     * Já está sendo preparado.
     */
    if (pendingMedia.has(cacheKey)) {
        return pendingMedia.get(cacheKey);
    }

    const promise = new Promise((resolve) => {
        const video = document.createElement("video");

        let finished = false;

        const finish = () => {
            if (finished) {
                return;
            }

            finished = true;

            video.removeEventListener("canplay", finish);
            video.removeEventListener("error", finish);

            completedMedia.add(cacheKey);
            pendingMedia.delete(cacheKey);

            video.removeAttribute("src");
            video.load();

            resolve();
        };

        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;

        video.addEventListener("canplay", finish, {
            once: true,
        });

        video.addEventListener("error", finish, {
            once: true,
        });

        video.src = src;
        video.load();
    });

    pendingMedia.set(cacheKey, promise);

    return promise;
}

/*
 * =========================================================
 * HOOK
 * =========================================================
 */

export function useTutorialStepMedia(step) {
    const { images, videos } = getStepMedia(step);

    const media = [
        ...images.map((src) => ({
            type: "image",
            src,
            key: `image:${src}`,
        })),

        ...videos.map((src) => ({
            type: "video",
            src,
            key: `video:${src}`,
        })),
    ];

    const total = media.length;

    /*
     * Começa já contando as mídias que estão no cache.
     *
     * Isso é importante porque, ao voltar para um passo,
     * o componente pode nascer já com 100%.
     */
    const [loaded, setLoaded] = useState(() => {
        return media.filter((item) => completedMedia.has(item.key)).length;
    });

    useEffect(() => {
        let cancelled = false;

        /*
         * Não há nada para carregar.
         */
        if (total === 0) {
            return undefined;
        }

        const startTime = performance.now();

        /*
         * Começamos pelas mídias que já estão prontas.
         */
        let completed = media.filter((item) => completedMedia.has(item.key)).length;

        /*
         * Como o state inicial já contou o cache,
         * não precisamos chamar setState aqui.
         */

        async function preload() {
            const tasks = media.map(async (item) => {
                if (completedMedia.has(item.key)) {
                    return;
                }

                if (item.type === "image") {
                    await loadImage(item.src);
                } else {
                    await loadVideo(item.src);
                }

                completed += 1;

                if (!cancelled) {
                    setLoaded(completed);
                }
            });

            await Promise.all(tasks);

            /*
             * Garante que o preloader fique visível
             * pelo tempo mínimo definido.
             */
            const elapsed = performance.now() - startTime;

            const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

            await wait(remainingTime);

            if (!cancelled) {
                setLoaded(total);
            }
        }

        preload();

        return () => {
            cancelled = true;
        };
    }, [step, total]);

    /*
     * =====================================================
     * ESTADOS DERIVADOS
     * =====================================================
     */

    const isReady = total === 0 || loaded >= total;

    const progress = total > 0 ? Math.round((loaded / total) * 100) : 100;

    return {
        loaded,
        total,
        progress,
        isReady,
    };
}
