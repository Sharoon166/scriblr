import { ThemeProvider } from "@/components/theme-provider";
import Toolbar from "@/components/toolbar";
import Canvas from "@/components/canvas";
import CanvasContextProvider from "./context/canvas-context";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CanvasContextProvider>
        <div>
          <Toolbar />
          <Canvas />
        </div>
      </CanvasContextProvider>
    </ThemeProvider>
  );
}

export default App;
