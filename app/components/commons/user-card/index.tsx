"use client"

import { useState } from "react"
import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react"
import { ProfileData } from "@/server/get-profile-data"
import { Button } from "@/components/ui/button"
import EditSocialLinks from "./components/edit-social-links"
import Link from "next/link"

export function UserCard({
    profileData,

}: {
    profileData?: ProfileData
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white/10 bg-[#121212] rounded-3xl text-white">
            <div className="size-48">
                <img 
                    className="rounded-full object-cover w-full h-full"
                    src="https://github.com/ilorenco.png"
                    alt="User Card"
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
                        Igor Henrique
                    </h3>
                </div>
                <p className="opacity-40">
                    "Eu faço produtos para a Internet"
                </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <span className="uppercase text-xs font-medium">
                    Links
                </span>
                <div className="flex gap-3">
                    {profileData?.socialMedias?.github && (
                        <Link href={`${profileData.socialMedias.github}`} target="_blank" className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] hover:cursor-pointer">
                            <Github />
                        </Link>
                    )}
                    {profileData?.socialMedias?.linkedin && (
                        <Link href={`${profileData.socialMedias.linkedin}`} target="_blank" className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] hover:cursor-pointer">
                            <Linkedin />
                        </Link>
                    )}
                    {profileData?.socialMedias?.instagram && (
                        <Link href={`${profileData.socialMedias.instagram}`} target="_blank" className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] hover:cursor-pointer">
                            <Instagram />
                        </Link>
                    )}
                    {profileData?.socialMedias?.twitter && (
                        <Link href={`${profileData.socialMedias.twitter}`} target="_blank" className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] hover:cursor-pointer">
                            <Twitter />
                        </Link>
                    )}
                    <EditSocialLinks profileData={profileData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full h-[172px]">
                <div className="w-full flex flex-col items-center gap-3">
                    <Button className="w-full">Template Saas - Compre Agora</Button>
                    <button  className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] hover:cursor-pointer">
                        <Plus />
                    </button>
                </div>
            </div>
        </div>
    )
}