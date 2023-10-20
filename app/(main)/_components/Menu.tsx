"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Share, Trash, Trash2 } from "lucide-react";
import ModeToggle from "@/components/mode-toggle";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
    noteId: Id<"notes">;
}

const Menu = ({noteId}: MenuProps) => {
    const router = useRouter();
    const {user} = useUser();
    const archive = useMutation(api.notes.archive)

    const onArchive = async () => {
        const promise = archive({
            id: noteId
        });

        toast.promise(promise, {
            loading: "Archiving note...",
            success: "Note archived",
            error: "Failed to archive note"
        });

        router.push("/notes");

    }

    return ( 
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-60" 
        align="end" 
        alignOffset={8} 
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Share className="h-4 w-4 mr-2" />
            Share
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
     );
}
Menu.Skeleton = function MenuSkeleton() {
    return (
      <Skeleton className="h-10 w-10" />
    )
  }
export default Menu;