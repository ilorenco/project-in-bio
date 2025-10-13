"use client"

import { Button } from "@/components/ui/button"
import { useStripe } from "@/hooks/useStripe"
import { useParams } from "next/navigation"

export function PlanButtons() {
    const { createStripeCheckout } = useStripe()

    const profileId = useParams().profileId



    return (
        <div className="flex gap-4">
            <Button onClick={() => createStripeCheckout({ metadata: { profileId }, isSubscription: true })}>R$ 9,90 / mês</Button>
            <Button onClick={() => createStripeCheckout({ metadata: { profileId }, isSubscription: false })}>R$ 99,90 Vitalício</Button>
        </div>
    )
}