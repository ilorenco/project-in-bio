"use client"

import { startTransition, useState } from "react";
import { ArrowUpFromLine, Plus } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { compressFiles } from "@/lib/utils";
import { createProject } from "@/actions/create-project";
import { useRouter } from "next/navigation";

export function NewProject({ profileId }: { profileId: string }) {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [projectUrl, setProjectUrl] = useState("")
    const [projectImage, setProjectImage] = useState<File | null>(null)
    const [isUserCreatingProject, setIsUserCreatingProject] = useState(false)

    async function handleCreateProject() {
        setIsUserCreatingProject(true)

        const imagesInput = document.getElementById("imageInput") as HTMLInputElement

        if (!imagesInput.files) return setIsUserCreatingProject(false)

        const compressedFiles = await compressFiles(Array.from(imagesInput.files))

        const formData = new FormData()
        formData.append("file", compressedFiles[0])
        formData.append("profileId", profileId)
        formData.append("projectName", projectName)
        formData.append("projectDescription", projectDescription)
        formData.append("projectUrl", projectUrl)

        await createProject(formData)
        
        startTransition(() => {
            setIsOpen(false)
            setIsUserCreatingProject(false)
            setProjectName("")
            setProjectDescription("")
            setProjectUrl("")
            router.refresh()
        })

    }

    function triggerImageInput(id: string) {
        document.getElementById(id)?.click()
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setProjectImage(file)
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex justify-center items-center gap-2 hover:border border-dashed border-border-secondary hover:cursor-pointer">
                <Plus className="size-10 text-accent-green" />
                <span className="text-content-body">
                    Novo projeto
                </span>
            </button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
                    <p className="text-white font-bold text-xl">
                        Novo Projeto
                    </p>
                    <div className="flex gap-10">
                        <div className="flex flex-col items-center gap-3 text-xs">
                            <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                                {projectImage ? (
                                    <img src={URL.createObjectURL(projectImage)} className="w-full h-full object-cover object-center" />
                                ) : (
                                    <button onClick={() => triggerImageInput("imageInput")} className="w-full h-full">
                                        100x100 px
                                    </button>
                                )}
                            </div>
                            <button onClick={() => triggerImageInput("imageInput")} className="text-white flex items-center gap-2">
                                <ArrowUpFromLine className="size-4" />
                                <span className="text-white font-bold hover:underline cursor-pointer">
                                    Adicionar imagem
                                </span>
                            </button>
                            <input 
                                type="file" 
                                id="imageInput" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageChange} 
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-[293px]">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="project-name" className="text-white font-bold text-sm">
                                    Título do projeto
                                </label>
                                <TextInput 
                                    id="project-name" 
                                    placeholder="Digite o nome do projeto" 
                                    value={projectName} 
                                    onChange={(e) => setProjectName(e.target.value)} 
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="project-description" className="text-white font-bold">
                                    Descrição do projeto
                                </label>
                                <TextArea 
                                    id="project-description" 
                                    placeholder="Dê uma breve descrição do projeto" 
                                    className="h-36" 
                                    value={projectDescription} 
                                    onChange={(e) => setProjectDescription(e.target.value)} 
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="project-url" className="text-white font-bold">
                                    URL do projeto
                                </label>
                                <TextInput 
                                    type="url" 
                                    id="project-url" 
                                    placeholder="Digite a URL do projeto" 
                                    value={projectUrl} 
                                    onChange={(e) => setProjectUrl(e.target.value)} 
                                />
                            </div>
                            <div className="flex gap-4 justify-end">
                                <button onClick={() => setIsOpen(false)} className="font-bold text-white">
                                    Voltar
                                </button>
                                <Button onClick={handleCreateProject} disabled={isUserCreatingProject}>
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}