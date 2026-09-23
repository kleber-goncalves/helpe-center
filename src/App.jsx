import { lazy, Suspense, useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Preloader } from "./components/Preloader";
import { ScrollToTop } from "./components/ScrollToTop";
import ButtonReset from "./components/buttonReset";

import "./App.css";
import { Category } from "./pages/Category";

/*
 * Code Splitting das páginas.
 *
 * Cada arquivo só é baixado quando a rota
 * correspondente precisar dele.
 */
const Home = lazy(() =>
    import("./pages/Home2").then((module) => ({
        default: module.Home,
    })),
);

const About = lazy(() =>
    import("./pages/About").then((module) => ({
        default: module.About,
    })),
);

const Categories = lazy(() =>
    import("./pages/Categories").then((module) => ({
        default: module.Categories,
    })),
);

<Route path="/categorias/:categoryId" element={<Category />} />;

const FAQ = lazy(() =>
    import("./pages/FAQ").then((module) => ({
        default: module.FAQ,
    })),
);

const Tutorials = lazy(() =>
    import("./pages/Tutorials").then((module) => ({
        default: module.Tutorials,
    })),
);

const Tutorial = lazy(() =>
    import("./pages/Tutorial").then((module) => ({
        default: module.Tutorial,
    })),
);

const SendQuestion = lazy(() =>
    import("./pages/SendQuestion").then((module) => ({
        default: module.SendQuestion,
    })),
);

const NotFound = lazy(() =>
    import("./pages/NotFound").then((module) => ({
        default: module.NotFound,
    })),
);

/*
 * Fallback utilizado quando uma página ainda está
 * sendo baixada durante uma navegação interna.
 */
function RouteLoadingFallback() {
    return (
        <div className="flex min-h-[40vh] items-center justify-center" aria-live="polite" aria-label="Carregando página">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-coral" aria-hidden="true" />
                <span>Carregando...</span>
            </div>
        </div>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    const handlePreloaderComplete = useCallback(() => {
        setLoading(false);
    }, []);

    return (
        <BrowserRouter>
            {loading && <Preloader onComplete={handlePreloaderComplete} />}

            <div id="theme-transition" className="pointer-events-none fixed inset-0 z-[9999] opacity-0" aria-hidden="true" />

            <ScrollToTop />

            <div className="min-h-screen bg-background">
                <Header />

                <ButtonReset />

                <Suspense fallback={<RouteLoadingFallback />}>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/categorias" element={<Categories />} />

                        <Route path="/categorias/:categoryId" element={<Category />} />

                        <Route path="/tutoriais" element={<Tutorials />} />

                        <Route path="/tutoriais/:tutorialId" element={<Tutorial />} />

                        <Route path="/faq" element={<FAQ />} />

                        <Route path="/sobre" element={<About />} />

                        <Route path="/enviar-duvida" element={<SendQuestion />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
