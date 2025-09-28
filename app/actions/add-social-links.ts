"use server"

import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function addSocialLinks(profileId: string, github: string, instagram: string, linkedin: string, twitter: string) {
    const session = await auth()
    if (!session) return

    try {
        await db.collection("profiles").doc(profileId).update({
            socialMedias: {
                github,
                instagram,
                linkedin,
                twitter,
            },
            updatedAt: Timestamp.now().toMillis(),
        })

        return true
    } catch (error) {
        console.error(error)
        return false
    }

}