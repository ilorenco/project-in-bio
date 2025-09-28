"use client"

import { startTransition, useState, useEffect } from "react"

import { Modal } from "@/components/ui/modal";
import { Plus } from "lucide-react";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { addCustomLinks } from "@/actions/add-custom-link";
import { Link } from "@/actions/add-custom-link";
import { ProfileData } from "@/server/get-profile-data";

export function AddCustomLink({ profileData }: { profileData?: ProfileData }) {
    const router = useRouter()

    const { profileId } = useParams()
    
    const [isOpen, setIsOpen] = useState(false)
    const [isSavingCustomLinks, setIsSavingCustomLinks] = useState(false)

    const [link1, setLink1] = useState({
        title: "",
        url: "",
    })
    const [link2, setLink2] = useState({
        title: "",
        url: "",
    })
    const [link3, setLink3] = useState({
        title: "",
        url: "",
    })

    useEffect(() => {
        if (isOpen && profileData) {
            setLink1({
                title: profileData.link1?.title || "",
                url: profileData.link1?.url || "",
            })
            setLink2({
                title: profileData.link2?.title || "",
                url: profileData.link2?.url || "",
            })
            setLink3({
                title: profileData.link3?.title || "",
                url: profileData.link3?.url || "",
            })
        }
    }, [isOpen, profileData])

    async function handleSaveCustomLinks() {
        setIsSavingCustomLinks(true)

        if (!profileId) return

        await addCustomLinks(profileId as string, link1, link2, link3)
        
        startTransition(() => {
            setIsSavingCustomLinks(false)
            setIsOpen(false)
            router.refresh()
        })
    }

    return (
        <>
            <button className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] hover:cursor-pointer" onClick={() => setIsOpen(true)}>
                <Plus />
            </button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
                    <p className="text-white font-bold text-xl">
                        Gerenciar links personalizados
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col w-full">
                                <p className="font-bold">
                                    Título do link
                                </p>
                                <TextInput placeholder="Digite o Título do link" value={link1.title} onChange={(e) => setLink1({ ...link1, title: e.target.value })} />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="font-bold">
                                    Link
                                </p>
                                <TextInput placeholder="Inserir UR" value={link1.url} onChange={(e) => setLink1({ ...link1, url: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col w-full">
                                <p className="font-bold">
                                    Título do link
                                </p>
                                <TextInput placeholder="Digite o Título do link" value={link2.title} onChange={(e) => setLink2({ ...link2, title: e.target.value })} />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="font-bold">
                                    Link
                                </p>
                                <TextInput placeholder="Inserir UR" value={link2.url} onChange={(e) => setLink2({ ...link2, url: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col w-full">
                                <p className="font-bold">
                                    Título do link
                                </p>
                                <TextInput placeholder="Digite o Título do link" value={link3.title} onChange={(e) => setLink3({ ...link3, title: e.target.value })} />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="font-bold">
                                    Link
                                </p>
                                <TextInput placeholder="Inserir UR" value={link3.url} onChange={(e) => setLink3({ ...link3, url: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button className="font-bold text-white" onClick={() => setIsOpen(false)}>
                            Voltar
                        </button>
                        <Button onClick={handleSaveCustomLinks} disabled={isSavingCustomLinks}>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}