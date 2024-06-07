'use server'

import { fetchImages } from "@/api"
import { TImage } from "@/types/components/types"

export const getImages = async (
    page: number,
    query: string
) => {
    try{
        const data = await fetchImages(page, query)
        return data ?? []
    }
    catch(err) {
        return null
    }
}