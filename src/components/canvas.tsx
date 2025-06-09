import { useCanvas } from "@/hooks/use-canvas";
import { useCanvasEvents } from "@/hooks/use-canvas-events";
import { Layer, Stage } from "react-konva";
import { Shape } from "./shapes/shape";

export default function Canvas() {
  const {
    state: { previewElement, elements, selectedElement, viewport },
  } = useCanvas();

  const { handlePointerDown, handlePointerMove, handlePointerUp } = useCanvasEvents();

  return (
    <Stage
      width={viewport.width}
      height={viewport.height}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <Layer>
        {elements.map((element) => (
          <Shape
            key={element.id}
            shape={element}
            isSelected={selectedElement?.id === element.id}
          />
        ))}
        {previewElement && (
          <Shape key={previewElement.id} shape={previewElement} />
        )}
      </Layer>
    </Stage>
  );
}
