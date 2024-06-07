import { TButtonProps } from "@/types/components/Button";

const BorderedButton = ({
  id = "",
  onClick,
  disabled = false,
  className=``,
  children
}: TButtonProps) => {
  return (
      <button
        type="button"
        className={`
        bg-transparent border rounded  box-border
         cursor-pointer inline-block font-noto-sans text-sm
        leading-5 min-h-[36px] m-0 focus:outline-none p-2 min-w-[92px] py-1 
         relative text-center no-underline touch-manipulation select-none w-auto font-normal
         hover:bg-transparent hover:border-primary hover:text-gray-200 focus:bg-transparent focus:border-primary focus:text-black
         border-primary hover:bg-primary text-primary 
         disabled:border-gray-dark disabled:text-gray-dark disabled:hover:bg-transparent disabled:hover:text-gray-dark
         ${disabled && "border-gray-dark text-gray-dark hover:bg-transparent hover:text-gray-dark"}
        ${className}`}
        id={id}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
  );
};

export default BorderedButton;



