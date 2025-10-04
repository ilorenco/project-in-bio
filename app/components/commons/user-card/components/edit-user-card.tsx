"use client"

import { ArrowUpFromLine, UserPen } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { useState, startTransition } from "react"
import { TextInput } from "@/components/ui/text-input"
import { TextArea } from "@/components/ui/text-area"
import { Button } from "@/components/ui/button"
import { compressFiles, triggerImageInput } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"
import { updateProfile } from "@/actions/update-profile"
import { ProfileData } from "@/server/get-profile-data"

export function EditUserCard({ profileData }: { profileData?: ProfileData }) {
    const router = useRouter()
    const { profileId } = useParams()
    
    const [isOpen, setIsOpen] = useState(false)
    const [isSavingUser, setIsSavingUser] = useState(false)
    const [profilePic, setProfilePic] = useState<string | null>(profileData?.imagePath || null)
    const [yourName, setYourName] = useState(profileData?.yourName || "")
    const [yourDescription, setYourDescription] = useState(profileData?.yourDescription || "")

    async function handleSaveUser() {
        setIsSavingUser(true)

        const imagesInput = document.getElementById("profile-pic-input") as HTMLInputElement
    
        if (!profileId) return
        
        const compressedFile = await compressFiles(Array.from(imagesInput.files ?? []))
        const formData = new FormData()
        formData.append("file", compressedFile[0])
        formData.append("profileId", profileId as string)
        formData.append("yourName", yourName)
        formData.append("yourDescription", yourDescription)

        await updateProfile(formData)

        startTransition(() => {
            setIsOpen(false)
            setIsSavingUser(false)
            router.refresh()
        })
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setProfilePic(URL.createObjectURL(file as Blob))
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                <UserPen className="hover:cursor-pointer" />
            </button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
                    <p className="text-white font-bold text-xl">
                        Editar perfil
                    </p>
                    <div className="flex gap-10">
                        <div className="flex flex-col items-center gap-3 text-xs">
                            <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                                {profilePic ? (
                                    <img src={profilePic} className="object-cover object-center" />
                                ) : (
                                    <button className="w-full h-full" onClick={() => triggerImageInput("profile-pic-input")}>
                                        100x100 px
                                    </button>
                                )}
                            </div>
                            <button className="text-white flex items-center gap-2" onClick={() => triggerImageInput("profile-pic-input")} >
                                <ArrowUpFromLine className="size-4" />
                                <span className="hover:cursor-pointer hover:underline text-white font-bold">
                                    Adicionar foto
                                </span>
                            </button>
                            <input 
                                id="profile-pic-input"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-[293px]">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="your-name" className="text-white font-bold">
                                    Seu nome
                                </label>
                                <TextInput id="your-name" placeholder="Digite seu nome" value={yourName} onChange={(e) => setYourName(e.target.value)} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="your-description">
                                    Descrição
                                </label>
                                <TextArea id="your-description" placeholder="Fale um pouco sobre você" className="h-36" value={yourDescription} onChange={(e) => setYourDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button className="font-bold text-white hover:cursor-pointer" onClick={() => setIsOpen(false)}>
                            Voltar
                        </button>
                        <Button onClick={handleSaveUser} disabled={isSavingUser}>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}