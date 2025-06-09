import { useCanvas } from "@/hooks/use-canvas";
import type { Shape as ShapeType } from "@/types";
import type { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef } from "react";
import { Arrow, Circle, Line, Rect, Transformer } from "react-konva";
import type { Transformer as TransformerType } from "konva/lib/shapes/Transformer";

interface ShapeProps {
    shape: ShapeType;
    isSelected?: boolean;
}

export const Shape = ({ shape, isSelected = false }: ShapeProps) => {
    const shapeRef = useRef(null);
    const transformerRef = useRef<TransformerType>(null);
    const { dispatch } = useCanvas();

    useEffect(() => {
        if (isSelected && shapeRef.current && transformerRef.current) {
            const transformer = transformerRef.current;
            const shapeNode = shapeRef.current;

            transformer?.nodes([shapeNode]);
            const layer = transformer?.getLayer();
            if (layer) {
                layer.batchDraw();
            }

            dispatch({ type: "SET_SELECTED_ELEMENT", payload: shape });
            dispatch({ type: "SET_SELECTED_TOOL", payload: "Select" });
        }
    }, [isSelected, dispatch, shape]);

    const commonProps = {
        ref: shapeRef,
        onClick: (e: KonvaEventObject<MouseEvent>) => {
            e.cancelBubble = true;
            dispatch({ type: "SET_SELECTED_ELEMENT", payload: shape });
            dispatch({ type: "SET_SELECTED_TOOL", payload: "Select" });
        },
        onTap: (e: KonvaEventObject<TouchEvent>) => {
            e.cancelBubble = true;
            dispatch({ type: "SET_SELECTED_ELEMENT", payload: shape });
            dispatch({ type: "SET_SELECTED_TOOL", payload: "Select" });
        },
        onTransformEnd: (e: KonvaEventObject<MouseEvent>) => {
            const node = shapeRef.current;
            if (!node) return;

            e.target.scaleX(1);
            e.target.scaleY(1);

        },
        draggable: true,
        fill: shape.fill || "transparent",
    };

    let ShapeElement: React.ReactNode | null = null;
    switch (shape.type) {
        case "rectangle":
            ShapeElement = <Rect key={shape.id} {...shape} {...commonProps} />;
            break;
        case "circle":
            ShapeElement = <Circle key={shape.id} {...shape} {...commonProps} />;
            break;
        case "arrow":
            ShapeElement = <Arrow key={shape.id} {...shape} {...commonProps} />;
            break;
        case "line":
        case "scribble":
        case "diamond":
            ShapeElement = (
                <Line
                    key={shape.id}
                    {...shape}
                    {...commonProps}
                    closed={shape.type === "diamond"}
                />
            );
            break;
        default:
            ShapeElement = null;
    }

    return (
        <>
            {ShapeElement}
            {isSelected && <Transformer ref={transformerRef} />}
        </>
    );
};
