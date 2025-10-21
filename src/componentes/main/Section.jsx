import React from 'react'

export default function Section({ children }) {
    return (
        <section className="my-5">
            <div className="container">
                {children} {}
            </div>
        </section>
    )
}
