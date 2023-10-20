"use client";

import Spinner from "@/components/Spinner";
import ConfirmModal from "@/components/models/confirm-modal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";



const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const notes = useQuery(api.notes.getTrash)
    const restore = useMutation(api.notes.restore)
    const remove = useMutation(api.notes.remove)

    const [search, setSearch] = useState("");

    const filteredNotes = notes?.filter((note) => {
        return note.title.toLowerCase().includes(search.toLowerCase())
    });

    const onClick = (noteId: string) => {
        router.push(`/notes/${noteId}`)
    }

    const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, noteId: Id<"notes">) => {
        event.stopPropagation();
        const promise = restore({id: noteId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored",
            error: "Error restoring note"
        })
    }

    const onRemove = (noteId: Id<"notes">) => {
        // event.stopPropagation();
        const promise = remove({id: noteId });

        toast.promise(promise, {
            loading: "Removing note...",
            success: "Note removed",
            error: "Error removing note"
        })

        if(params.id === noteId) {
            router.push(`/notes`)
        }
    }

    if(notes === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />

            </div>
        )
    }

    return ( 
        <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No notes found.
        </p>
        {filteredNotes?.map((note) => (
          <div
            key={note._id}
            role="button"
            onClick={() => onClick(note._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">
              {note.title}
            </span>
            <div className="flex items-center">
              <div
                onClick={(event) => onRestore(event, note._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(note._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
     );
}
 
export default TrashBox;