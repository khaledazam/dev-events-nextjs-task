import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { notFound } from "next/navigation";

type Params = {
    params: Promise<{ slug: string }>;
};

const EventDetailsPage = async ({ params }: Params) => {
    const { slug } = await params;
    console.log("Received params:", { slug }); // هيظهر "frontend-masters-workshop-2025" لو الـ URL صح

    let event: IEvent | null = null;
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`, {
            next: { revalidate: 60 },
        });

        if (!request.ok) {
            if (request.status === 404) return notFound();
            throw new Error(`Failed to fetch event: ${request.statusText}`);
        }

        const response = await request.json();
        event = response.event as IEvent;
    } catch (error) {
        console.error("Fetch Error:", error);
    }

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);
    const bookings = 10; // يمكن تستبدله بقيمة ديناميكية

    return (
        <main>
            <Suspense fallback={<div>Loading event details...</div>}>
                <EventDetails event={event} similarEvents={similarEvents} bookings={bookings} />
            </Suspense>
        </main>
    );
};

export default EventDetailsPage;