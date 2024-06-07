import { IMAGE_SIZES } from "@/constants"

type TOption = {
    value: string;
    label: string;
    selected?: boolean;
}

type TImage = {
    id: number,
    width: number,
    height: number,
    url: string,
    photographer: string,
    photographer_url: string,
    photographer_id: number,
    avg_color: string,
    src: {[x: string]: string},
    liked: boolean,
    alt: string
}