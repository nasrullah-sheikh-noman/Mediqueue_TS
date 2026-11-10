import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react";

type SpinnerProps = ComponentProps<typeof LoaderIcon>;

const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
        <LoaderIcon
          role="status"
          aria-label="Loading"
          className={cn("size-4 animate-spin", className)}
          {...props}
        />
      )
};

export default Spinner;