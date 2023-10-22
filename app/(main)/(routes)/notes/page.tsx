"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const NotePage = () => {
    const {user} = useUser();
    const create = useMutation(api.notes.create);
    const router = useRouter();

    
    const onCreate = async () => {
        const promise = create({
            title: "untitled",
        }).then((noteId) => {
            router.push(`/notes/${noteId}`);
        })

        toast.promise(promise, {
            loading: "Creating note...",
            success: "Note created!",
            error: "Error creating note.",
        })
    }

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src="/bulb.png" alt="" height="450" width="450" className="dark:hidden opacity-80" /> 
            <Image src="/bulbb_dark.png" alt="" height="400" width="400" className=" hidden dark:block opacity-80" /> 
            <h2 className="text-lg font-medium ">
                Welcome 
                    <span className="font-bold capitalize">
                    &nbsp;{user?.firstName}&nbsp;
                    </span>
                to your ROIDS
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a Note
            </Button>
        </div>
     );
}
 
export default NotePage;