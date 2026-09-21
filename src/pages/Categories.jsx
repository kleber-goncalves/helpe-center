import { CategoryCard } from "../components/CategoryCard";
import { HelpCTA } from "../components/HelpCTA2";
import { Reveal } from "../components/Reveal";
import { SectionTransition } from "../components/SectionTransition";
import { categories } from "../data/categories";
export function Categories() {
    return (
        <main className="bg-background">
            <div className="bg-mist3">
                <Reveal y={20} ease="sine.out" duration={0.85}>
                    <div className="mx-auto max-w-6xl px-5 pt-14 lg:px-8">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Navegue por</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Categorias</h1>
                        <p className="mt-4 max-w-xl text-muted-ink">E encontre tutoriais organizados por ferramenta ou habilidade que você queira aprender.</p>
                    </div>
                </Reveal>
                <Reveal y={20} ease="sine.out">
                    <SectionTransition variant="wide" from="mist" to="background" size="large" animation />
                </Reveal>
            </div>

            <section className="mx-auto max-w-6xl px-5 pb-22 grid gap-4 grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </section>
            <HelpCTA />
        </main>
    );
}
