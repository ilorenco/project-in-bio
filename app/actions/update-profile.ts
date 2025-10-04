"use server"

import { db, storage } from "@/lib/firebase"
import { Timestamp } from "firebase-admin/firestore"
import { randomUUID } from "crypto"
import { auth } from "@/lib/auth"

export async function updateProfile(formData: FormData) {

    const session = await auth()
    if (!session) return


    try {
        const profileId = formData.get("profileId") as string
        const yourName = formData.get("yourName") as string
        const yourDescription = formData.get("yourDescription") as string
        const file = formData.get("file") as File

        const hasFile = file && file.size > 0
        let currentImagePath: string | undefined

        if (hasFile) {
            const currentProfile = await db.collection("profiles").doc(profileId).get()
            currentImagePath = currentProfile?.data()?.imagePath

            if (currentImagePath) {
                const currentStorageRef = storage.file(currentImagePath)
                const [exists] = await currentStorageRef.exists()

                if (exists) {
                    await currentStorageRef.delete()
                }
            }

            const storageRef = storage.file(`profile-images/${profileId}/${randomUUID()}`)
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            await storageRef.save(buffer)

            currentImagePath = storageRef.name
        }

        await db.collection("profiles").doc(profileId).update({
            yourName,
            yourDescription,
            ...(hasFile && { imagePath: currentImagePath }),
            updatedAt: Timestamp.now().toMillis(),
        })

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}