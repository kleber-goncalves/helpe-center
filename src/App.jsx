import { lazy, Suspense, useCallback, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Preloader } from "./components/Preloader";
import { ScrollToTop } from "./components/ScrollToTop";
import ButtonReset from "./components/buttonReset";

import "./App.css";
import { Category } from "./pages/Category";
import { AccessibilityMenu } from "./components/AccessibilityMenu";
import { Assistente } from "./pages/Assistente";
import { HauyAssistantWidget } from "./components/HauyAssistantWidget";

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
/*
 * =========================================================
 * CONTEÚDO DA APLICAÇÃO
 * =========================================================
 *
 * Este componente está dentro do BrowserRouter,
 * portanto pode utilizar useLocation().
 */

function AppContent() {
    const [loading, setLoading] =
        useState(true);

    const location =
        useLocation();

    const handlePreloaderComplete =
        useCallback(() => {
            setLoading(false);
        }, []);

    return (
        <>
            {/* ==============================================
                PRELOADER
            ============================================== */}

            {loading && (
                <Preloader
                    onComplete={
                        handlePreloaderComplete
                    }
                />
            )}

            {/* ==============================================
                TRANSIÇÃO DE TEMA
            ============================================== */}

            <div
                id="theme-transition"
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    z-[9999]
                    opacity-0
                "
                aria-hidden="true"
            />

            {/* ==============================================
                SCROLL
            ============================================== */}

            <ScrollToTop />

            {/* ==============================================
                APLICAÇÃO
            ============================================== */}

            <div className="min-h-screen bg-background">
                {/* ==========================================
                    HEADER
                ========================================== */}

                <Header />

                {/* ==========================================
                    ACESSIBILIDADE
                ========================================== */}

                <AccessibilityMenu />

                {/* ==========================================
                    RESET
                ========================================== */}

                <ButtonReset />

                {/* ==========================================
                    ASSISTENTE GLOBAL
                ==========================================
                
                    O key faz o widget ser remontado
                    quando a rota muda.

                    Isso reseta:

                    open = false

                    sem precisar chamar
                    setOpen() dentro de useEffect.
                */}

                <HauyAssistantWidget
                    key={location.pathname}
                />

                {/* ==========================================
                    ROTAS
                ========================================== */}

                <Suspense
                    fallback={
                        <RouteLoadingFallback />
                    }
                >
                    <Routes>
                        {/* ================================
                            HOME
                        ================================= */}

                        <Route
                            path="/"
                            element={
                                <Home />
                            }
                        />

                        {/* ================================
                            CATEGORIAS
                        ================================= */}

                        <Route
                            path="/categorias"
                            element={
                                <Categories />
                            }
                        />

                        <Route
                            path="/categorias/:categoryId"
                            element={
                                <Category />
                            }
                        />

                        {/* ================================
                            TUTORIAIS
                        ================================= */}

                        <Route
                            path="/tutoriais"
                            element={
                                <Tutorials />
                            }
                        />

                        <Route
                            path="/tutoriais/:tutorialId"
                            element={
                                <Tutorial />
                            }
                        />

                        {/* ================================
                            FAQ
                        ================================= */}

                        <Route
                            path="/faq"
                            element={
                                <FAQ />
                            }
                        />

                        {/* ================================
                            SOBRE
                        ================================= */}

                        <Route
                            path="/sobre"
                            element={
                                <About />
                            }
                        />

                        {/* ================================
                            ENVIAR DÚVIDA
                        ================================= */}

                        <Route
                            path="/enviar-duvida"
                            element={
                                <SendQuestion />
                            }
                        />

                        {/* ================================
                            ASSISTENTE
                        ================================= */}

                        <Route
                            path="/assistente"
                            element={
                                <Assistente />
                            }
                        />

                        {/* ================================
                            404
                        ================================= */}

                        <Route
                            path="*"
                            element={
                                <NotFound />
                            }
                        />
                    </Routes>
                </Suspense>

                {/* ==========================================
                    FOOTER
                ========================================== */}

                <Footer />
            </div>
        </>
    );
}

/*
 * =========================================================
 * APP
 * =========================================================
 */

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;