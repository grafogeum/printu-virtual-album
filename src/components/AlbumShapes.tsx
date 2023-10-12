import { isColorLight, calculateFrameDimensions } from "../helpers/helpers";
import { Items } from "../constants/types";
const ShapeRadiusStyle = { fontSize: "1rem" };

export const AlbumShapes = ({ x, y, rotation, width, height, color, type }: Omit<Items, "id">) => {
  const { frameWidth, frameHeight, frameX, frameY } = calculateFrameDimensions(x, y, width, height, type);

  return (
    <g>
      <rect width={frameWidth} height={frameHeight} fill="none" stroke="#ff5544" x={frameX} y={frameY} />
      <g transform={`translate(${x},${y}) rotate(${rotation})`}>
        {type === "rectangle" ? (
          <rect width={width} height={height} fill={color} x={-width / 2} y={-height / 2} />
        ) : (
          <ellipse cx={0} cy={0} rx={width / 2} ry={height / 2} fill={color} />
        )}
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
