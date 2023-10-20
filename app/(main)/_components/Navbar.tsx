"use client";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { Title } from "./Title";
import { Banner } from "./Banner";
// import { Banner } from "./Banner";




interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

export const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {
    const params = useParams();
    const note = useQuery(api.notes.getById, {
        noteId: params.noteId as Id<"notes">
    });

    if(note === undefined) {
        return (
            <nav className="bg-background dark:bg-[#131313] px-3 py-2 w-full flex items-center gap-x-4">
                <Title.Skeleton />
            </nav>
        )
    };

    if(note === null) {
        return <p>Note not found</p>
    }

    return ( 
       <>
            <nav className="bg-background dark:bg-[#131313] px-3 py-2 w-full flex items-center gap-x-4">
                {
                    isCollapsed && (
                        <MenuIcon className="h-6 w-6 text-muted-foreground" role="button" onClick={onResetWidth} />
                    )
                }
                <div className="flex items-center justify-between w-full">
                    <Title iniatialData={note} />
                </div>
            </nav>
            {
                note.isArchived && (
                    
                        <Banner noteId={note._id} />
                    
                )
            }
       </>
     );
}