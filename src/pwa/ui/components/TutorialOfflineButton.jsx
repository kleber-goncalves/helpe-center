import { useEffect, useRef, useState } from "react";
import {
    Check,
    Download,
    LoaderCircle,
    Trash2,
} from "lucide-react";

import { Button } from "../../../components/ui";
import imageMetadata from "../../../generated/imageMetadata.json";
import {
    getTutorialOfflinePackage,
    removeTutorialOffline,
    saveTutorialOffline,
} from "../../downloads/tutorial-package";

export function TutorialOfflineButton({ tutorial, steps }) {
    const [status, setStatus] = useState("checking");
    const [isOnline, setIsOnline] = useState(() =>
        typeof navigator === "undefined" ? true : navigator.onLine,
    );
    const [progress, setProgress] = useState({ completed: 0, total: 0 });
    const [errorMessage, setErrorMessage] = useState("");
    const controllerRef = useRef(null);

    useEffect(() => {
        let active = true;

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        getTutorialOfflinePackage(tutorial.id)
            .then((record) => {
                if (active) {
                    setStatus(
                        record?.status === "saved"
                            ? "saved"
                            : record?.status === "incomplete"
                                ? "incomplete"
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
    }, [tutorial.id]);

    async function handleSave() {
        if (!isOnline || status === "downloading" || status === "removing") {
            return;
        }

        const controller = new AbortController();

        controllerRef.current = controller;
        setProgress({ completed: 0, total: 0 });
        setErrorMessage("");
        setStatus("downloading");

        try {
            await saveTutorialOffline({
                tutorialId: tutorial.id,
                title: tutorial.title,
                steps,
                imageMetadata,
                signal: controller.signal,
                onProgress(nextProgress) {
                    setProgress(nextProgress);
                },
            });

            setStatus("saved");
        } catch (error) {
            if (error?.name === "AbortError") {
                setStatus("idle");
                setErrorMessage("Download cancelado. Nenhum pacote incompleto foi mantido.");
            } else {
                setStatus("error");
                setErrorMessage(
                    error?.message ||
                    "Não foi possível salvar o tutorial. Verifique sua conexão e o espaço disponível.",
                );
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

    return (
        <div className="mt-7 border-t border-line pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                        Os vídeos e links externos continuam exigindo conexão.
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

                {status === "saved" && (
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleSave}
                            disabled={!isOnline}
                        >
                            <Download className="size-4" aria-hidden="true" />
                            Atualizar pacote
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

            {status === "downloading" && (
                <div className="mt-4 max-w-xl">
                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span>Baixando imagens e pôsteres...</span>
                        <span className="tabular-nums">
                            {progress.completed} / {progress.total}
                        </span>
                    </div>

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
                    Este tutorial está disponível offline neste dispositivo.
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
