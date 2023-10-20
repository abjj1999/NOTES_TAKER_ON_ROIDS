"use client";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/Toolbar";

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
        return <p>Loading...</p>
    };

    if(note === null) {
        return <p>Note not found</p>
    };

    return ( 
        <div className="pb-40 ">
            <div className="h-[35vh]" />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar iniatialData={note} />
            </div>
        </div>
     );
}
 
export default NoteIdPage;