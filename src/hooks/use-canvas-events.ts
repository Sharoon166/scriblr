import { useEffect } from "react";
import { useCanvas } from "@/hooks/use-canvas";
import {
  createArrow,
  createCircle,
  createDiamond,
  createLine,
  createRectangle,
  createScribble,
  createText,
} from "@/lib/shape-utils";
import type { Shape } from "@/types";
import type { KonvaEventObject } from "konva/lib/Node";

type PointerEvent = TouchEvent | MouseEvent;

export const useCanvasEvents = () => {
  const {
    state: { previewElement, isDrawing, startPosition, selectedTool },
    dispatch,
  } = useCanvas();

  useEffect(() => {
    const updateViewport = () => {
      dispatch({
        type: "SET_VIEWPORT",
        payload: {
          width: window.innerWidth,
          height: window.innerHeight - 70,
        },
      });
    };

    window.addEventListener("resize", updateViewport);
    updateViewport(); // Initial setup

    return () => window.removeEventListener("resize", updateViewport);
  }, [dispatch]);

  const handlePointerDown = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (!stage) return;

    if (e.target === stage) {
      dispatch({ type: "SET_SELECTED_ELEMENT", payload: null });
    }

    const pos = stage.getPointerPosition();
    if (!pos) return;

    if (selectedTool !== "Select") {
      dispatch({ type: "SET_START_POSITION", payload: { x: pos.x, y: pos.y } });
      dispatch({ type: "SET_IS_DRAWING", payload: true });
    }
  };

  const handlePointerMove = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault();
    if (!isDrawing || selectedTool === "Select") return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    let newElement: Shape | null = null;

    switch (selectedTool) {
      case "Rectangle":
        newElement = createRectangle(startPosition, pos);
        break;
      case "Circle":
        newElement = createCircle(startPosition, pos);
        break;
      case "Diamond":
        newElement = createDiamond(startPosition, pos);
        break;
      case "Line":
        newElement = createLine(startPosition, pos);
        break;
      case "Arrow":
        newElement = createArrow(startPosition, pos);
        break;
      case "Scribble":
        newElement = createScribble(startPosition, pos, previewElement);
        break;
      case "Text":
        newElement = createText(startPosition, previewElement);
        break;
      default:
        break;
    }

    dispatch({ type: "SET_PREVIEW_ELEMENT", payload: newElement });
  };

  const handlePointerUp = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault();
    if (!isDrawing) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    if (previewElement) {
      dispatch({ type: "ADD_ELEMENT", payload: previewElement });
    }

    dispatch({ type: "SET_PREVIEW_ELEMENT", payload: null });
    dispatch({ type: "SET_IS_DRAWING", payload: false });
  };

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
