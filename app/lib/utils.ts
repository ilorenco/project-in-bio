import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
    if (!link) return ""

    return link
        .replace(/\s/g, "")
        .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, "")
        .toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
    const compressPromises = files.map(async (file) => {

        try {
            return await compressImage(file)
        } catch (error) {
            console.error(error)
            return null
        }
    })

    return (await Promise.all(compressPromises)).filter((file) => file !== null)
}

export const compressImage = (image: File): Promise<File> => {
    return new Promise((resolve) => {
        const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 900,
            useWebWorker: true,
            fileType: "image/png",
        }

        imageCompression(image, options).then((compressedImage) => {
            resolve(compressedImage)
        })
    })
}

export function formatProjectUrl(projectUrl: string) {
    if (!projectUrl || projectUrl.trim() === "") return ""
    return projectUrl.startsWith("http") ? projectUrl : `https://${projectUrl}`
}

export function triggerImageInput(id: string) {
    document.getElementById(id)?.click()
}