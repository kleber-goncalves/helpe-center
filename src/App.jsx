import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { About } from "./pages/About";
import { Categories } from "./pages/Categories";
import { Category } from "./pages/Category";
import { FAQ } from "./pages/FAQ";
import { Home } from "./pages/Home";
import { Tutorial } from "./pages/Tutorial";
import { Tutorials } from "./pages/Tutorials";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-paper">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categorias" element={<Categories />} />
                    <Route path="/categorias/:categoryId" element={<Category />} />
                    <Route path="/tutoriais" element={<Tutorials />} />
                    <Route path="/tutoriais/:tutorialId" element={<Tutorial />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/sobre" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
