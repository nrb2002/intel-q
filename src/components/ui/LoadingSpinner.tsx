import * as React from "react";
import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg";

export interface LoadingSpinnerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    size?: SpinnerSize;
    label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
};

export function LoadingSpinner({
    className,
    size = "md",
    label = "Loading...",
    ...props
}: LoadingSpinnerProps) {
    return (
        <div
            role="status"
            aria-label={label}
            className={cn(
                "flex items-center justify-center",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "animate-spin rounded-full border-gray-200 border-t-blue-600",
                    sizeStyles[size]
                )}
            />
            <span className="sr-only">{label}</span>
        </div>
    );
}