'use client'

import { IMAGE_TYPES } from "@/constants";
import { TOption } from "@/types/components/types";
import { FaCamera, FaRegImage, FaSearch } from "react-icons/fa"
import ReactSelect, {components, OptionProps, ValueContainerProps} from "react-select"
import { ValueContainer } from "react-select/animated";

const SearchBar = () => {
    const handleSearchTypeChange = (val: TOption) => {}

    const { Option, ValueContainer } = components;
    const IconOption = (optionData: OptionProps<TOption>) => (
        <Option {...optionData} className="">
            {optionData.data.label}
        </Option>
    );

    const IconValueContainer = (optionData: ValueContainerProps<TOption>) => {
        return(
            <ValueContainer {...optionData}>
                <div className="flex space-x-2 items-center">
                    <FaRegImage className="text-lg"/>
                    <span>{optionData.getValue()[0].label}</span>
                    <span>images</span>
                </div>
            </ValueContainer>
        )
    };
    
    return (
        <div className="flex h-12 border bg-white">
            <ReactSelect
                options={IMAGE_TYPES} 
                defaultValue={
                    IMAGE_TYPES.find(val => val.value === undefined) ?? { value: "All", label: 'All', selected: true }
                } 
                onChange={(val: any) => handleSearchTypeChange(val)} 
                isSearchable={false} 
                className="z-50 text-xs font-bold w-full max-w-full border-r"
                components={{ Option: IconOption, ValueContainer: IconValueContainer}}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        background: '#fff',
                        border: '0',
                        minHeight: '30px',
                        height: '100%',
                    }),
                    indicatorSeparator: state => ({
                        display: 'none',
                    }),
                    indicatorsContainer: (provided, state) => ({
                        ...provided,
                        color: 'black',
                    }),
                    menu: (provided, state) => ({
                        ...provided,
                        marginTop: '2px',
                    }),
                    container: (provided, state) => ({
                        ...provided,
                        width: "max-content"
                    })
                }}
            />
            <div className="px-4 flex space-x-4 items-center flex-grow">
                <FaSearch className='text-lg'/>
                <input type="search" placeholder="Cars flying ..." className="text-sm"/>
            </div>
            <button type="button" className="h-full min-w-32 flex items-center space-x-2 border-l px-4 w-max">
                <FaCamera className="min-w-max text-lg"/><span className='min-w-max'>Search by image</span>
            </button>
        </div>
    )
}

export default SearchBar