import { Routes, Route } from "react-router-dom";
import MainLayout from "./componentes/layout/MainLayout";


import HomePage from './paginas/HomePage.jsx';
import AutenticacionLayout from "./componentes/layout/AutenticacionLayout.jsx";
import LoginPage from "./paginas/LoginPage.jsx";
import CrearSesionPage from "./paginas/CrearSesionPage.jsx";
import CategoriasPage from "./paginas/CategoriasPage.jsx";
import CategoriasAdminPage from './paginas/Admin/Categorias/CategoriasPage.jsx'
import OfertasPage from "./paginas/OfertasPage.jsx";
import NosotrosPage from "./paginas/NosotrosPage.jsx";
import BlogPage from "./paginas/BlogPage.jsx";
import ContactoPage from "./paginas/ContactoPage.jsx"
import CarritoPage from "./paginas/CarritoPage.jsx";
import OrdenPage from "./paginas/OrdenPage.jsx";
import AdminLayout from "./componentes/layout/AdminLayout.jsx";
import RutaProtegidaAdmin from "./componentes/Autenticacion/RutaProtegidaAdmin.jsx";
import AdminPage from "./paginas/Admin/AdminPage.jsx"
import OrdenesPage from "./paginas/Admin/Ordenes/OrdenesPage.jsx";
import OrdenAdmin from "./componentes/Orden/Admin/OrdenAdmin.jsx";
import OrdenDetallePage from "./paginas/OrdenDetallePage.jsx";
import ProductosPage from "./paginas/Admin/Productos/ProductosPage.jsx";
import ProductosCriticosPage from "./paginas/Admin/Productos/ProductosCriticosPage.jsx";
import ProductosTarjetaPage from "./paginas/Admin/Productos/ProductosTarjetaPage.jsx";
import NuevoProductoPage from "./paginas/Admin/Productos/NuevoProductoPage.jsx";
import NuevaCategoriaPage from "./paginas/Admin/Categorias/NuevaCategoriaPage.jsx";
import ListadoUsuariosPage from './paginas/Admin/Usuarios/ListadoUsuariosPage.jsx'
import NuevoUsuarioPage from "./paginas/Admin/Usuarios/NuevoUsuarioPage.jsx";
import ReportesPage from "./paginas/Admin/Reportes/ReportesPage.jsx";
function App() {

    return (
        <Routes>

            <Route path="/" element={<MainLayout />}>

                <Route index element={<HomePage />} />

                <Route path="categorias" element={<CategoriasPage />} />
                <Route path="ofertas" element={<OfertasPage />} />
                <Route path="nosotros" element={<NosotrosPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="contacto" element={<ContactoPage />} />
                <Route path="carrito" element={<CarritoPage />} />
                <Route path="compra" element={<OrdenPage />} />
            </Route>
            <Route path="/login" element={<AutenticacionLayout />}>
                <Route index element={<LoginPage />} />
            </Route>

            <Route path="/iniciar-sesion" element={<AutenticacionLayout />}>
                <Route index element={<CrearSesionPage />} />
            </Route>

            <Route element={<RutaProtegidaAdmin />}> 
                <Route path="/admin" element={<AdminLayout />}> 
                    
                    <Route index element={<AdminPage />} /> 
                    <Route path="ordenes" element={<OrdenesPage/>} />
                    <Route path="ordenes/orden" element={<OrdenDetallePage/>}/>
                    <Route path="productos" element={<ProductosPage/>}/>
                    <Route path="productos/criticos" element={<ProductosCriticosPage/>}/>
                    <Route path="productos/tarjetas" element={<ProductosTarjetaPage/>}/>
                    <Route path="productos/nuevo" element={<NuevoProductoPage/>}/>

                    <Route path="categorias" element={<CategoriasAdminPage/>}/>
                    <Route path="categorias/nueva" element={<NuevaCategoriaPage/>}/>

                    <Route path="usuarios" element={<ListadoUsuariosPage/>}/>
                    <Route path="usuarios/nuevo" element={<NuevoUsuarioPage/>}/>

                    <Route path="reportes" element={<ReportesPage/>}/>
                </Route>
            </Route>

        </Routes>
    )
}

export default App
