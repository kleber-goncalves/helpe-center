import { CategoryCard } from "../components/CategoryCard";
import { categories } from "../data/categories";
export function Categories() {
    return (
        <main className="bg-hero-wash">
            <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#507283]">Navegue por</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">Categorias</h1>
                <p className="mt-4 max-w-xl text-muted-ink">E encontre tutoriais organizados por ferramenta ou habilidade que você queira aprender.</p>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </main>
    );
}
