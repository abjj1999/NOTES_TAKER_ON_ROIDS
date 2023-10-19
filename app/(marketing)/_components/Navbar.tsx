"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ModeToggle from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, LogInIcon } from "lucide-react";

const Navbar = () => {
    const scrolled = useScrollTop();
    const {isAuthenticated, isLoading} = useConvexAuth();
    return ( 
        <div className={cn(
            "z-50 bg-background dark:bg-[#131313] fixed top-0 flex items-center w-full p-4",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">Login</Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">
                                Get Started
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading&& (
                    <>
                        <Button  size="sm" asChild>
                            <Link href="/notes">
                             Notes 
                            <ArrowRightCircle className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
     );
}
 
export default Navbar;