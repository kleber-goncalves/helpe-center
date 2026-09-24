export function TutorialVideo({ video, poster, title = "Vídeo do tutorial", captions }) {
    return (
        <figure className="bg-background p-3 sm:p-5">
            <video className="mx-auto block h-auto w-full max-w-3xl rounded-lg border border-line" controls preload="metadata" playsInline poster={poster} aria-label={title}>
                <source src={video} type="video/mp4" />
                {captions && <track kind="captions" src={captions} srcLang="pt-BR" label="Português" default />}
                Seu navegador não suporta a reprodução deste vídeo.
            </video>

            <figcaption className="mx-auto mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">{title}</figcaption>
        </figure>
    );
}
