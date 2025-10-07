"use client"

import { ProjectData } from "@/server/get-profile-data";
import { formatProjectUrl } from "@/lib/utils";
import Link from "next/link";
import { increaseProjectVisits } from "@/actions/increase-project-visits";
import { useParams } from "next/navigation";

export function ProjectCard({ project, isUserOwner, img }: { project: ProjectData, isUserOwner: boolean, img: string }) {

    const projectUrl = formatProjectUrl(project.projectUrl)
    const { profileId } = useParams()
    
    async function handleClick() {
        if (!profileId || !project.id || isUserOwner) return
        
        await increaseProjectVisits(profileId as string, project.id)
    }

    return (
        <Link href={projectUrl} target="_blank" onClick={handleClick}>
            <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
                <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                    src={img} 
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {isUserOwner && (
                        <span className="uppercase text-xs font-bold text-accent-green">
                            {project.totalVisits || 0} cliques
                        </span>
                    )}
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl">
                            {project.projectName}
                        </span>
                        <span className="text-content-body text-sm">
                            {project.projectDescription}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}