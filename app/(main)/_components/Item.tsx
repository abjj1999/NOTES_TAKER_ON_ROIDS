"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
    id?: Id<"notes">;
    noteIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    onClick: () => void;
    label: string;
    icon: LucideIcon;
}

const Item: React.FC<ItemProps> = ({
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
}) => {
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
                <div role="button" className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                onClick={() => {}}
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
        </div>
     );
}
 
export default Item;