import { ItemShape } from "../../constants/types";

export const EllipseShape = ({ width, height, color }: ItemShape) => (
  <ellipse cx={0} cy={0} rx={width / 2} ry={height / 2} fill={color} />
);
