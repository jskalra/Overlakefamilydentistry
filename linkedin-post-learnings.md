I vibe coded a production-ready website in a weekend. A few things I'm taking away from it.

The site's live: https://overlakefamilydentistry.com

**The spec was the real work.** Most of Saturday morning went into a spec file — pages, content structure, brand voice, the redirect map from the old domain, what "done" meant per phase. It felt slow. But almost every later decision pointed back to it, and the only times I drifted were on pages I'd been vague about in the doc. The gaps in the spec became gaps in the site. If I do this again, I spend even longer here.

**Pick the boring stack on purpose.** I went static instead of WordPress. A practice site is read far more than edited — no logins, no accounts, no database — so WordPress would've meant a server to patch and a plugin surface to secure, for problems this site doesn't have. Astro, Tailwind, React for the two interactive bits, MDX for content, Vercel for deploys. It loads fast, costs almost nothing to run, and I can hand it off without writing a manual.

**Don't build infrastructure you can rent.** Static can't take a form submission on its own. Instead of standing up a server for one form, I ran it through Web3Forms — posts to their API, emails the inbox, falls back to a mail link if the key goes missing. One dependency beat one more thing to babysit.

**QA early is cheaper than QA late.** The content schema fails the build if an SEO field is missing, so a broken page title can't ship by accident. I ran Lighthouse, link checks, and a static audit as I went. Analytics stays off until a visitor consents. None of it is glamorous, but it's why there were few surprises after deploy.

**The time sinks were never the code.** The apex domain redirects to www, so a deploy looked stale until I noticed I was checking the wrong URL. Because analytics only load after consent, Google's tag checker reported no data while real visits tracked fine — I almost debugged something that wasn't broken. And since the contact form uses preventDefault, I watched the events fire before I trusted them instead of assuming.

**Conversion tracking is iterative, and Google sets the clock.** I started with GA4 directly, then moved to Tag Manager once ads were in the picture, so I can change tags without redeploying. Tracking took a few passes: events into the dataLayer, into GA4, marked as key events, imported into Ads. The ~24-hour lag between steps paced the work more than I did. I made form submits the signal that drives bidding and kept phone clicks as something I only watch — a click isn't a booked appointment.

**Don't let the AI ship what it shouldn't.** The service pages started as thin drafts. I filled them in, but flagged that the clinical claims still need a dentist to sign off. AI can write the site; it doesn't get to publish unreviewed medical copy.

The code's in a GitHub repo. If you're building something similar, ask me about the parts that broke — those were the useful lessons.
