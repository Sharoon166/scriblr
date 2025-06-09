import type { Tool } from "@/types";
import { useCanvas } from "@/hooks/use-canvas";
import {
  ArrowRight,
  Circle,
  Diamond,
  Image,
  Minus,
  MousePointer2,
  Pencil,
  RectangleHorizontal,
  Type,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@radix-ui/react-separator";

const tools: { icon: React.ElementType; title: Tool }[] = [
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
    title: "Scribble",
  },
  {
    icon: Type,
    title: "Text",
  },
  {
    icon: Image,
    title: "Image",
  },
];

export default function Toolbar() {
  const {
    state: { selectedTool },
    setSelectedTool,
    dispatch,
  } = useCanvas();
  return (
    <>
      <div className="fixed top-0 left-0 w-full py-2 sm:py-4 z-50">
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 w-full max-w-[95%] sm:max-w-max mx-auto p-1 sm:p-1.5 rounded-lg border shadow-sm bg-muted/80 backdrop-blur-sm">
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center gap-0.5 sm:gap-1">
              {tools.map((tool) => (
                <Tooltip key={tool.title}>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className={cn(
                        "bg-transparent hover:bg-card active:scale-95 transition-all duration-150 text-accent-foreground",
                        {
                          "bg-violet-500/50 hover:bg-violet-500/50 text-accent-foreground":
                            selectedTool === tool.title,
                        }
                      )}
                      onClick={() => setSelectedTool(tool.title)}
                      onTouchStart={() => setSelectedTool(tool.title)}
                    >
                      <tool.icon className="size-3.5 sm:size-4" />
                      <span className="sr-only">{tool.title}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={5}>
                    <p>{tool.title}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Separator orientation="vertical" className="mx-1 sm:mx-2" />
            <Button
              size="icon"
              variant="destructive"
              className="h-8 sm:h-9 active:scale-95 transition-all duration-150"
              onClick={() => {
                dispatch({ type: "SET_ELEMENTS", payload: [] });
              }}
            >
              <X />
            </Button>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}
