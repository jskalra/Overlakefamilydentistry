// Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from site data and content
// collections, so AI assistants get an accurate, current summary of the practice.
import { getCollection } from "astro:content";
import { site, serviceAreas } from "../data/site";

const url = (path: string) => new URL(path, site.domain).href;

function facts(): string {
  const a = site.address;
  const hours = site.hours.map((h) => `${h.day}: ${h.close ? `${h.open}–${h.close}` : h.open}`).join("; ");
  return [
    `- Address: ${a.street}, ${a.city}, ${a.state} ${a.zip} (Forest Office Park, at 148th Ave NE and NE Bel-Red Rd). Free dedicated parking.`,
    `- Phone: ${site.phone}. Dental emergencies when the front desk can't be reached: call or text ${site.emergencyPhone}.`,
    `- Email: ${site.email}`,
    `- Hours: ${hours}`,
    `- Dentist: Dr. Ravneet Kaur, DDS (Columbia University College of Dental Medicine). ${site.heritage}.`,
    `- Patients: children (first visit around age 1) through seniors.`,
    `- Insurance: accepts most dental insurance plans and files claims on the patient's behalf. Call to confirm coverage.`,
    `- Areas served: ${serviceAreas.map((s) => s.label).join(", ")}, WA.`,
    `- Approach: conservative, tooth-preserving care. Least-invasive option first, honest second opinions, no pressure.`,
    `- Book: ${url("/contact")} or call ${site.phone}.`,
  ].join("\n");
}

export async function buildLlmsTxt(full = false): Promise<string> {
  const services = (await getCollection("services")).sort((a, b) => a.data.order - b.data.order);
  const cats = services.filter((s) => s.data.isCategory).sort((a, b) => a.data.heading.localeCompare(b.data.heading));
  const locations = await getCollection("locations");
  const posts = (await getCollection("blog")).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const out: string[] = [
    `# ${site.name}`,
    "",
    `> Family dental practice in Bellevue, WA, offering ${site.tagline.toLowerCase()} for more than 30 years. General, cosmetic, restorative, orthodontic (Invisalign), pediatric, and periodontal care under one roof.`,
    "",
    "## Key facts",
    "",
    facts(),
    "",
    "## Main pages",
    "",
    `- [Home](${url("/")}): Overview, services, first-visit steps, and FAQ`,
    `- [About](${url("/about")}): The practice's history, philosophy, team, and office`,
    `- [Doctors](${url("/doctors")}): Dentist bios and credentials`,
    `- [Team](${url("/team")}): Front office, hygienists, and assistants`,
    `- [New Patients](${url("/new-patients")}): What to expect, forms, and insurance`,
    `- [Contact & Hours](${url("/contact")}): Address, hours, directions, and appointment requests`,
    `- [Reviews](${url("/reviews")}): Patient reviews`,
    `- [FAQ](${url("/faq")}): Every patient question answered on the site, grouped by topic`,
    "",
    "## Services",
    "",
  ];
  for (const c of cats) {
    out.push(`- [${c.data.heading}](${url(`/services/${c.id}`)}): ${c.data.summary}`);
    for (const d of services.filter((s) => !s.data.isCategory && s.data.categorySlug === c.data.categorySlug)) {
      out.push(`  - [${d.data.heading}](${url(`/services/${d.id}`)}): ${d.data.summary}`);
    }
  }
  out.push("", "## Locations served", "");
  for (const l of locations) out.push(`- [${l.data.heading}](${url(`/dentist/${l.id}`)}): ${l.data.summary}`);
  out.push("", "## Blog", "");
  for (const p of posts) out.push(`- [${p.data.heading}](${url(`/blog/${p.id}`)}): ${p.data.excerpt}`);

  if (!full) {
    out.push("", "## Optional", "", `- [Full content](${url("/llms-full.txt")}): Complete text of every service page, location page, and blog post`);
    return out.join("\n") + "\n";
  }

  const section = (title: string, link: string, body?: string, faq: { q: string; a: string }[] = []) => {
    out.push("", "---", "", `## ${title}`, "", `Source: ${link}`, "", (body ?? "").trim());
    if (faq.length) { out.push("", "### FAQ", ""); for (const f of faq) out.push(`**${f.q}**`, f.a, ""); }
  };
  for (const s of services) section(s.data.heading, url(`/services/${s.id}`), s.body, s.data.faq);
  for (const l of locations) section(l.data.heading, url(`/dentist/${l.id}`), l.body, l.data.faq);
  for (const p of posts) section(p.data.heading, url(`/blog/${p.id}`), p.body);
  return out.join("\n") + "\n";
}
