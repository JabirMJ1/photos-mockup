'use client'

import { IMAGE_SIZES } from "@/constants"
import { TImage } from "@/types/components/types"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

type TImagesViewProps = {
    images: TImage[]
}

const ImagesView = ({images}: TImagesViewProps) => {
    const [perRow, setPerRow] = useState(0)
    const [windowWidth, setWindowWidth] = useState<number>(0)

    const imageGroups: TImage[][] = [];
    
    if(perRow) [...Array(Math.ceil(images.length / perRow))].forEach((_, key) => {
        imageGroups.push(images.slice((key * perRow), (key * perRow) + perRow)) 
    })

    const setResponsivePerRow = () => {
        console.log("resizing")
        if(window.innerWidth < 640) return setPerRow(1)
        if(window.innerWidth < 768) return setPerRow(2)
        if(window.innerWidth < 1024) return setPerRow(3)

        setWindowWidth(window.innerWidth)
        setPerRow(4)
    }

    useEffect(() => {
        setResponsivePerRow()
        window.addEventListener('resize', setResponsivePerRow)
        return () => {
            window.removeEventListener('resize', setResponsivePerRow)
        }
    }, [])

    return (
        <div className="bg-white space-y-2 p-3">
            <h1 className="font-bold text-sm">Cars Stock Photos and Images </h1>
            {
                imageGroups.map((imageGroup, key) => {
                    let maxHeight = Math.max(...imageGroup.map((image) => image.height))
                    const aspectRations = imageGroup.map((image) => image.width / image.height)
                    let newWidths = imageGroup.map((image, key) => aspectRations[key] * maxHeight)
                    const totalWidth = newWidths.reduce((acc, width) => width, 0)

                    if(totalWidth !== windowWidth){
                        const scalingFactor = windowWidth / totalWidth
                        newWidths = newWidths.map(width => width * scalingFactor)
                        maxHeight = maxHeight * scalingFactor
                    }

                    return <div key={key} className="relative flex space-x-2">
                        {
                            imageGroup.map((image, key1) => {
                                return <div key = {key1} className="flex-grow">
                                        <Image
                                            src = {image.src[IMAGE_SIZES.ORIGINAL]}
                                            width={newWidths[key1]}
                                            height={maxHeight}
                                            alt={image.alt}
                                            sizes=""
                                        />
                                    </div>
                            })
                        }
                    </div>
                }                    
                )
            }
        </div>
    )
}


export default ImagesView