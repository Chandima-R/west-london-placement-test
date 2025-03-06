'use client'

import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";


export default function Page() {
    return (
        <div>
            <p>dashboard page</p>
            <Button onClick={() => signOut()}>logout</Button>
        </div>
    )
}