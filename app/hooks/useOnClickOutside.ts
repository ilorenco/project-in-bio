import { useEffect } from "react"

export function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler?: (event: MouseEvent | TouchEvent) => void) {

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const target = event.target as HTMLElement

            if (!ref.current || ref.current.contains(target)) return

            handler?.(event)
        }
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)
    
        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [ref, handler])
}