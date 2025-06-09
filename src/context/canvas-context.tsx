import { useCanvas } from "@/hooks/useCanvas";
import { createContext } from "react"


const CanvasContext = createContext()
export default function CanvasContextProvider({ children }) {
    const { state, dispatch } = useCanvas();
    return (
        <CanvasContext.Provider value={{ state, dispatch }}>
            {children}
        </CanvasContext.Provider>
    )
} 