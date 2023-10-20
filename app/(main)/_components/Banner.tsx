"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/models/confirm-modal";

interface BannerProps {
    noteId: Id<"notes">;
}


export const Banner = (
    {noteId}: BannerProps
) => {
    const router = useRouter();


    const remove = useMutation(api.notes.remove);
    const restore = useMutation(api.notes.restore);
    const onRestore = () => {
        
        const promise = restore({id: noteId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored",
            error: "Error restoring note"
        })
    }

    const onRemove = () => {
        // event.stopPropagation();
        const promise = remove({id: noteId })
        

        toast.promise(promise, {
            loading: "Removing note...",
            success: "Note removed",
            error: "Error removing note"
        })

        router.push(`/notes`)


    }
    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p className="">This note is archived</p>

            <Button size="sm" variant="outline" onClick={onRestore} className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                Retore Note
            </Button>
            <ConfirmModal onConfirm={onRemove}>

            <Button size="sm" variant="outline"  className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal">
                Remove Note
            </Button>
            </ConfirmModal>
        </div>
    )
}