import React from 'react'
import './Banner.css'
export default function Banner({children,title,subtitle}) {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <div></div>
            <p>{subtitle}</p>
            {children}
        </div>
    )
}