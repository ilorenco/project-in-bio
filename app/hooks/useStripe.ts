export function useStripe() {
    async function createStripeCheckout({
        metadata,
        isSubscription
    }: {
        metadata: any,
        isSubscription: boolean
    }) {
        try {
            const response = await fetch("/api/stripe/create-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ metadata, isSubscription }),
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    return {
        createStripeCheckout,
    }
}