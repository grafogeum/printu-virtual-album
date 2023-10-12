import { ItemShape } from "../../constants/types";

export const RectangleShape = ({ width, height, color }: ItemShape) => (
  <rect width={width} height={height} fill={color} x={-width / 2} y={-height / 2} />
);
