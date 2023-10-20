"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import {useQuery} from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
    CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
    const {user} = useUser();
    const router = useRouter();
    const notes = useQuery(api.notes.getSearch)
    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    const onSelect = (id: string) => {
        router.push(`/notes/${id}`);
        onClose();
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey|| e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }
        window.addEventListener("keydown", down);
        return () => {
            window.removeEventListener("keydown", down);
        }
    }, [toggle]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;



    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <CommandInput placeholder={`Search notes...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading={`Notes`}>
                    {notes?.map((note) => (
                        <CommandItem
                            key={note._id}
                            value={`{${note._id}-${note.title}}}`}
                            title={note.title}
                            onSelect={onSelect}
                        >
                            {note.icon ? (
                                <p className="mr-2 text-[18px]">{note.icon}</p>
                            ):(
                                <File className="mr-2 h-4 w-4"/>
                            )}
                            <span className="">
                                {note.title}
                            </span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )

}