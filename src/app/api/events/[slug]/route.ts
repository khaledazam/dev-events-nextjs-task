import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

type RouteParams = { params: { slug: string } };

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        await connectDB();

        const slug = params.slug?.trim().toLowerCase();
        console.log("Received slug:", slug); // تتبع الـ slug

        if (!slug) {
            return NextResponse.json({ message: "Missing slug" }, { status: 400 });
        }

        const event = await Event.findOne({ slug }).lean();
        console.log("Fetched event:", event); // تتبع النتيجة

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Event fetched", event });
    } catch (error: any) {
        console.error("Error in GET /api/events/[slug]:", error);
        return NextResponse.json({ message: "Failed to fetch event", error: error.message }, { status: 500 });
    }
}