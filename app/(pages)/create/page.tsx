import { Header } from "@/components/landing-page/header";
import { Rocket } from "lucide-react";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";

export default function Create() {
    return (
        <>
            <Header />
            <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold text-white">
                        Escolha seu link
                    </h1>
                    <Rocket className="size-10" />
                </div>

                <form className="w-full flex items-center gap-2" action="
                ">
                    <span className="text-white">projectinbio.com/</span>
                    <TextInput />
                    <Button className="[126px]">Criar</Button>
                </form>
                <div className="">
                    <span className="text-accent-pink">
                        Erro de exemplo
                    </span>
                </div>
            </div>
        </>
    )
}