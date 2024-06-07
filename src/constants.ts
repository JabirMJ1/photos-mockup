import { TOption } from "./types/components/types"

export const PARAM_QUERY = "query"
export const PARAM_PER_PAGE = "per_page"
export const PARAM_PAGE = "page"

export const IMAGE_TYPES: TOption[] = [
    { value: "All", label: 'All', selected: true },
    { value: "Creative", label: 'Creative'},
    { value: "Editorial", label: 'Editorial'}
]

export const IMAGE_SIZES = { 
    ORIGINAL: "original",
    LARGE2X: "large2x",
    LARGE: "large",
    MEDIUM: "medium",
    SMALL: "small",
    POTRAIT: "portrait",
    LANDSCAPE: "landscape",
    TINY: "tiny"
}