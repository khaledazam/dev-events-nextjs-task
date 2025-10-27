import React from 'react'
import {ExploreBtn} from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Page = async () => {
    const responce = await fetch(`${BASE_URL}/api/events`)
    const {events} = await responce.json();
    return (
<section>
    <h1 className="text-center">The Hub for Every Dev <br/>Event You Can't Miss</h1>
    <p className="text-center mt-5">Hackathons, Meetups, and Conferences , All in One Place</p>
    <ExploreBtn />

    <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events ">
            {events.map((event: IEvent) => (
                <li key={event.title}><EventCard  {...event}/></li>
            ))}
        </ul>
    </div>
</section>
    )
}
export default Page
