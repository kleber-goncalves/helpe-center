import { OptimizedVideo } from "./OptimizedVideo";

export function TutorialVideo({ video, poster, title = "Vídeo do tutorial", captions }) {
    return (
        <figure className="bg-background p-3 sm:p-5">
            <OptimizedVideo
                src={video}
                poster={poster}
                title={title}
                captions={captions}
                wrapperClassName="mx-auto w-full max-w-3xl"
            />

            <figcaption className="mx-auto mt-2 max-w-3xl text-xs leading-5 text-muted-foreground">
                {title}
            </figcaption>
        </figure>
    );
}
