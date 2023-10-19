import Image from "next/image";
// lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px]
export const Heros = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:[350px]
                md:w-[400px] md:h-[400px] ">
                    <Image className="object-contain" src="/write.png" fill  alt="img"/>
                </div>
                <div className="relative w-[400px] h-[400px] hidden md:block">
                    <Image className="object-contain" src="/carry.png" fill  alt="img"/>
                </div>
                <div className="relative w-[400px] h-[400px] hidden md:block">
                    <Image className="object-contain" src="/girl.png" fill  alt="img"/>
                </div>
            </div>
        </div>
    )
}
