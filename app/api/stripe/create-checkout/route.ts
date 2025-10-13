import stripe from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { metadata, isSubscription } = await request.json()

    const price = isSubscription ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID : process.env.STRIPE_PRICE_ID

    const session = await stripe.checkout.sessions.create({
        // customer :,
        line_items: [{
            price: price,
            quantity: 1,
        }],
        mode: isSubscription ? "subscription" : "payment",
        metadata,
        payment_method_types: isSubscription ? ["card"] : ["card", "boleto"],
        success_url: `${request.headers.get("origin")}/${metadata.profileId}`,
        cancel_url: `${request.headers.get("origin")}/${metadata.profileId}/upgrade`,
    })

    return NextResponse.json({
        url: session.url,
    })
}