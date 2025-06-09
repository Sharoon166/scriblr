import { nanoid } from "nanoid";
import type { Shape, Point } from "@/types";

export const createRectangle = (
  startPosition: Point,
  endPosition: Point
): Shape => ({
  id: nanoid(),
  type: "rectangle",
  x: startPosition.x,
  y: startPosition.y,
  width: endPosition.x - startPosition.x,
  height: endPosition.y - startPosition.y,
  fill: "transparent",
  stroke: "white",
  strokeWidth: 2,
});

export const createCircle = (
  startPosition:Point,
  endPosition:Point
): Shape => {
  const x1 = startPosition.x;
  const y1 = startPosition.y;
  const x2 = endPosition.x;
  const y2 = endPosition.y;
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;
  const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;

  return {
    id: nanoid(),
    type: "circle",
    x: centerX,
    y: centerY,
    radius,
    fill: "transparent",
    stroke: "white",
    strokeWidth: 2,
  };
};

export const createDiamond = (
  startPosition:Point,
  endPosition:Point
): Shape => {
  const width = endPosition.x - startPosition.x;
  const height = endPosition.y - startPosition.y;
  const centerX = startPosition.x + width / 2;
  const centerY = startPosition.y + height / 2;

  return {
    id: nanoid(),
    type: "diamond",
    points: [
      centerX,
      startPosition.y,
      endPosition.x,
      centerY,
      centerX,
      endPosition.y,
      startPosition.x,
      centerY,
    ],
    fill: "transparent",
    stroke: "white",
    strokeWidth: 2,
  };
};

export const createLine = (
  startPosition:Point,
  endPosition:Point
): Shape => ({
  id: nanoid(),
  type: "line",
  points: [startPosition.x, startPosition.y, endPosition.x, endPosition.y],
  stroke: "white",
  strokeWidth: 2,
  fill: "transparent",
});

export const createArrow = (
  startPosition:Point,
  endPosition:Point
): Shape => ({
  id: nanoid(),
  type: "arrow",
  points: [startPosition.x, startPosition.y, endPosition.x, endPosition.y],
  stroke: "white",
  strokeWidth: 2,
  fill: "transparent",
});

export const createScribble = (
  startPosition:Point,
  endPosition:Point,
  previousElement?: Shape | null
): Shape => {
  if (!previousElement || previousElement.type !== "scribble") {
    return {
      id: nanoid(),
      type: "scribble",
      points: [startPosition.x, startPosition.y, endPosition.x, endPosition.y],
      stroke: "white",
      strokeWidth: 2,
    };
  }

  return {
    ...previousElement,
    points: [...previousElement.points, endPosition.x, endPosition.y],
  };
};

export const createText = (
  startPosition: Point,
  previousElement?: Shape | null
): Shape => {
  if (!previousElement || previousElement.type !== "text") {
    return {
      id: nanoid(),
      type: "text",
      x: startPosition.x,
      y: startPosition.y,
      text: "",
      fontSize: 20,
      fontFamily: "Arial",
      fill: "white",
    };
  }

  return {
    ...previousElement,
    x: startPosition.x,
    y: startPosition.y,
  };
};