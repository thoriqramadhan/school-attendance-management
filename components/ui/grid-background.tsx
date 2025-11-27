import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundArgs {
    // children: React.ReactNode
}
export function GridBackground({ }: GridBackgroundArgs) {
    return (
        <div className="flex fixed top-0 h-screen w-full -z-99 items-center justify-center bg-black dark:bg-black">
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-size-[40px_40px]",
                    "bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        </div>
    );
}
