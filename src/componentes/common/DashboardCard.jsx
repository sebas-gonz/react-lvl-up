import React from 'react'

export default function DashboardCard({ iClass, h5Text, pText }) {
    return (
        <div className='col'>
            <div className="card h-100 card-item">
                <div className="card-body text-center">
                    <i className={iClass}></i>
                    <h5 className="card-title mt-3">{h5Text}</h5>
                    <p className="card-text">{pText}</p>
                </div>
            </div>
        </div>

    )
}
