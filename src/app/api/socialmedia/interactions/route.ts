import { SocialMediaData } from "@/app/utils/mockdata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const socialmedia = params.get('socialmedia') || ""
    try {

        const statistics = SocialMediaData.find((item) => item.name.toLowerCase() === socialmedia.toLowerCase())

        if (!statistics) {
            return NextResponse.json({ error: true, message: "Social media not found" }, { status: 404 })
        }
        return NextResponse.json({ error: false, message: "OK", statistics }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: true, message: error }, { status: 500 })
    }
}