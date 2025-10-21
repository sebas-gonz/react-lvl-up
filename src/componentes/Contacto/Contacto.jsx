import React from 'react'
import ContactoCard from '../common/ContactoCard'

export default function Contacto(rowClass = 'row justify-content-center my-3') {
  return (
    <div className={rowClass}>
        <div className='col-md-12'>
            <ContactoCard></ContactoCard>
        </div>
    </div>
  )
}
