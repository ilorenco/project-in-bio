import "server-only"
import { db, getDownloadURLFromPath } from "@/lib/firebase"
import { Link } from "@/actions/add-custom-link"

export type ProfileData = {
    userId: string
    totalVisits: number
    createdAt: number
    yourName?: string
    yourDescription?: string
    imagePath?: string
    imageUrl?: string
    socialMedias?: {
        github: string
        instagram: string
        linkedin: string
        twitter: string
    },
    link1?: Link
    link2?: Link
    link3?: Link,
    updatedAt?: number,
}

export type ProjectData = {
    id: string
    userId: string
    projectName: string
    projectDescription: string
    projectUrl: string
    imagePath: string
    createdAt: number
    totalVisits?: number
}

export async function getProfileData(profileId: string) {
    const snapshot = await db.collection("profiles").doc(profileId).get()
    const data = snapshot.data() as ProfileData

    if (data?.imagePath) {
        data.imageUrl = await getDownloadURLFromPath(data.imagePath) || undefined
    }

    return data
}

export async function getProfileProjects(profileId: string) {
    const snapshot = await db.collection("profiles").doc(profileId).collection("projects").get()

    return snapshot.docs.map((doc) => doc.data()) as ProjectData[]
}