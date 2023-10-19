"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight, ArrowRightCircle, Syringe } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
}

const Heading: React.FC<Props> = ({ title }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Ideas, Notes, and Plans on <br />
        <span className="mt-1 underline flex justify-center items-center">
          ROIDS
          <Syringe className="w-10 h-10 ml-3" />
        </span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        ROIDS is a workspace where <br />
        faster and better ideas are born.
      </h3>
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/notes">
            Go to Notes
            <ArrowRightCircle className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Started
            <ArrowRightCircle className="h-5 w-5 ml-2" />
          </Button>
        </SignInButton>
      )}
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default Heading;
