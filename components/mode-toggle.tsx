"use client";
import { useTheme } from "next-themes";
import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const ModeToggle = () => {
    const { theme, setTheme } = useTheme();

    const handleClick = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return ( 
        <div className="">
            <Button variant="ghost" size="sm"  onClick={handleClick} className="rounded-xl p-3 ">
                {theme === "dark" ? (
                    <SunIcon className="w-4 h-4" />
                ) : (
                    <MoonIcon className="w-4 h-4" />
                )}
            </Button>
        </div>
     );
}
 
export default ModeToggle;