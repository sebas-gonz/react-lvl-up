import React from 'react'
import BlogCard from '../common/BlogCard'

export default function Blog({titulo = 'Blogs'}) {
    return (
        <>
            <h2 className="text-center mb-4">{titulo}</h2>
            <div className="row row-cols-2 row-cols-md-6 g-3 mb-3">
                <div className='col-md-4'>
                    <BlogCard></BlogCard>
                </div>
            </div>
        </>
    )
}
