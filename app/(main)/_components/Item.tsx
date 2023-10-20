"use client";

import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
    id?: Id<"notes">;
    noteIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    onClick?: () => void;
    label: string;
    icon: LucideIcon;

}

const Item = ({
    id,
    noteIcon,
    active,
    expanded,
    isSearch,
    level =0,
    onExpand,
    onClick,
    label,
    icon: Icon
}: ItemProps) => {
    const {user} = useUser ();
    const router = useRouter();
    const create = useMutation(api.notes.create)
    const archive = useMutation(api.notes.archive)

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // event.preventDefault();
        event.stopPropagation();
        onExpand?.();

    }

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {  
        event.stopPropagation();

        if (!id) return;

        const promise = archive({id})
       
            toast.promise(promise, {
                loading: "Archiving note...",
                success: "Note archived!",
                error: "Failed to archive note"
            })
        
      }

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (!id) return;

        const promise = create({
            title: "untitled",
            parentNote: id,
            
        })
        .then((noteId) => {
            if(!expanded) {
                onExpand?.();
            }
            // router.push(`/notes/${noteId}`);
            toast.promise(promise, {
                loading: "Creating note...",
                success: "Note created!",
                error: "Failed to create note"
            })
        })

    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return ( 
        <div
        onClick={onClick}
        role="button"
        style={{
            paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
        }}
        className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
            , active && "bg-primary/5 text-primary"
        )}>
            {!!id &&(
                <div role="button" className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {noteIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {noteIcon}
                </div>
            ): (
                <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
            )}
            <span className=" truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-monotext-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" role="button">
                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            side="right"
                            forceMount
                            className="w-60"
                        >
                            <DropdownMenuItem onClick={onArchive} >
                                <Trash  className="w-4 h-4 mr-4 text-danger" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2" onClick={() => {}}>
                                Last Modified by: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div role="button" onClick={onCreate} className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <Plus className="w-4 h-4 text-muted-foreground" />

                    </div>

                </div>
            )}
        </div>
     );
}

Item.Skeleton = function ItemSkeleton({
    level = 0
}: {
    level?: number;
}) {
    return (
        <div
        style={{paddingLeft: level ? `${(level * 12) + 25}px` : "12px"}}
        className="flex gap-x-2 py-[3px] ">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}

export default Item;