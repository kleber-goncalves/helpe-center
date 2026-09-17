import { Link, useParams } from "react-router-dom";
import { TutorialCard } from "../components/TutorialCard";
import { categories } from "../data/categories";
import { tutorials } from "../data/tutorials";
export function Category() {
    const { categoryId } = useParams();
    const category = categories.find((item) => item.id === categoryId);
    const results = tutorials.filter((item) => item.category === categoryId);
    if (!category)
        return (
            <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
                <h1 className="text-3xl font-bold text-ink">Categoria não encontrada</h1>
                <Link className="mt-5 inline-block font-bold text-[#315d70]" to="/categorias">
                    Ver categorias
                </Link>
            </main>
        );
    const Icon = category.icon;
    return (
        <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
            <Link to="/categorias" className="text-sm font-semibold text-[#315d70]">
                ← Todas as categorias
            </Link>
            <div className="mt-7 flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#eaf3f5] text-[#315d70]">
                    <Icon className="h-6 w-6" />
                </span>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-ink">{category.name}</h1>
                    <p className="mt-2 text-muted-ink">{category.description}</p>
                </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
            </div>
        </main>
    );
}
