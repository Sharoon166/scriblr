import { useContext } from "react";
import { CanvasContext } from "@/context/canvas-context";

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error(
      "useCanvas must be used within a CanvasContextProvider"
    );
  }
  return context;
};
