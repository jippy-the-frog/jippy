import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { Box } from "@/components/ui/box";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-sky-200/60 text-sky-600 hover:bg-sky-200/40",
        destructive: "bg-red-200/60 text-destructive/90 hover:bg-red-200/40",
        primary:
          "bg-primary-alt/20 text-primary-alt-800/80 hover:bg-primary-alt/15",
        secondary: "bg-secondary/10 text-secondary-700",
      },
      size: {
        default: "h-6 px-2 py-2",
        sm: "h-5 rounded-md px-2",
        lg: "h-8 rounded-lg px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ChipProps extends VariantProps<typeof chipVariants> {
  label: string;
  className?: string;
  Icon?: LucideIcon;
}

const Chip = ({ label, variant, size, className, Icon }: ChipProps) => {
  return (
    <Box className={cn(chipVariants({ variant, size }), className)}>
      {Icon && <Icon className="mr-2" size={16} strokeWidth={1.6} />}
      {label}
    </Box>
  );
};

export default Chip;
