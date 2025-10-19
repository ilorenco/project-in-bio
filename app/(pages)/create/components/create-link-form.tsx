"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TextInput } from "@/components/ui/text-input"
import { sanitizeLink } from "@/lib/utils"
import { verifyLinkAvailability } from "@/actions/verify-link-availability"
import { createLink } from "@/actions/create-link"
import { useRouter, useSearchParams } from "next/navigation"

export function CreateLinkForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [link, setLink] = useState(sanitizeLink(searchParams.get("link") || ""))
    const [error, setError] = useState("")

    function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLink(sanitizeLink(e.target.value))
        setError("")
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (link === "") return setError("Link não pode ser vazio")

        const isLinkAvailable = await verifyLinkAvailability(link)
        if (!isLinkAvailable) return setError("Link já está em uso")

        const isLinkCreated = await createLink(link)
        if (!isLinkCreated) return setError("Erro ao criar link. Tente novamente mais tarde")
        
        router.push(`/${link}`)
    }

    return (
        <>
            <form className="w-full flex items-center gap-2" onSubmit={handleSubmit}>
                <span className="text-white">projectinbio.com/</span>
                <TextInput value={link} onChange={handleLinkChange} />
                <Button className="[126px]">Criar</Button>
            </form>
            <div className="">
                <span className="text-accent-pink">
                    {error}
                </span>
            </div>
        </>
    )
}