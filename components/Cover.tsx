"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, Trash, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import {useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({url, preview}: CoverProps) => {
    const {edgestore} = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.notes.removeCoverImage);


    const onRemove = async () => {
        if(url) {
            await edgestore.publicFiles.delete({
                url: url
            });
        }

        await removeCoverImage({
            id: params.noteId as Id<"notes">
        });
    }

    return (
        <div className={cn(
            "relative w-full h-[35vh] group ",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image 
                    src={url}
                    fill
                    alt="Cover Image"
                    className="object-cover"
                />
            )}

            {url && !preview && (
                <div className="
                opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2
                ">
                    <Button
                        onClick={()=>coverImage.onReplace(url)}
                        className="text-muted-foreground text-xs "
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Change Cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-muted-foreground text-xs "
                        variant="outline"
                        size="sm"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            )}

        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh] " />
    )
}