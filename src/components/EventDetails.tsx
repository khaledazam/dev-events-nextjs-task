import React from "react";
import { notFound } from "next/navigation";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";

interface EventDetailsProps {
    event: IEvent | null;
    similarEvents: IEvent[];
    bookings: number;
}

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
    </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => <div className="pill" key={tag}>{tag}</div>)}
    </div>
);

const EventDetails: React.FC<EventDetailsProps> = ({ event, similarEvents, bookings }) => {
    if (!event) {
        return notFound(); // أو يمكن تعرض رسالة خطأ بدل notFound
    }

    const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer, slug, _id } = event;

    return (
        <section id="event" className="flex flex-col gap-8">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>
            <div className="details">
                <div className="content">
                    <Image src={image} alt="Event Banner" width={800} height={800} className="banner" unoptimized={image.startsWith('https://')} />
                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                    </section>
                    <EventAgenda agendaItems={agenda} />
                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>
                    <EventTags tags={tags} />
                </div>
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">Join {bookings} people who have already booked their spot!</p>
                        ) : (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}
                        <BookEvent eventId={_id} slug={slug} />
                    </div>
                </aside>
            </div>
            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.slug} {...similarEvent} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventDetails;