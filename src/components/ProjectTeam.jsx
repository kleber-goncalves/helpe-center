import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TeamOption } from "./TeamOption";
import { OptimizedImage } from "./OptimizedImage";

// Assets alunos
import testeAlunos from "../assets/equipe/alunos/testeAlunos.jpg";
import cirlena from "../assets/equipe/alunos/cirlena.png";
import divina from "../assets/equipe/alunos/divina.png";
import carlos from "../assets/equipe/alunos/carlos.png";
import joseRoberto from "../assets/equipe/alunos/jose-roberto.png";

// Assets professores
import testeProf from "../assets/equipe/professores/testeProf.jpg";

const team = {
    alunos: {
        label: "Alunos",
        description: "Integrantes responsáveis pelo desenvolvimento do projeto.",
        members: [
            {
                name: "Cirlene",
                role: "Aluna",
                image: cirlena,
                metadataKey: "src/assets/equipe/alunos/cirlena.png",
            },
            {
                name: "Carlos",
                role: "Aluno",
                image: carlos,
                metadataKey: "src/assets/equipe/alunos/carlos.png",
            },
            {
                name: "Divina",
                role: "Aluna",
                image: divina,
                metadataKey: "src/assets/equipe/alunos/divina.png",
            },
            {
                name: "José Roberto",
                role: "Aluno",
                image: joseRoberto,
                metadataKey: "src/assets/equipe/alunos/jose-roberto.png",
            },
            {
                name: "Kleber",
                role: "Aluno",
                image: testeAlunos,
                metadataKey: "src/assets/equipe/alunos/testeAlunos.jpg",
            },
        ],
    },

    professores: {
        label: "Professores",
        description: "Professores que acompanharam e apoiaram o projeto.",
        members: [
            {
                name: "Fabio",
                role: "Professor",
                image: testeProf,
                metadataKey: "src/assets/equipe/professores/testeProf.jpg",
            },
            {
                name: "Felipe Cordeiro",
                role: "Professor",
                image: testeProf,
                metadataKey: "src/assets/equipe/professores/testeProf.jpg",
            },
            {
                name: "Auro",
                role: "Professor",
                image: testeProf,
                metadataKey: "src/assets/equipe/professores/testeProf.jpg",
            },
        ],
    },
};

export function ProjectTeam() {
    const [activeGroup, setActiveGroup] = useState("alunos");

    const gridRef = useRef(null);

    const currentGroup = team[activeGroup];
    const members = currentGroup.members;

    useLayoutEffect(() => {
        const elements = gridRef.current?.children;

        if (!elements?.length) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Estado inicial sem animação
        if (reduceMotion) {
            gsap.set(elements, {
                autoAlpha: 1,
                y: 0,
            });

            return;
        }

        // Mata animações anteriores para evitar conflito
        gsap.killTweensOf(elements);

        gsap.fromTo(
            elements,
            {
                autoAlpha: 0,
                y: 16,
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.055,
                ease: "power2.out",
                overwrite: true,
            },
        );

        return () => {
            gsap.killTweensOf(elements);
        };
    }, [activeGroup]);

    return (
        <section className="mt-6">
            <fieldset className="m-0 border-0 p-0">
                <legend className="sr-only">Selecione quem deseja visualizar na equipe do projeto</legend>

                {/* Seletor */}
                {/* Seletor */}
                <div className={["inline-flex max-w-full flex-wrap", "rounded-lg border border-line", "bg-background p-1"].join(" ")} role="radiogroup" aria-label="Grupo da equipe">
                    <TeamOption value="alunos" label="Alunos" activeGroup={activeGroup} onChange={setActiveGroup} />

                    <TeamOption value="professores" label="Professores" activeGroup={activeGroup} onChange={setActiveGroup} />
                </div>

                {/* Descrição do grupo */}
                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-sm font-semibold text-foreground">{currentGroup.label}</p>

                    <span className="text-sm text-muted-ink" aria-live="polite">
                        {members.length} {members.length === 1 ? "integrante" : "integrantes"}
                    </span>
                </div>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-ink">{currentGroup.description}</p>

                {/* Grid */}
                <div id="team-members" ref={gridRef} className={["mt-7 grid min-w-0 gap-x-4 gap-y-8", "grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-5"].join(" ")} aria-live="polite" aria-atomic="false">
                    {members.map((member) => (
                        <article key={`${activeGroup}-${member.name}`} className="group min-w-0">
                            {/* Foto */}
                            <div className={["relative overflow-hidden", "rounded-lg border border-line", "bg-mist3"].join(" ")}>
                                <OptimizedImage
                                    src={member.image}
                                    alt={`Foto de ${member.name}`}
                                    metadataKey={member.metadataKey}
                                    loading="lazy"
                                    fetchPriority="low"
                                    decoding="async"
                                    aspectRatio="4 / 5"
                                    className={["object-cover", "transition-transform duration-500", "ease-out", "motion-safe:group-hover:scale-[1.025]"].join(" ")}
                                />
                            </div>

                            {/* Informação */}
                            <div className="mt-3">
                                <h3 className="text-sm font-bold text-foreground">{member.name}</h3>

                                <p className="mt-1 text-xs text-muted-ink">{member.role}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </fieldset>
        </section>
    );
}
