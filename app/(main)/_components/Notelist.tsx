"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface NoteListProps {
    parentNoteId?: Id<"notes">;
    level?: number;
    data?: Doc<"notes">[];

}

const NoteList = ({
    parentNoteId,
    level = 0,
    
}: NoteListProps) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (noteId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [noteId]: !prevExpanded[noteId]
        }))
    };

    const notes = useQuery(api.notes.getSidebar, {
        parentNoteId: parentNoteId,

    })

    const Redirect = (noteId: string) => {
        router.push(`/notes/${noteId}`)
    }

    if(notes === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level ===0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                
                )}
            </>
        )
    }

    return ( 
        <>
            <p
                style={{paddingLeft: level ? `${(level * 12) + 25}px` : undefined}}
            className={cn(
                "hidden text-sm font-medium text-muted-foreground/80 ml-2",
                expanded && "last:block",
                level === 0 && "hidden"
            )}>
                No pages inside
            </p>
            {
                notes.map(note => (
                    <div key={note._id} className="
                    
                    ">
                        <Item
                            id={note._id}
                            onClick={() => Redirect(note._id)}
                            label={note.title}
                            icon={FileIcon}
                            noteIcon={note.icon}
                            active={params.noteId === note._id}
                            level={level}
                            onExpand={() => onExpand(note._id)}
                            expanded={expanded[note._id]}
                        />
                        {expanded[note._id] && (
                            <NoteList
                                parentNoteId={note._id}
                                level={level + 1}
                            />
                        
                        )}
                    </div>
                ))
            }
        </>
     );
}
 
export default NoteList;