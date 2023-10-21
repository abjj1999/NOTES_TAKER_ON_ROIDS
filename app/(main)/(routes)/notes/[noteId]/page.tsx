"use client";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/Toolbar";
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";

interface NoteIdPageProps {
    params: {
        noteId: Id<"notes">
    }   
};

const NoteIdPage = (
    {params}: NoteIdPageProps
) => {
    const note = useQuery(api.notes.getById, {
        noteId: params.noteId
    });

    if(note === undefined) {
        return (
            <div className="">
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="w-[50%] h-14" />
                        <Skeleton className="w-[80%] h-4" />
                        <Skeleton className="w-[40%] h-4" />
                        <Skeleton className="w-[60%] h-4" />
                    </div>
                </div>
            </div>
        )
    };

    if(note === null) {
        return <p>Note not found</p>
    };

    return ( 
        <div className="pb-40 ">
            <Cover url={note.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={note} />
            </div>
        </div>
     );
}
 
export default NoteIdPage;