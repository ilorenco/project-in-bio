"use client"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { addSocialLinks } from "@/actions/add-social-links"
import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react"
import { startTransition, useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { TextInput } from "@/components/ui/text-input"
import { ProfileData } from "@/server/get-profile-data"

interface EditSocialLinksProps {
    isModalOpen: boolean
    setIsModalOpen: (isOpen: boolean) => void
    profileData?: ProfileData
}

export default function EditSocialLinks({ isModalOpen, setIsModalOpen, profileData }: EditSocialLinksProps) {
    const router = useRouter()
    
    const [isUserAddingSocialLinks, setIsUserAddingSocialLinks] = useState(false)
    const [github, setGithub] = useState(profileData?.socialMedias?.github || "")
    const [instagram, setInstagram] = useState(profileData?.socialMedias?.instagram || "")
    const [linkedin, setLinkedin] = useState(profileData?.socialMedias?.linkedin || "")
    const [twitter, setTwitter] = useState(profileData?.socialMedias?.twitter || "")

    const { profileId } = useParams()

    async function handleAddSocialLinks() {
        setIsUserAddingSocialLinks(true)

        if (!profileId) return

        await addSocialLinks(
            profileId as string,
            github,
            instagram,
            linkedin,
            twitter
        )

        startTransition(() => {
            setIsModalOpen(false)
            setIsUserAddingSocialLinks(false)
            router.refresh()
        })
    }

    useEffect(() => {
        setGithub(profileData?.socialMedias?.github || "")
        setInstagram(profileData?.socialMedias?.instagram || "")
        setLinkedin(profileData?.socialMedias?.linkedin || "")
        setTwitter(profileData?.socialMedias?.twitter || "")
    }, [profileData])

    return (
        <>
            <button 
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] hover:cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <Plus />
            </button>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
                    <p className="text-white font-bold text-xl">
                        Adicionar redes sociais
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 w-full">
                            <Github />
                            <TextInput type="text" placeholder="Link da sua conta no Github" value={github} onChange={(e) => setGithub(e.target.value)} />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Linkedin />
                            <TextInput type="text" placeholder="Link da sua conta no Linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Instagram />
                            <TextInput type="text" placeholder="Link da sua conta no Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <Twitter />
                            <TextInput type="text" placeholder="Link da sua conta no Twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button className="font-bold text-white" onClick={() => setIsModalOpen(false)}>
                            Voltar
                        </button>
                        <Button onClick={() => handleAddSocialLinks()} disabled={isUserAddingSocialLinks}>
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}