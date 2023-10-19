"use client"
import { Button } from '@/components/ui/button';
import { ArrowRight, Syringe } from 'lucide-react';
import React from 'react';

interface Props {
    title: string;
}

const Heading: React.FC<Props> = ({ title }) => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Ideas, Notes, and Plans on <br/> 
                <span className="mt-1 underline flex justify-center items-center">ROIDS
                <Syringe className='ml-3' />
                </span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                ROIDS is a workspace where <br/>
                faster and better ideas are born.
            </h3>
            <Button>
                Get Started
                <ArrowRight className='h-4 w-4 ml-2' />
            </Button>
        </div>
        );
};

export default Heading;
