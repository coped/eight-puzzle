import { type ReactNode } from "react";

export type Props = {
  y: number;
  x: number;
  children: ReactNode;
  onClick(y: number, x: number): void;
  type: "DEFAULT" | "ZERO" | "SOLUTION";
  disabled: boolean;
};

const classMap: Record<Props["type"], string> = {
  DEFAULT: "tile",
  ZERO: "zero-tile",
  SOLUTION: "highlighted",
};

export function Tile(props: Props) {
  return (
    <button
      onClick={() => props.onClick(props.y, props.x)}
      disabled={props.disabled || props.type === "ZERO"}
      className={classMap[props.type]}
    >
      {props.type === "ZERO" ? "" : props.children}
    </button>
  );
}
