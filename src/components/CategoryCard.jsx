import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "./ui";
import { tutorials } from "../data/tutorials";

export function CategoryCard({ category }) {
    const Icon = category.icon;
    const count = tutorials.filter((tutorial) => tutorial.category === category.id).length;
    return (
        <Link to={`/categorias/${category.id}`} className="group block">
            <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:border-[#b8ccd2] hover:shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#eaf3f5] text-[#315d70]">
                        <Icon className="h-5 w-5" />
                    </span>
                    <ChevronRight className="mt-2 h-4 w-4 text-muted-ink transition-transform group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-5 font-bold text-ink">{category.name}</h3>
                <p className="mt-2 text-sm leading-5 text-muted-ink">{category.description}</p>
                <p className="mt-4 text-xs font-semibold text-[#527282]">
                    {count} {count === 1 ? "tutorial" : "tutoriais"}
                </p>
            </Card>
        </Link>
    );
}
