import { Routes, Route } from "react-router-dom";
import MainLayout from "./componentes/layout/MainLayout";


import HomePage from './paginas/HomePage.jsx';
import AutenticacionLayout from "./componentes/layout/AutenticacionLayout.jsx";
import LoginPage from "./paginas/LoginPage.jsx";
import CrearSesionPage from "./paginas/CrearSesionPage.jsx";
import CategoriasPage from "./paginas/CategoriasPage.jsx";
import OfertasPage from "./paginas/OfertasPage.jsx";
import NosotrosPage from "./paginas/NosotrosPage.jsx";
import BlogPage from "./paginas/BlogPage.jsx";
import ContactoPage from "./paginas/ContactoPage.jsx"
import CarritoPage from "./paginas/CarritoPage.jsx";
import OrdenPage from "./paginas/OrdenPage.jsx";

function App() {

    return (

        <Routes>
            {/* Todas las rutas aquí usarán tu Header y Footer */}
            <Route path="/" element={<MainLayout/>}>
                {/* La página de inicio que acabamos de crear */}
                <Route index element={<HomePage />} />
                {/* Tus otras páginas irían aquí */}
                {/* <Route path="productos" element={<ProductosPage />} /> */}
                <Route path="categorias" element={<CategoriasPage/>} />
                <Route path="ofertas" element={<OfertasPage/>} />
                <Route path="nosotros" element={<NosotrosPage/>} />
                <Route path="blog" element={<BlogPage/>} />
                <Route path="contacto" element={<ContactoPage/>} />
                <Route path="carrito" element={<CarritoPage/>} />
                <Route path="compra" element={<OrdenPage/>} />
            </Route>
            <Route path="/login" element={<AutenticacionLayout/>}>
                <Route index element={<LoginPage />} />
            </Route>
            
            <Route path="/iniciar-sesion" element={<AutenticacionLayout/>}>
                <Route index element={<CrearSesionPage />} />
            </Route>
            {/* Rutas sin layout (como el login) irían aquí afuera */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
    )
}

export default App
