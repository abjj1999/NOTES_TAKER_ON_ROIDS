import {Loader} from "lucide-react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"

// cva allows us to define variants for our components ie different styles for different states

const spinnerVariants = cva(
    "text-muted-foreground animate-spin",
    {
        variants: {
            size: {
                default: "w-4 h-4",
                sm: "w-2 h-2",
                lg: "w-6 h-6",
                icon: "w-10 h-10",
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
    
}

const Spinner = ({
    size
}: SpinnerProps) => {
    return ( 
        <Loader className={cn(spinnerVariants({size}))} />
     );
}
 
export default Spinner;