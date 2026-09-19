export function SectionTransition({ variant = "organic", tone = "soft", position = "bottom" }) {
    const paths = {
        organic: "M0,50 C170,5 330,94 520,46 C720,-4 870,82 1100,42 C1260,14 1360,28 1440,12 L1440,120 L0,120 Z",
        wave: "M0,34 C240,94 390,4 650,48 C920,92 1110,6 1440,52 L1440,120 L0,120 Z",
        blob: "M0,62 C180,20 320,88 500,58 C720,20 870,104 1080,62 C1240,30 1340,42 1440,28 L1440,120 L0,120 Z",
    };
    return (
        <div className={`section-transition ${position === "top" ? "section-transition-top" : "section-transition-bottom"} tone-${tone}`} aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d={paths[variant] || paths.organic} />
            </svg>
        </div>
    );
}
