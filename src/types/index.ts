export type Tool = "Select" | "Rectangle" | "Circle" | "Diamond" | "Arrow" | "Line" | "Scribble" | "Text" | "Image"

export type Point = {x: number; y: number}

export interface BaseShape {
    id: string;
    type: "rectangle" | "circle" | "diamond" | "arrow" | "line" | "scribble" | "text" | "image";
    x?: number;
    y?: number;
    fill?: string;
    isSelected?: boolean;
    rotation?: number;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    scaleX?: number;
    scaleY?: number;
    draggable?: boolean;
}

export interface Rectangle extends BaseShape {
    type: "rectangle";
    width: number;
    height: number;
}

export interface Circle extends BaseShape {
    type: "circle";
    radius: number;
}

export interface Diamond extends BaseShape {
    type: "diamond";
    points: number[];
}

export interface Arrow extends BaseShape {
    type: "arrow";
    points: number[];
}

export interface Line extends BaseShape {
    type: "line";
    points: number[];
}

export interface Scribble extends BaseShape {
    type: "scribble";
    points: number[];
}

export interface Text extends BaseShape {
    type: "text";
    text: string;
    fontSize: number;
    fontFamily: string;
}

export interface ImageShape extends BaseShape {
    type: "image";
    imageUrl: string;
}

export type Shape = Rectangle | Circle | Diamond | Arrow | Line | Scribble | Text | ImageShape;

export interface Viewport {
  width: number;
  height: number;
}

export interface CanvasState {
    selectedTool: Tool;
    selectedElement: Shape | null;
    elements: Shape[];
    previewElement: Shape | null;
    startPosition: Point;
    isDrawing: boolean;
    viewport: Viewport;
}

export type Actions = { type: "SET_SELECTED_TOOL"; payload: Tool } |
{ type: "SET_SELECTED_ELEMENT"; payload: Shape | null } |
{ type: "SET_ELEMENTS"; payload: Shape[] } |
{ type: "ADD_ELEMENT"; payload: Shape } |
{ type: "REMOVE_ELEMENT"; payload: string } |
{ type: "UPDATE_ELEMENT"; payload: Shape } |
{ type: "SET_PREVIEW_ELEMENT"; payload: Shape | null } |
{ type: "SET_START_POSITION"; payload: Point } |
{ type: "SET_IS_DRAWING"; payload: boolean } |
{ type: "SET_VIEWPORT"; payload: Viewport };