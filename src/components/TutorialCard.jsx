import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { Badge, Card } from "./ui";

export function TutorialCard({ tutorial }) {
    const category = categories.find((item) => item.id === tutorial.category);
    return (
        <Card className="flex h-full flex-col p-5 transition-all bg-card dark:bg-paper hover:-translate-y-0.5 border hover:border-coral/60 hover:shadow-lifted dark:hover:shadow-lifted-dark shadow-soft">
            <div className="flex items-center justify-between gap-3">
                <Badge>{category?.name}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-ink">
                    <Clock className="h-3.5 w-3.5" />
                    {tutorial.duration}
                </span>
            </div>
            <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{tutorial.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-ink">{tutorial.description}</p>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <Badge className="bg-[#fff1ec] text-[#a94c3c]">{tutorial.difficulty}</Badge>
                <Link to={`/tutoriais/${tutorial.id}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#315d70] hover:text-ink">
                    Ver tutorial <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </Card>
    );
}
