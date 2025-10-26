"use client"
import React from 'react'
import Image from "next/image";

export const ExploreBtn  = () => {
    return (
        <button type="button" id={"explore-btn"} className="mt-7 mx-auto" onClick={()=>console.log("click")}>
            <a href="#event">Explore Events
                <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24}/>
            </a>

        </button>
    )
}
