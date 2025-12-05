import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/estilos/main.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';
import { AutenticacionContext} from './componentes/Autenticacion/Contexto/AutenticacionContext.jsx'
import {CarritoProvider} from './hooks/CarritoContext.jsx' 
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AutenticacionContext>
            <CarritoProvider>
                <App />
            </CarritoProvider>
            </AutenticacionContext>
        </BrowserRouter>
    </StrictMode>,
)
