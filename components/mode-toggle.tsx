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
            <Button variant="outline"  onClick={handleClick} className="rounded-xl p-3 ">
                {theme === "dark" ? (
                    <SunIcon className="w-5 h-5" />
                ) : (
                    <MoonIcon className="w-5 h-5" />
                )}
            </Button>
        </div>
     );
}
 
export default ModeToggle;