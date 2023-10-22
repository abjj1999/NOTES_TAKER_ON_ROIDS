"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronLeftIcon, MenuIcon, PlusCircle, PlusIcon, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { toast } from "sonner";
import NoteList from "./Notelist";
import {
    Popover, PopoverTrigger, PopoverContent
} from "@/components/ui/popover"
import TrashBox from "./TrashBox";
import { useSearch } from "@/hooks/use-search";
import { useSetting } from "@/hooks/use-setting";
import { Navbar } from "./Navbar";

const Navigation = () => {
    const search = useSearch();
    const settings = useSetting();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const params = useParams();
    const router = useRouter();
    // const notes = useQuery(api.notes.getSidebar)

    const create = useMutation(api.notes.create)

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setReseting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    //useEffect to reset width on mobile
    useEffect(() => {
        if(isMobile) {
            collapse();
        }else{
            resetWidth();
        }
    }, [isMobile]);


    //useEffect to reset width on route change
    useEffect(() => {
        if(isMobile) {
            collapse();
        }else{
            resetWidth();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if(!isResizingRef.current) return;

        let newWidth = event.clientX;
        if(newWidth < 240) newWidth = 240;
        if(newWidth > 480) newWidth = 480;

        if(sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if(sidebarRef.current && navbarRef.current) {
            setReseting(true);
            setIsCollapsed(false);
            sidebarRef.current.style.width = isMobile ? "100%" : `240px`;
            navbarRef.current.style.setProperty("left", isMobile? "100%" : `240px`);
            navbarRef.current.style.setProperty("width", isMobile? "0" : `calc(100% - 240px)`);

            // animation trick
            setTimeout(() => {
                setReseting(false);
            }, 300);
        }
    }

    const collapse = () => {
        if(sidebarRef.current && navbarRef.current) {
            setReseting(true);
            setIsCollapsed(true);
            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("left", "0");
            navbarRef.current.style.setProperty("width", "100%");

            // animation trick
            setTimeout(() => {
                setReseting(false);
            }, 300);
        }
    }

    const handleCreate = async () => {
        const promise = create({
            title: "untitled",
        }).then((noteId) => {
            router.push(`/notes/${noteId}`)  
        })

        toast.promise(promise, {
            loading: "Creating note...",
            success: "Note created!",
            error: "Error creating note"
        })
    }

  return (
    <>
      <aside ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}>
        <div className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        role="button" onClick={collapse} >
            <ChevronLeft className="w-6 h-6" />
        </div>
        <div className="">
          <UserItem />
          <Item onClick={search.onOpen} label="Search" icon={Search} isSearch />
          <Item onClick={settings.onOpen} label="Settings" icon={Settings} />
          <Item onClick={handleCreate} label="New" icon={PlusCircle} />
        </div>
        <div className="mt-4">
            <NoteList />
            <Item
                onClick={handleCreate}
                icon={PlusIcon}
                label="Add a note"
            />
            <Popover>
                <PopoverTrigger className="w-full mt-4">
                    <Item 
                        label="Trash"
                        icon={Trash}
                    />
                </PopoverTrigger>
                <PopoverContent side={isMobile? "bottom" : "right"} className="p-0 w-72">
                    <TrashBox />
                </PopoverContent>
            </Popover>
        </div>
        {/* bold line to increase width */}
        <div onMouseDown={handleMouseDown} onClick={resetWidth} className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
      </aside>
      <div className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )} ref={navbarRef} >
            {
                !!params.noteId ? (
                    <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full" >
                            {isCollapsed && (<MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />)}

                    </nav>
                )}
        
      </div>
    </>
  );
};

export default Navigation;
