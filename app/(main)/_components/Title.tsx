"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {useQuery, useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


interface TitleProps {
    iniatialData: Doc<"notes">;
}

export const Title = ({
    iniatialData
}: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const update = useMutation(api.notes.update);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(iniatialData.title || "Untitled");

    const enableInput = () => {
        setTitle(iniatialData.title);
        setIsEditing(true);

        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    }

    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        update({
            id: iniatialData._id,
            title: event.target.value || "Untitled"
        })
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            disableInput();
        }
    };


  return (
    <div className="flex items-center gap-x-1 ">
        {!!iniatialData.icon && (
            <p>{iniatialData.icon}</p>
        )}
        {isEditing ? (
            <Input 
                ref={inputRef}
                onClick={enableInput}
                onBlur={disableInput}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={title}
                className="h-7 px-2 focus-visible:ring-transparent"
            />
        ) : (
            <Button
                onClick={enableInput}
                variant="ghost"
                size="sm"
                className="font-normal h-auto p-1"
            >
                <span className="truncate">

                {iniatialData?.title}
                </span>
            </Button>
        )}
    </div>
  );
};

// skeleton
Title.Skeleton = function TitleSkeleton() {
    return (
        <Skeleton className="h-6 w-20 rounded-md" />
    )
}