import React from 'react'
import Link from "next/link";
import Image from "next/image";

interface Props {
    title: string;
    image: string;
    location: string;
    slug: string;
    date: string;
    time: string;
}

const EventCard = ({ title, image, slug, time, date, location }: Props) => {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image src={image} width={410} height={300} alt={title} className="poster" />
            <div className="flex flex-row gap-2">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                <p>{location}</p>
            </div>
            <p className="title">{title}</p>
            <div className="flex gap-1 items-center">
                <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                <p>{date}</p>
            </div>
            <div className="flex gap-1 items-center">
                <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                <p>{time}</p>
            </div>
        </Link>
    )
}

export default EventCard;
