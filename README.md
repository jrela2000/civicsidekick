# Civic Sidekick

**Empowering citizens with transparent access to their elected representatives and essential voter resources.**

🔗 **Live site:** [civicsidekick.app](https://civicsidekick.app)

Civic Sidekick is a mobile-first, non-partisan civic engagement app that helps everyday Americans quickly find out who represents them at every level of government — and what they can do about it. Enter an address or zip code and instantly see your federal, state, county, and local officials, discover who's running for each office, check voter registration status, and keep track of key election deadlines.

## What it does

- **Find Your Officials** — Search by address or zip code to see your elected representatives organized by level (Federal, State, County, Local), complete with contact info, websites, and office descriptions.
- **Who's Running?** — Each official card surfaces the known candidates running for that seat in the next election, so voters can see who they might be voting for soon.
- **Election Deadlines** — Look up upcoming voter registration, early voting, and election-day deadlines for your state and add them to your calendar with one tap.
- **Voter Registration** — Get the right registration link for your state directly from the results page.
- **Glossary** — A plain-language guide to what each government office actually does.
- **Privacy-First** — No ads, no tracking, no data harvesting. Your address lookups are cached locally for speed and convenience only.

## Built with

- **React + Vite + Tailwind CSS** — fast, responsive mobile-first UI
- **Base44 platform** — backend-as-a-service (auth, hosting, live data integration)
- **Google Gemini (via InvokeLLM)** — live civic data lookups with web search context
- **lucide-react** — icon system

## Local development

**Prerequisites:**

1. Clone the repository using the project's Git URL
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create a `.env.local` file and set the right environment variables:

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
```

5. Run the app: `npm run dev`

**Publish your changes:** Open [Base44.com](https://Base44.com) and click on Publish.

## Get involved

Have feedback, found a data error, or have a suggestion? Visit [civicsidekick.app/feedback](https://civicsidekick.app/feedback) and let us know.

---

Civic Sidekick is built and maintained on the Base44 platform.