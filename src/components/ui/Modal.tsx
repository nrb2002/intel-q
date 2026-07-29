"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    className,
}: ModalProps) {
    const titleId = React.useId();

    React.useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="presentation"
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "w-full max-w-md rounded-lg bg-white p-6 shadow-xl",
                    className
                )}
            >
                <div className="mb-4 flex items-center justify-between">
                    {title && (
                        <h2
                            id={titleId}
                            className="text-lg font-semibold text-gray-900"
                        >
                            {title}
                        </h2>
                    )}

                    <button
                        type="button"
                        aria-label="Close modal"
                        onClick={onClose}
                        className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            width="20"
                            height="20"
                            fill="none"
                        >
                            <path
                                d="M15 5L5 15M5 5L15 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}