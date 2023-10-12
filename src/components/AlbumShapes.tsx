import { FC } from "react";
import { isColorLight, calculateFrameDimensions } from "../helpers/helpers";
import { Items } from "../constants/types";
import { shapeComponents } from "./shapes/shapeComponents";

const ShapeRadiusStyle = { fontSize: "1rem" };

export const AlbumShapes: FC<Omit<Items, "id">> = ({
  color,
  height,
  rotation,
  type,
  width,
  x,
  y,
}: Omit<Items, "id">) => {
  const { frameWidth, frameHeight, frameX, frameY } = calculateFrameDimensions(x, y, width, height, type);

  const ShapeComponent = shapeComponents[type] || null;

  if (!ShapeComponent) {
    return <div>Error: Nieznany typ elementu</div>;
  }

  return (
    <g>
      <rect width={frameWidth} height={frameHeight} fill="none" stroke="#ff5544" x={frameX} y={frameY} />
      <g transform={`translate(${x},${y}) rotate(${rotation})`}>
        <ShapeComponent width={width} height={height} color={color} />
        <circle r={6} fill={isColorLight(color) ? "#000000" : "#ffffff"} transform={`rotate(${-rotation})`} />
        <text
          x={10}
          y={-height / 5 + 22}
          fill={isColorLight(color) ? "#000000" : "#ffffff"}
          transform={`rotate(${-rotation})`}
          style={ShapeRadiusStyle}
        >
          {rotation}°
        </text>
      </g>
    </g>
  );
};
