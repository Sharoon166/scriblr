import type { Actions, CanvasState } from "@/types"
import { useReducer } from "react"

const initialState : CanvasState = {
    selectedTool: 'Select',
    selectedElement: null,
    elements: [],
    previewElement: null,
    startPosition: { x: 0, y: 0 },
    isDrawing: false
}

function reducer(state: CanvasState, action: Actions): CanvasState {
    switch (action.type) {
        case "SET_SELECTED_TOOL":
            return { ...state, selectedTool: action.payload }
        case "SET_IS_DRAWING":
            return { ...state, isDrawing: action.payload }
        case "SET_SELECTED_ELEMENT":
            return { ...state, selectedElement: action.payload }
        case "SET_PREVIEW_ELEMENT":
            return { ...state, previewElement: action.payload }
        case "SET_START_POSITION":
            return { ...state, startPosition: action.payload }
        case "ADD_ELEMENT":
            return { ...state, elements: [...state.elements, action.payload] }
        case "REMOVE_ELEMENT":
            return { ...state, elements: state.elements.filter(el => el.id !== action.payload) }
        case "SET_ELEMENTS":
            return { ...state, elements: action.payload }
        case "UPDATE_ELEMENT":
            return { ...state, elements: state.elements.map(el => el.id === action.payload.id ? action.payload : el) }
        default:
            return state;
    }
}

export function useCanvas() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return { state, dispatch };
}