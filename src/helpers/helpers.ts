import { CanvasData, Items } from "../constants/types";

export function isColorLight(color: string): boolean {
  // Change color from #RRGGBB to RGB
  color = color.slice(1);
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

  // Count brightness in HSL model
  const hsl = rgbToHsl(r, g, b);

  // If brightness is greater than the threshold (eg. 50), consider it as light color
  return hsl[2] > 50;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // color is achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}

export const calculateFrameDimensions = (
  x: number,
  y: number,
  width: number,
  height: number,
  type: "rectangle" | "ellipse"
) => {
  const diagonalRadius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
  let frameWidth = diagonalRadius * 2;
  let frameHeight = diagonalRadius * 2;
  const frameX = x - frameWidth / 2;
  const frameY = y - frameHeight / 2;

  if (type === "ellipse") {
    frameWidth -= 20;
    frameHeight -= 20;
  }

  return { frameWidth, frameHeight, frameX, frameY };
};

export function isValidItem(item: Items) {
  return (
    typeof item.id === "string" &&
    typeof item.x === "number" &&
    typeof item.y === "number" &&
    typeof item.rotation === "number" &&
    typeof item.width === "number" &&
    typeof item.height === "number" &&
    typeof item.color === "string" &&
    typeof item.type === "string"
  );
}

export function isValidData(data: CanvasData | {}): boolean {
  if (data && "project" in data && "items" in data.project && data.project.items.every(isValidItem)) {
    return true;
  }
  return false;
}
