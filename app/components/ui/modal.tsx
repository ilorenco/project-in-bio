"use client"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"
import { useRef } from "react"

export function Modal({
    children,
    isOpen,
    setIsOpen
}: {
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}) {

    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false))

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-[#787878]/10 flex items-center justify-center backdrop-blur-md z-50">
            <div ref={ref} className="">
                {children}
            </div>

        </div>
    )
}