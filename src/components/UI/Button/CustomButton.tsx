import { ReactNode } from "react";
import style from "./CustomButton.module.scss";

interface CustomButtonProps {
  styling?: string;
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
  children: ReactNode;
}

export const CustomButton = ({
  styling,
  onClick,
  disabled,
  children,
}: CustomButtonProps) => {
  const classNames = `${style.custom_button} ${styling}`;
  return (
    <button className={classNames} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
