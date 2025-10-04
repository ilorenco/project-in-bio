"use client"

import { useState } from "react"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { ProfileData } from "@/server/get-profile-data"
import { formatProjectUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditSocialLinks from "./components/edit-social-links"
import { AddCustomLink } from "./components/add-custom-link"
import { EditUserCard } from "./components/edit-user-card"
import Link from "next/link"

export function UserCard({
    profileData,
    isUserOwner,
}: {
    profileData?: ProfileData
    isUserOwner: boolean
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white/10 bg-[#121212] rounded-3xl text-white">
            <div className="size-48">
                {profileData?.imageUrl ? (
                    <img 
                        className="rounded-full object-cover w-full h-full"
                        src={profileData.imageUrl}
                        alt={profileData?.yourName || ""}
                    />
                ) : (
                    <div className="rounded-full w-full h-full bg-background-tertiary flex items-center justify-center">
                        <span className="text-white/40 text-sm">Sem foto</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
                        {profileData?.yourName || ""}
                    </h3>
                    {isUserOwner && (
                        <EditUserCard />
                    )}
                </div>
                <p className="opacity-40">
                    {profileData?.yourDescription || ""}
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
                    {isUserOwner && (
                        <EditSocialLinks profileData={profileData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full h-[172px]">
                <div className="w-full flex flex-col items-center gap-3">
                    {profileData?.link1 && formatProjectUrl(profileData?.link1?.url || "") && (
                        <Link href={formatProjectUrl(profileData?.link1?.url || "")} target="_blank" className="w-full">
                            <Button className="w-full">{profileData?.link1?.title}</Button>
                        </Link>
                    )}
                    {profileData?.link2 && formatProjectUrl(profileData?.link2?.url || "") && (
                        <Link href={formatProjectUrl(profileData?.link2?.url || "")} target="_blank" className="w-full">
                            <Button className="w-full">{profileData?.link2?.title}</Button>
                        </Link>
                    )}
                    {profileData?.link3 && formatProjectUrl(profileData?.link3?.url || "") && (
                        <Link href={formatProjectUrl(profileData?.link3?.url || "")} target="_blank" className="w-full">
                            <Button className="w-full">{profileData?.link3?.title}</Button>
                        </Link>
                    )}
                </div>
            </div>
            {isUserOwner && (
                <AddCustomLink profileData={profileData} />
            )}
        </div>
    )
}