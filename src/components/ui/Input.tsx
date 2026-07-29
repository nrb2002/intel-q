import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            id,
            name,
            required,
            ...props
        },
        ref
    ) => {
        const inputId = id ?? name;
        const helperId = helperText ? `${inputId}-helper` : undefined;
        const errorId = error ? `${inputId}-error` : undefined;

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700"
                    >
                        {label}
                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : helperId}
                    className={cn(
                        "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm",
                        "placeholder:text-gray-400",
                        "transition-colors duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-offset-1",
                        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60",
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500",
                        className
                    )}
                    {...props}
                />

                {error ? (
                    <p
                        id={errorId}
                        className="text-sm text-red-600"
                    >
                        {error}
                    </p>
                ) : helperText ? (
                    <p
                        id={helperId}
                        className="text-sm text-gray-500"
                    >
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";