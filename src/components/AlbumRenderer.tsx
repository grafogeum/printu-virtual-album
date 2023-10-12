import { FC } from "react";
import { AlbumShapes } from "./AlbumShapes";
import { CanvasData, Items } from "../constants/types";

const MainCanvasStyle = {
  width: "100%",
  height: "100%",
};

export const AlbumRenderer: FC<{ canvasData: CanvasData }> = ({ canvasData }) => {
  const { project } = canvasData;

  return (
    <div style={MainCanvasStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <svg width="100%" height="100%" viewBox={`0 0 ${project?.width ?? 0} ${project?.height ?? 0}`}>
          <rect width="100%" height="100%" fill="#efefef" />
          {project?.items.map(({ id, x, y, rotation, width, height, color, type }: Items) => (
            <AlbumShapes
              key={[id, x, y].join("")}
              x={x}
              y={y}
              rotation={rotation}
              width={width}
              height={height}
              color={color}
              type={type}
            />
          ))}
        </svg>
      </svg>
    </div>
  );
};
