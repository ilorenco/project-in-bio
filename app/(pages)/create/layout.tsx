import { Header } from "@/components/landing-page/header"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getProfileId } from "@/server/get-profile-data"

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) redirect("/")

    const profileId = await getProfileId(session.user?.id as string)

    if (profileId) redirect(`/${profileId}`)
    
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <Header />
            {children}
        </div>
    )
}