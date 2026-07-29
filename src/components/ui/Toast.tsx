"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ToastVariant =
    | "default"
    | "success"
    | "error"
    | "warning";

export interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: ToastVariant;
}

interface ToastContextValue {
    toasts: Toast[];
    showToast: (toast: Omit<Toast, "id">) => void;
    dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
    undefined
);

const variantStyles: Record<ToastVariant, string> = {
    default: "bg-white border-gray-200 text-gray-900",
    success: "bg-green-50 border-green-200 text-green-900",
    error: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
};

export function ToastProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const dismissToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = React.useCallback(
        (toast: Omit<Toast, "id">) => {
            const id =
                typeof crypto !== "undefined" && crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now().toString();

            setToasts((prev) => [...prev, { ...toast, id }]);

            setTimeout(() => {
                dismissToast(id);
            }, 5000);
        },
        [dismissToast]
    );

    return (
        <ToastContext.Provider
            value={{
                toasts,
                showToast,
                dismissToast,
            }}
        >
            {children}

            <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-3">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="alert"
                        className={cn(
                            "pointer-events-auto w-80 rounded-lg border p-4 shadow-lg transition-all",
                            variantStyles[toast.variant ?? "default"]
                        )}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <p className="font-semibold">
                                    {toast.title}
                                </p>

                                {toast.description && (
                                    <p className="mt-1 text-sm opacity-90">
                                        {toast.description}
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                aria-label="Dismiss notification"
                                onClick={() => dismissToast(toast.id)}
                                className="rounded p-1 opacity-60 transition hover:opacity-100"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = React.useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider."
        );
    }

    return context;
}