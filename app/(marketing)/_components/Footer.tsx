import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Footer = () => {
    return ( 
        <div className=" dark:bg-[#131313] flex items-center w-full p-6 bg-background z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex  items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Terms of Service
                </Button>
            </div>
        </div>
     );
}
 
export default Footer;