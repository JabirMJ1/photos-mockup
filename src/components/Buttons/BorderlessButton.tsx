import { TButtonProps } from "@/types/components/Button";

const BorderlessButton = ({
  id = "",
  onClick,
  disabled = false,
  className="",
  children,
}: TButtonProps) => {
  return (
    <div>
      <button
        type="button"
        className={`bg-transparent border  font-normal !border-transparent ${className}
           disabled:text-gray-dark disabled:cursor-default
          focus:outline-none p-2 py-1 font-medium leading-5 min-h-[36px] m-0 min-w-[92px]
          cursor-pointer inline-block font-noto-sans text-sm hover:text-gray-200
          hover:!bg-transparent hover:!border-transparent focus:!bg-transparent focus:!border-transparent
          `}
        id={id}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default BorderlessButton;