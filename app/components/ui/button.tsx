import { cn } from "@/lib/utils";

export function Button({ 
    children, variant = "primary", ...props }: { children: React.ReactNode, variant?: "primary" | "secondary" | "ghost" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={cn("p-3 text-content-heading rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 hover:cursor-pointer",
            variant === "primary" && "bg-accent-purple",
            variant === "secondary" && "bg-background-tertiary",
            variant === "ghost" && "border-border-primary",
            props.className
        )}>
            {children}
        </button>
    )
}

