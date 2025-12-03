import React from 'react';
import { Link } from 'react-router-dom';

// 1. IMPORTA TUS IMÁGENES
// Ya que tus imágenes están en src/assets, debes importarlas
import logoPaypal from '../../assets/imagenes/logos/paypal-logo.png';
import logoMercadoPago from '../../assets/imagenes/logos/mercadopago-logo.jpg';
import logoWebpay from '../../assets/imagenes/logos/webpay-logo.png';

export default function Footer() {
    return (
        <footer className='bg-dark text-light py-4 mt-auto'>
            <div className='container'>
                <div className='row'>

                    <div className='col-12 col-lg-4 d-flex align-items-center mb-3 mb-lg-0'>
                        <Link to="https://www.paypal.com/cl/home" target="_blank" rel="noopener noreferrer" className='me-3'>
                            <img src={logoPaypal} alt='paypal' style={{ height: '35px' }} />
                        </Link>
                        <Link to="https://www.mercadopago.cl/" target="_blank" rel="noopener noreferrer" className='me-3'>
                            <img src={logoMercadoPago} alt='mercado pago' style={{ height: '35px' }} />
                        </Link>
                        <Link to="#" target="_blank" rel="noopener noreferrer">
                            <img src={logoWebpay} alt='webPay' style={{ height: '40px' }} />
                        </Link>
                    </div>

                    <div className='col-12 col-lg-4 mb-3 mb-lg-0 d-flex'>
                        <ul className="list-unstyled mb-0">
                            <li><Link to="#" className="link-light text-decoration-none">Terminos y condiciones</Link></li>
                            <li><Link to="#" className="link-light text-decoration-none">Politica de privacidad</Link></li>
                            <li><Link to="#" className="link-light text-decoration-none">Ayuda</Link></li>
                        </ul>
                    </div>

                    <div className='col-12 col-lg-4'>
                        <h5>Suscríbete para recibir novedades</h5>
                        <form>
                            <label htmlFor="newsletter-email" className="visually-hidden">Email</label>
                            <div className="input-group">
                                <input
                                    type='email'
                                    className="form-control"
                                    id="newsletter-email"
                                    placeholder="tu-email@example.com"
                                    aria-label="Email para suscribirse"
                                />
                                <button type="submit" className="btn btn-primary">Suscribirse</button>
                            </div>
                        </form>
                    </div>
                </div>

                <hr className="mt-4" style={{ borderColor: '#6c757d' }} />
                <div className='row'>
                    <div className='col text-center'>
                        <small>&copy; {new Date().getFullYear()} Lvl-Up. Todos los derechos reservados.</small>
                    </div>
                </div>
            </div>
        </footer>
    );
}
