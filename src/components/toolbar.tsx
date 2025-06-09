import { ArrowRight, Circle, Diamond, Image, Minus, MousePointer2, Pencil, RectangleHorizontal, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import type { Tool } from "@/types"

const tools: {icon: React.ElementType, title: Tool}[] = [
  {
    icon: MousePointer2,
    title: "Select",
  },
  {
    icon: RectangleHorizontal,
    title: "Rectangle",
  },
  {
    icon: Circle,
    title: "Circle",
  },
  {
    icon: Diamond,
    title: "Diamond",
  },
  {
    icon: ArrowRight,
    title: "Arrow",
  },
  {
    icon: Minus,
    title: "Line",
  },
  {
    icon: Pencil,
    title: "Pencil",
  },
  {
    icon: Type,
    title: "Text",
  },
  {
    icon: Image,
    title: "Image",
  },
]

export default function Toolbar() {
  const [selectedTool, setSelectedTool] = useState("Select")

    return (
        <div className="fixed top-0 left-0 w-full py-4 z-50">
        <div className="flex items-center justify-center gap-1 w-max mx-auto p-1.5 rounded-lg border shadow-sm bg-muted">
          <TooltipProvider>
            {tools.map((tool, index) => (
              <>
                {index === tools.length - 1 && <Separator orientation="vertical" className="h-6" />}
                <Tooltip key={tool.title}>
                  <TooltipTrigger asChild>
                    <Button 
                      size="icon"
                      className={cn("bg-transparent hover:bg-card text-accent-foreground", {
                        "bg-violet-500/50 hover:bg-violet-500/50 text-accent-foreground": selectedTool === tool.title,
                      })}
                      onClick={() => setSelectedTool(tool.title)}
                    >
                      <tool.icon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tool.title}</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ))}
          </TooltipProvider>
        </div>
      </div>
    )
}