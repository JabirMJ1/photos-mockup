import AppSettings from "./AppSettings"
import { TImage } from "./types/components/types"

export const fetchImages = (
    page: number,
    search: string
    ): Promise<{
        page: number,
        per_page: number,
        photos: TImage[]
        total_results: number
        next_page: string
    }> => {
    return new Promise(async (resolve, reject) => {
        const url = `${AppSettings.IMAGES_API}?per_page=12${page ? '&page=' + page: ""}${search ? '&query=' + search: ""}`
        
        try{
            // send the selected value to api and set new UIdefn
            const response = await fetch(url);
            const data = await response.json();
            resolve(data)
        }
        catch(err: any) {
            reject(err.message)
        }        
    })
}