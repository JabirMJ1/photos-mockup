import { IMAGE_TYPES } from "@/constants"

const ImageTypesHeader = () => {
    return (
        <div className="p-5">
            <div className="flex bg-white border w-min">
                {
                    IMAGE_TYPES.map((type, key) => (
                        <button 
                        key={key} 
                        type = "button" 
                        className={`flex-1 font-bold py-2 px-8 min-w-20 focus:outline-none focus:shadow-outline-blue transition-all duration-300 max-w-min border-r last:border-0
                            ${key === 0 && "bg-black text-white"}
                        `}>
                            {type.label}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default ImageTypesHeader