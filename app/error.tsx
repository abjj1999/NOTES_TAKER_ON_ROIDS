"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

const Error = () => {
    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <h1 className="
                text-5xl font-bold text-gray-800 dark:text-gray-100
            ">
                Error 404 - Page not found
            </h1>
            <Button
                
            asChild>
                <Link href="/notes">
                    <MoveLeft className="w-6 h-6 mr-2" />
                    <span className="font-semibold">Go back</span>
                </Link>
            </Button>
        </div>
     );
}
 
export default Error;