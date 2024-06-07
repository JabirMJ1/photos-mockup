import { PropsWithChildren } from "react";

export interface TButtonProps extends PropsWithChildren {
    id?: string,
    disabled?: boolean,
    className?: string
    onClick?: React.MouseEventHandler,
}