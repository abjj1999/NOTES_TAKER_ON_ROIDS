import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
})

const Logo = () => {
    return ( 
        <div className="hidden md:flex items-center gap-x-2">
            <Image src="/loogo.png" 
            height="40"
            width="40"
            className="dark:hidden" alt="" />
            <Image src="/logo_dark.png" 
            height="40"
            width="40"
            className="hidden dark:block" alt="" />
            <p className={cn("font-semibold", font.className)}>
                ROIDS
            </p>
            
        </div>
     );
}
 
export default Logo;