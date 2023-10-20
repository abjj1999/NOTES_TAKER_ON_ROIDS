"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./iconPicker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";

interface ToolbarProps {
    iniatialData: Doc<"notes">;
    preview?: boolean;
}

export const Toolbar = ({
    iniatialData,
    preview
}: ToolbarProps) => {
    return (
        <div className="pl-[54px] group relative">
            {iniatialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={() => {}} >
                        <p className="text-6xl hover:opacity-75 transition ">
                            {iniatialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={() => {}}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant="outline"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {!!iniatialData.icon && !preview && (
                <p className="text-6xl pt-6">
                    {iniatialData.icon}
                </p>
            )}
            <div className="
                opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-6
            ">
                {!iniatialData.icon && !preview && (
                    <IconPicker onChange={() => {}} asChild>
                        <Button
                        className="text-muted-foreground text-xs"
                        variant="outline">
                            <Smile className="h-4 w-4 mr-2"  />
                            Add Icon
                        </Button>
                    </IconPicker>
                )}
                {
                    !iniatialData.coverImage && !preview && (
                        <Button
                            onClick={() => {}}
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Add Cover
                        </Button>
                    )
                }
            </div>
        </div>
    );
};