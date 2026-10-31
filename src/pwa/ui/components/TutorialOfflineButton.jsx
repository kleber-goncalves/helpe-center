import { useEffect, useMemo, useRef, useState } from "react";
import {
    Check,
    Download,
    LoaderCircle,
    Trash2,
} from "lucide-react";

import { Button } from "../../../components/ui";
import imageMetadata from "../../../generated/imageMetadata.json";
import {
    collectTutorialVideoResources,
    createTutorialContentVersions,
    estimateTutorialVideoSize,
    formatBytes,
    getTutorialOfflinePackage,
    removeTutorialOffline,
    saveTutorialOffline,
} from "../../downloads/tutorial-package";

export function TutorialOfflineButton({ tutorial, steps }) {
    const [status, setStatus] = useState("checking");
    const [isOnline, setIsOnline] = useState(() =>
        typeof navigator === "undefined" ? true : navigator.onLine,
    );
    const [includeVideos, setIncludeVideos] = useState(false);
    const [savedIncludesVideos, setSavedIncludesVideos] = useState(false);
    const [progress, setProgress] = useState({
        completed: 0,
        total: 0,
        bytesDownloaded: 0,
        totalBytes: 0,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const controllerRef = useRef(null);

    const videoPaths = collectTutorialVideoResources(steps);
    const videoEstimate = estimateTutorialVideoSize(videoPaths, imageMetadata.videos);
    const contentVersions = useMemo(
        () => createTutorialContentVersions({
            tutorial,
            steps,
            imageMetadata,
            videoMetadata: imageMetadata.videos,
        }),
        [tutorial, steps],
    );

    useEffect(() => {
        let active = true;

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        getTutorialOfflinePackage(tutorial.id, contentVersions)
            .then((record) => {
                if (active) {
                    const hasSavedVideos = Boolean(record?.videos?.length);

                    setSavedIncludesVideos(hasSavedVideos);
                    setIncludeVideos(hasSavedVideos);
                    setStatus(
                        ["saved", "incomplete", "outdated"].includes(record?.status)
                            ? record.status
                            : "idle",
                    );
                }
            })
            .catch(() => {
                if (active) {
                    setStatus("error");
                    setErrorMessage("Não foi possível verificar o armazenamento offline deste dispositivo.");
                }
            });

        return () => {
            active = false;
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            controllerRef.current?.abort();
        };
    }, [tutorial.id, contentVersions]);

    async function handleSave() {
        if (!isOnline || status === "downloading" || status === "removing") {
            return;
        }

        const controller = new AbortController();

        controllerRef.current = controller;
        setProgress({
            completed: 0,
            total: 0,
            bytesDownloaded: 0,
            totalBytes: 0,
        });
        setErrorMessage("");
        setStatus("downloading");

        try {
            const record = await saveTutorialOffline({
                tutorialId: tutorial.id,
                title: tutorial.title,
                steps,
                imageMetadata,
                includeVideos,
                videoMetadata: imageMetadata.videos,
                ...contentVersions,
                signal: controller.signal,
                onProgress(nextProgress) {
                    setProgress(nextProgress);
                },
            });

            const hasSavedVideos = Boolean(record.videos?.length);

            setSavedIncludesVideos(hasSavedVideos);
            setIncludeVideos(hasSavedVideos);
            setStatus("saved");
        } catch (error) {
            let previousRecord = null;

            try {
                previousRecord = await getTutorialOfflinePackage(tutorial.id, contentVersions);
            } catch {
                // Mantém a mensagem principal da falha de download.
            }

            const previousStatus = previousRecord?.status ?? "idle";
            const hasPreservedPackage = previousStatus === "saved" || previousStatus === "outdated";

            setStatus(previousStatus);
            setSavedIncludesVideos(Boolean(previousRecord?.videos?.length));

            if (previousRecord) {
                setIncludeVideos(Boolean(previousRecord.videos?.length));
            }

            if (error?.name === "AbortError") {
                setErrorMessage(
                    hasPreservedPackage
                        ? "Download cancelado. A versão anterior do pacote foi preservada."
                        : previousStatus === "incomplete"
                            ? "Download cancelado. O pacote anterior continua identificado como incompleto."
                            : "Download cancelado. Nenhum pacote parcial foi mantido.",
                );
            } else {
                const isQuotaError = error?.name === "QuotaExceededError" ||
                    /quota|storage.*full|disk full|no space/i.test(error?.message ?? "");

                if (isQuotaError) {
                    const storageMessage = "O armazenamento deste dispositivo está cheio. Libere espaço e tente novamente.";

                    setErrorMessage(
                        hasPreservedPackage
                            ? storageMessage + " A versão anterior do pacote foi preservada."
                            : storageMessage + " O download parcial foi descartado.",
                    );
                } else {
                    const message = error?.message ||
                        "Não foi possível salvar o tutorial. Verifique sua conexão e o espaço disponível.";

                    setErrorMessage(
                        hasPreservedPackage
                            ? message + " A versão anterior do pacote foi preservada."
                            : message,
                    );
                }

                if (!previousRecord) {
                    setStatus("error");
                }
            }
        } finally {
            controllerRef.current = null;
        }
    }

    async function handleRemove() {
        if (status === "removing" || status === "downloading") {
            return;
        }

        setStatus("removing");
        setErrorMessage("");

        try {
            await removeTutorialOffline(tutorial.id);
            setSavedIncludesVideos(false);
            setIncludeVideos(false);
            setStatus("idle");
        } catch (error) {
            setStatus("error");
            setErrorMessage(error?.message || "Não foi possível remover o pacote offline.");
        }
    }

    function handleCancel() {
        controllerRef.current?.abort();
    }

    const progressPercent = progress.total > 0
        ? Math.round((progress.completed / progress.total) * 100)
        : 0;
    const isBusy = status === "checking" || status === "downloading" || status === "removing";

    return (
        <div className="mt-7 border-t border-line pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                    <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">
                        ACESSO OFFLINE
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-ink">
                        Leve este tutorial com você
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-ink">
                        Salve o conteúdo, as imagens e os pôsteres para consultar
                        este tutorial sem internet neste dispositivo.
                        Os vídeos podem ser incluídos separadamente.
                    </p>
                </div>

                {status === "checking" && (
                    <Button type="button" variant="outline" disabled>
                        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        Verificando...
                    </Button>
                )}

                {status === "idle" && (
                    <Button
                        type="button"
                        variant="coral"
                        onClick={handleSave}
                        disabled={!isOnline}
                    >
                        <Download className="size-4" aria-hidden="true" />
                        Salvar tutorial offline
                    </Button>
                )}

                {status === "downloading" && (
                    <Button type="button" variant="outline" disabled>
                        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        Preparando...
                    </Button>
                )}

                {status === "outdated" && (
                <p className="mt-3 text-sm text-amber-700 dark:text-amber-400" role="status">
                    O conteúdo deste tutorial mudou desde o último download. A versão salva continua no dispositivo, mas precisa ser atualizada para corresponder ao portal.
                </p>
            )}

            {status === "incomplete" && (
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="coral"
                            onClick={handleSave}
                            disabled={!isOnline}
                        >
                            <Download className="size-4" aria-hidden="true" />
                            Reparar pacote
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleRemove}
                        >
                            <Trash2 className="size-4" aria-hidden="true" />
                            Remover pacote
                        </Button>
                    </div>
                )}

                {(status === "saved" || status === "outdated") && (
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleSave}
                            disabled={!isOnline}
                        >
                            <Download className="size-4" aria-hidden="true" />
                            {status === "outdated" ? "Atualizar pacote desatualizado" : "Atualizar pacote"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleRemove}
                        >
                            <Trash2 className="size-4" aria-hidden="true" />
                            Remover
                        </Button>
                    </div>
                )}

                {status === "removing" && (
                    <Button type="button" variant="outline" disabled>
                        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        Removendo...
                    </Button>
                )}

                {status === "error" && (
                    <Button
                        type="button"
                        variant="coral"
                        onClick={handleSave}
                        disabled={!isOnline}
                    >
                        <Download className="size-4" aria-hidden="true" />
                        Tentar novamente
                    </Button>
                )}
            </div>

            {videoPaths.length > 0 && (
                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-background p-4">
                    <input
                        type="checkbox"
                        checked={includeVideos}
                        onChange={(event) => setIncludeVideos(event.target.checked)}
                        disabled={!isOnline || isBusy}
                        className="mt-1 size-4 shrink-0 accent-coral"
                    />

                    <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">
                            Incluir vídeos para assistir sem internet
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                            {videoPaths.length} {videoPaths.length === 1 ? "vídeo" : "vídeos"}
                            {" · "}
                            {videoEstimate.unknownCount === 0
                                ? formatBytes(videoEstimate.knownBytes)
                                : videoEstimate.knownBytes > 0
                                    ? formatBytes(videoEstimate.knownBytes) + " conhecidos + " + videoEstimate.unknownCount + " sem tamanho informado"
                                    : "tamanho ainda não informado"}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                            Os vídeos serão baixados por completo. O tamanho estimado será consumido no armazenamento deste dispositivo e no seu pacote de dados.
                        </span>
                    </span>
                </label>
            )}

            {status === "downloading" && (
                <div className="mt-4 max-w-xl">
                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span>
                            {includeVideos
                                ? "Baixando imagens, pôsteres e vídeos..."
                                : "Baixando imagens e pôsteres..."}
                        </span>
                        <span className="tabular-nums">
                            {progress.completed} / {progress.total}
                        </span>
                    </div>

                    {includeVideos && progress.totalBytes > 0 && (
                        <p className="mt-2 text-xs text-muted-foreground tabular-nums">
                            {formatBytes(progress.bytesDownloaded)} de {formatBytes(progress.totalBytes)} em vídeos
                        </p>
                    )}

                    <div
                        className="mt-2 h-2 overflow-hidden rounded-full bg-background"
                        role="progressbar"
                        aria-label="Progresso do pacote offline"
                        aria-valuemin="0"
                        aria-valuemax={progress.total || 1}
                        aria-valuenow={progress.completed}
                    >
                        <div
                            className="h-full rounded-full bg-coral transition-[width] duration-200"
                            style={{ width: progressPercent + "%" }}
                        />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="mt-3 min-h-9 px-3 text-xs"
                        onClick={handleCancel}
                    >
                        Cancelar download
                    </Button>
                </div>
            )}

            {status === "incomplete" && (
                <p className="mt-3 text-sm text-muted-foreground" role="status">
                    Parte dos arquivos não está mais disponível no armazenamento. Repare o pacote enquanto estiver conectado ou remova-o.
                </p>
            )}

            {status === "saved" && (
                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400" role="status">
                    <Check className="size-4 shrink-0" aria-hidden="true" />
                    {savedIncludesVideos
                        ? "Este tutorial e seus vídeos estão disponíveis offline neste dispositivo."
                        : "Este tutorial está disponível offline neste dispositivo."}
                </p>
            )}

            {!isOnline && status !== "saved" && (
                <p className="mt-3 text-sm text-muted-foreground" role="status">
                    Conecte-se à internet para salvar este tutorial.
                </p>
            )}

            {errorMessage && (
                <p className="mt-3 text-sm text-coral" role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
