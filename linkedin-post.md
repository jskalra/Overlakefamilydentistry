I vibe coded a production-ready website in a weekend. The spec mattered more than the code.

The site's live: https://overlakefamilydentistry.com

Most of Saturday morning went into a spec file, not code. I wrote out the pages, the content structure, how the brand should read, the redirect map from the practice's old domain, and what "done" meant for each phase. It felt slow while I was doing it. But almost every decision later pointed back to that file, so I never had to re-argue scope with myself halfway through. And when I did drift, it was always on a page I'd been vague about in the spec — the gaps in the doc showed up as gaps in the site.

For the stack I went static instead of the obvious choice, WordPress. A dental practice site is read far more than it's edited — a few content updates a year, no logins, no accounts, no database. WordPress would have meant a server to patch, a plugin surface to keep secure, and slower pages, all to solve problems this site doesn't have. Static drops that whole category of work: the pages are built once at deploy, served as plain files, and there's nothing running to break or get hacked. So I used Astro with Tailwind, React only for the two interactive pieces (mobile nav and contact form), content in MDX, on Vercel so a git push ships it. It loads fast, costs almost nothing to run, and I can hand it off without writing a manual.

The one thing static can't do by itself is take a form submission — there's no backend to catch it. Instead of standing up a server for one form, I sent it through Web3Forms, which posts to their API, emails the practice inbox, and falls back to a plain mail link if the key ever goes missing. That's one dependency instead of a server I'd have to babysit.

The site ended up around 48 pages — service pages, location pages for the surrounding suburbs, the usual about/contact/new-patient set, plus the schema and sitemap search engines want. The service detail pages started as thin drafts; I filled them in afterward and flagged that the clinical claims still need a dentist to sign off before launch. I wasn't going to let an AI publish medical copy nobody reviewed.

I leaned on QA earlier than I usually do. The content schema fails the build if an SEO field is missing, so I couldn't ship a page with a broken title by accident. I ran Lighthouse, link checks, and a static audit as I went instead of saving them for the end. Analytics stays off until a visitor opts in through the consent banner. None of it is glamorous, but it's why there were few surprises after deploy.

What cost me time was the stuff I didn't plan for. The apex domain redirects to www, and a deploy looked stale for a while until I realized I was checking the wrong URL. Because analytics only load after consent, Google's own tag checker kept reporting no data while real visits tracked fine, and I nearly went debugging something that wasn't broken. The contact form uses preventDefault, so I stopped trusting that events fired and watched them go through before I believed it.

Google Ads was the most back-and-forth. I started with GA4 directly, then switched to Google Tag Manager once ads were in the picture, because GTM lets me add and change tags without redeploying the site. Conversion tracking took a few passes: push the events I care about (call clicks, form submits) into the dataLayer, send them to GA4, mark them as key events, then import them into Ads. Google's roughly 24-hour lag between some of those steps set the pace more than I did. I made form submits the signal that drives bidding and left phone clicks as something I only watch — a click isn't a booked appointment, and I didn't want to optimize toward the softer number.

If one thing made the weekend work, it was the hour I almost skipped: writing the spec before touching code.

The code's in a GitHub repo. If you're building something similar, ask me about the parts that broke — those were the useful lessons.
