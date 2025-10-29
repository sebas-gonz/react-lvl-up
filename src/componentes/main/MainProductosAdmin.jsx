import React, { Children } from 'react'

export default function MainProductosAdmin({ mainClass = 'col-md-9 ms-sm-auto col-lg-10 px-md-4', tituloText = '',
parrafoText = '', children 
}) {
    return (
        <main className={mainClass}>
            <div className="mt-4">
                <h4 className="card-title">{tituloText}</h4>
                <p className="card-text">{parrafoText}</p>
                {children}
            </div>
        </main>
    )
}
