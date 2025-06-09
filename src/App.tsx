import { ThemeProvider } from "@/components/theme-provider"
import Toolbar from "@/components/toolbar"
import Canvas from "@/components/canvas"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Toolbar />
        <Canvas />
      </div>
    </ThemeProvider>
  )
}

export default App