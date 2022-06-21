import { getSession } from "next-auth/react"
import { Router } from "next/router"


export default async function handler(req: any, res: any) {

    const session = await getSession({ req })

    if (session != null) {
        res.redirect('/Profile')
    } else {
        res.redirect('/')
    }

}
