"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { Timestamp } from "firebase-admin/firestore"

export async function createLink(link: string) {
    const session = await auth()

    if (!session) return

    try {
        await db.collection("profiles").doc(link).set({
            userId: session.user?.id,
            totalVisits: 0,
            createdAt: Timestamp.now().toMillis(),
        })

        return true
    } catch (error) {
        return false
    }
}