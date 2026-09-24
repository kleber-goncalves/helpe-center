export function TutorialStepPreloader({ stepNumber, loaded, total, progress }) {
    return (
        <div className="grid min-h-[420px] place-items-center" role="status" aria-label={`Carregando materiais do passo ${stepNumber}`}>
            <div className="w-full max-w-md px-6 text-center">
                <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">PASSO {String(stepNumber).padStart(2, "0")}</p>

                <h2 className="mt-3 text-2xl font-bold text-ink">Preparando o conteúdo</h2>

                <p className="mt-3 text-sm leading-6 text-muted-ink">Estamos carregando as imagens e vídeos deste passo.</p>

                <div className="mt-8">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                        <span>
                            {loaded} de {total} materiais
                        </span>

                        <span>{progress}%</span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} aria-label={`Carregamento do passo: ${progress}%`}>
                        <div
                            className="h-full rounded-full bg-coral transition-[width] duration-300 ease-out motion-reduce:transition-none"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
