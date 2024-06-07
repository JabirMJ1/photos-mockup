'use client'

import { IMAGE_SIZES } from "@/constants"
import { TImage } from "@/types/components/types"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { BsCart2, BsDownload, BsImages, BsPlusCircle } from "react-icons/bs"
import Link from 'next/link'
import { useInView } from "react-intersection-observer"
import { getImages } from "@/app/actions"
import { toast } from "react-toastify"
import { FaSpinner } from "react-icons/fa"

type TImagesViewProps = {
    data: {
        page: number;
        per_page: number;
        photos: TImage[];
        total_results: number;
        next_page: string;
    }
    query: string
}

const ImagesView = ({data: {photos, ...rest}, query}: TImagesViewProps) => {
    const [perRow, setPerRow] = useState(0)
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [images, setImages] = useState<TImage[]>(photos)
    const [data, setData] = useState(rest)
    const [ref, inView] = useInView()
    const [page, setPage] = useState<number>(1)

    const imageGroups: TImage[][] = [];
    
    if(perRow && images.length) [...Array(Math.ceil(images.length / perRow))].forEach((_, key) => {
        imageGroups.push(images.slice((key * perRow), (key * perRow) + perRow)) 
    })

    const setResponsivePerRow = () => {
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

    const loadMoreImages = async () => {
            const nextPage = page + 1
            // check if more images are present
            try{
                console.log(nextPage)
                const nextImages = await getImages(nextPage, 'car')
                setPage(nextPage)
                if(nextImages?.photos) setImages(prev => {
                    return ([
                        ...(prev?.length ? prev : []),
                        ...nextImages?.photos
                    ])
                })
            }
            catch(err: any){
                toast.error(err.message ?? "unknown error")
            }
    }

    useEffect(() => {
        if(inView) {
            loadMoreImages()
        }
    }, [inView])

    useEffect(() => {
        setImages(photos)
    }, [data, query])

    return (
        <div className="bg-white space-y-2 p-3 shadow-lg">
            <h1 className="font-bold text-sm">{query} Stock Photos and Images <span className="text-gray-600 text-xs">({data.total_results})</span></h1>
            {
                imageGroups.map((imageGroup, key) => {
                    // adjust images to match in height and accumalated width to match screen width
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
                                return <div key = {key1} className="relative flex-grow group" title={image.alt}>
                                        <div className="absolute z-10 w-full h-full bg-black bg-opacity-20 hidden group-hover:flex p-2 flex-col justify-between">
                                            <div>
                                                <Link href={image.photographer_url} target="_blank">
                                                    <p className="text-white truncate leading-1 max-w-full">
                                                        <span className="bg-gray-400 text-white font-bold p-1.5 rounded aspect-square inline-block">{image.photographer.slice(0,2)}</span>
                                                        <span className="font-bold text-sm pl-1">{image.photographer}</span> - {image.alt}
                                                    </p>
                                                </Link>
                                            </div>

                                            <div className="flex justify-end space-x-2 flex-wrap">
                                                <Link href={image.url} target="_blank" className="text-white bg-black bg-opacity-90 hover:bg-green-400 hover:text-black hover:bg-opacity-100 rounded p-3"><BsCart2 className="text-lg"/></Link>
                                                <Link download target="_blank" href={image.src[IMAGE_SIZES.ORIGINAL]} className="text-white bg-black bg-opacity-90 hover:bg-green-400 hover:text-black hover:bg-opacity-100 rounded p-3"><BsDownload className="text-lg"/></Link>
                                                <button className="text-white bg-black bg-opacity-90 hover:bg-green-400 hover:text-black hover:bg-opacity-100 rounded p-3"><BsPlusCircle className="text-lg"/></button>
                                                <button className="text-white bg-black bg-opacity-90 hover:bg-green-400 hover:text-black hover:bg-opacity-100 rounded p-3"><BsImages className="text-lg"/></button>
                                            </div>
                                        </div>
                                        <Image
                                            src = {image.src[IMAGE_SIZES.ORIGINAL]}
                                            width={newWidths[key1]}
                                            height={maxHeight}
                                            alt={image.alt}
                                        />
                                    </div>
                            })
                        }
                    </div>
                }                    
                )
            }
            {
                data.total_results > (page * 12) &&
                <div ref={ref} className="flex items-center justify-between h-28">
                    <FaSpinner className="animate-spin text-xl m-auto" />
                </div>
            }
        </div>
    )
}


export default ImagesView