import React from 'react'

export default function Footer() {
    return (
        <footer className='container-fluid p-0 w-100 m-0'>
            <div className='row'>
                <div className='col-12 col-lg-4 d-flex'>
                    <a href="https://www.paypal.com/cl/home"><img className='img-fluid' src='src\assets\imagenes\logos\paypal-logo.png' alt='paypal'></img></a>
                    <a href="https://www.mercadopago.cl/"><img className='img-fluid' src='src\assets\imagenes\logos\mercadopago-logo.jpg' alt='mercado pago'></img></a>
                    <a href=""><img className='img-fluid' src='src\assets\imagenes\logos\webpay-logo.png' alt='webPay'></img></a>
                </div>
                <div className='col-12 col-lg-4'>
                    <small><a href="#">Terminos y condiciones</a></small>
                    <small><a href="#">Politica de privacidad</a></small>
                    <small><a href="#">Ayuda</a></small>
                </div>
                <div className='col-12 col-lg-4'>
                    <h5>Suscribete para recibir novedades</h5>
                    <form className="row g-3">
                        <div className="col-auto">
                            <label for="staticEmail2" className="visually-hidden">Email</label>
                            <input type="text" readonly className="form-control-plaintext" id="staticEmail2" value="email@example.com"/>
                        </div>
                        <div className="col-auto">
                            <label for="inputPassword2" className="visually-hidden">Password</label>
                            <input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
                        </div>
                    </form>
                </div>
            </div>
        </footer>
    )
}
