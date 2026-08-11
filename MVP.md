# Civic Sidekick — MVP

## Vision

Give every American a simple, ad-free, non-partisan way to see who represents them and what they can do about it — all from their phone.

## MVP Scope

The MVP delivers the core loop: **look up who represents you → see who's running → register to vote → never miss a deadline.**

### Core Features

1. **Official Lookup**
   - Enter an address or zip code to retrieve elected officials.
   - Results grouped by level: Federal, State, County, Local.
   - Each official shows name, title, party, contact info, website, and a plain-language office description.
   - Results cached locally (24h) for fast repeat lookups.
   - Pull-to-refresh to get the latest data on demand.

2. **Who's Running**
   - Each official card surfaces known candidates for that seat in the next election.
   - Candidates show name, party badge, incumbent tag, and a campaign website or search link.

3. **Election Deadlines**
   - State-specific upcoming deadlines: registration, early voting, election day, absentee ballots.
   - One-tap "Add to Calendar" via Google Calendar template links (works cross-platform, including Android).
   - No manual calendar OAuth — platform-agnostic webcal/Google links only.

4. **Voter Registration**
   - Direct link to the correct state registration portal from the officials results page.

5. **Glossary**
   - Searchable directory of government offices with responsibilities and hierarchy.

6. **Privacy & Polish**
   - No ads, no tracking.
   - Local-only data caching; users can clear cache in Settings.
   - Friendly loading screens with transparent messaging about live-data latency.
   - Auto-dismissing error alerts.
   - Accessible, touch-friendly mobile UI with safe-area padding.

### Out of MVP Scope (future phases)

- Account-based saved addresses across devices
- Push notifications for upcoming deadlines
- Bill / legislation tracking
- In-app candidate issue profiles
- Multi-language support

## Tech Stack

- React + Vite + Tailwind CSS (mobile-first)
- Base44 platform (auth, hosting, data integration)
- InvokeLLM (Gemini 3 Flash) for live civic data lookups with web search context
- lucide-react icons

## Success Metrics

- A user can go from landing → entered address → viewing their officials in under 30 seconds (after first load).
- A user can see who is running for a given seat without leaving the officials view.
- A user can reach their state's voter registration page in one tap.
- A user can add an election deadline to their calendar without installing anything or authorizing an OAuth flow.

## Links

- **Live app:** [civicsidekick.app](https://civicsidekick.app)
- **Feedback:** [civicsidekick.app/feedback](https://civicsidekick.app/feedback)