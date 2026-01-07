// lib/constants.ts

export type Event = {
    id: string
    slug: string
    title: string
    description: string
    location: string
    date: string
    time: string
    image: string
    url?: string
}

export const events: Event[] = [
    {
        id: "react-conf-2026",
        slug: "react-conf-2026",
        title: "React Conf 2026",
        description:
            "The official React conference featuring the latest updates from the React core team, real-world case studies, and advanced patterns for modern web apps.",
        location: "Las Vegas, USA",
        date: "March 23–24, 2026",
        time: "09:00 AM - 05:00 PM",
        image: "/images/event1.png",
        url: "https://conf.react.dev",
    },
    {
        id: "google-io-2026",
        slug: "google-io-2026",
        title: "Google I/O 2026",
        description:
            "Google’s annual developer conference covering Android, Web, Cloud, AI, and the future of developer tooling.",
        location: "Mountain View, USA",
        date: "May 12–14, 2026",
        time: "10:00 AM - 06:00 PM",
        image: "/images/event2.png",
        url: "https://io.google",
    },
    {
        id: "jsconf-eu-2026",
        slug: "jsconf-eu-2026",
        title: "JSConf EU 2026",
        description:
            "A premier JavaScript conference bringing together frontend, backend, and platform engineers from around the world.",
        location: "Berlin, Germany",
        date: "June 18–20, 2026",
        time: "09:30 AM - 05:30 PM",
        image: "/images/event3.png",
    },
    {
        id: "hackathon-global-2026",
        slug: "global-online-hackathon-2026",
        title: "Global Online Hackathon",
        description:
            "A 48-hour virtual hackathon where developers collaborate remotely to build innovative solutions across web, mobile, and AI.",
        location: "Online",
        date: "July 10–12, 2026",
        time: "24 hours",
        image: "/images/event4.png",
    },
    {
        id: "nextjs-conf-2026",
        slug: "nextjs-conf-2026",
        title: "Next.js Conf 2026",
        description:
            "The official Next.js conference by Vercel, focused on full‑stack React, performance, and the future of the web.",
        location: "San Francisco, USA",
        date: "October 6–7, 2026",
        time: "09:00 AM - 05:00 PM",
        image: "/images/event5.png",
        url: "https://nextjs.org/conf",
    },
]