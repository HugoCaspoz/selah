import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline' | 'ghost';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'solid', isLoading, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest";

        const variants = {
            solid: "bg-[#5D5A56] text-white hover:bg-[#43413E]",
            outline: "border border-current hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary",
            ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
