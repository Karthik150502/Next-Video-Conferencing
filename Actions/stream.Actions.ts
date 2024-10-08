"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY


export const tokenProvider = async () => {
    const user = await currentUser();


    if (!user) throw new Error("User not authenticated.");

    if (!apiKey) throw new Error("API key is not present");

    if (!apiSecret) throw new Error("API Secret is not present");


    const client = new StreamClient(apiKey, apiSecret)
    const exp = Math.round(new Date().getTime() / 1000) + (60 * 60)
    const issuedAt = Math.floor(Date.now() / 1000) - 60

    const token = client.createToken(user.id, exp, issuedAt)

    return token;
}