// instrumentation-client.ts
'use client'

import posthog from 'posthog-js'


const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST


if (!PH_KEY || !PH_HOST) {
    throw new Error('PostHog environment variables are missing! Make sure NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST are set in .env.local')
}


posthog.init(PH_KEY, {
    api_host: PH_HOST,
    defaults: '2025-11-30',
})

export default posthog
