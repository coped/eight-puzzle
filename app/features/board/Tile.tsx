import { type ReactNode } from "react";

export type Props = {
  y: number;
  x: number;
  children?: ReactNode;
  onClick?(y: number, x: number): void;
  type: "DEFAULT" | "ZERO" | "SOLUTION";
  disabled: boolean;
};

const classMap: Record<Props["type"], string> = {
  DEFAULT: "tile",
  ZERO: "zero-tile",
  SOLUTION: "tile highlighted",
};

export function Tile({
  y,
  x,
  onClick,
  type,
  disabled = false,
  children,
}: Props) {
  onClick = onClick ?? (() => {});
  return (
    <button
      onClick={() => onClick(y, x)}
      disabled={disabled || type === "ZERO"}
      className={classMap[type]}
    >
      {type === "ZERO" ? "" : children}
    </button>
  );
}
