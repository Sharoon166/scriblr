import type { Point, Rectangle } from "@/types";
import type { KonvaEventObject } from "konva/lib/Node";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

export default function Canvas() {
    const [startPosition, setStartPosition] = useState<Point>({ x: 0, y: 0 })
    const [previewElement, setPreviewElement] = useState<Rectangle | null>(null);
    const [elements, setElements] = useState<Rectangle[]>([]);
    const isDrawing = useRef(false)

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) return;

        const pointerPosition = stage.getPointerPosition();
        if (!pointerPosition) return;
        isDrawing.current = true;

        setStartPosition({x: pointerPosition.x, y: pointerPosition.y});
    }

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        if (!isDrawing.current) return;
        
        const stage = e.target.getStage();
        if (!stage) return;

        const pointerPosition = stage.getPointerPosition();
        if (!pointerPosition) return;

        const width = pointerPosition.x - startPosition.x;
        const height = pointerPosition.y - startPosition.y;

        setPreviewElement({
            id: nanoid(),
            type: "rectangle",
            x: startPosition.x,
            y: startPosition.y,
            fill: "#32de21",
            width,
            height
        });
    }

    const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
        if (!isDrawing.current) return;
        
        const stage = e.target.getStage();
        if (!stage) return;

        const pointerPosition = stage.getPointerPosition();
        if (!pointerPosition) return;

        isDrawing.current = false;

        const width = pointerPosition.x - startPosition.x;
        const height = pointerPosition.y - startPosition.y;

        if (previewElement) {
            setElements([...elements, {...previewElement, width, height}]);
            setPreviewElement(null);
        }

        console.log(elements)
    }

    return (
        <Stage 
            width={window.innerWidth} 
            height={window.innerHeight} 
            className="border-red-500 border-4" 
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
        >
            <Layer>
                {previewElement && (
                    <Rect 
                        x={previewElement.x} 
                        y={previewElement.y} 
                        height={previewElement.height} 
                        width={previewElement.width} 
                        fill={previewElement.fill} 
                        cornerRadius={6}
                        draggable 
                    />
                )}

                {elements.map(el => (
                    <Rect 
                        key={el.id} 
                        x={el.x} 
                        y={el.y} 
                        height={el.height} 
                        width={el.width}
                        cornerRadius={6}
                        fill={el.fill} 
                    />
                ))}
            </Layer>
        </Stage>
    )
}