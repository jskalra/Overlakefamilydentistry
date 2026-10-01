// Page-level FAQs. Each page renders its own list; /faq aggregates these plus the
// FAQs in content collections (services, locations, blog posts).
import { site } from "./site";

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "Are you accepting new patients?",
    a: `Yes. We welcome new patients of all ages, including whole families who want to book together. Call ${site.phone} or request an appointment online, and our front desk will find a time that suits you and tell you what to bring to your first visit.`,
  },
  {
    q: "What ages do you see?",
    a: "We care for patients from toddlers to seniors. Parents can book their own cleanings on the same day as their kids. Seeing the whole family lets us spot patterns, like a tendency toward cavities or grinding, and plan care that fits each person's age and needs.",
  },
  {
    q: "Do you take my insurance?",
    a: `We accept most dental insurance plans, and we file claims on your behalf. Call us at ${site.phone} with your plan details, and our front desk will confirm your coverage and explain what to expect before your visit, so you aren't surprised by a bill later.`,
  },
  {
    q: "What should I do in a dental emergency?",
    a: `Call our office at ${site.phone} first and tell us what happened, so we can help you decide how soon you need to be seen. If you can't reach the front desk, call or text our emergency line at ${site.emergencyPhone}. If you have severe swelling or trouble breathing, go to the nearest emergency room.`,
  },
  {
    q: "What does \"conservative dentistry\" mean?",
    a: "It means we try the least invasive treatment that will work. We'd rather watch a tiny spot or place a small filling than drill more tooth than needed. Your natural teeth are worth keeping, so we save them whenever we reasonably can.",
  },
  {
    q: "How often should I get a checkup?",
    a: "Most people do well with an exam and cleaning every six months. Some patients, such as those with gum disease, may need visits more often. Your dentist will suggest a schedule based on your mouth, not a one-size-fits-all rule.",
  },
  {
    q: "Where are you, and is parking easy?",
    a: "We're in Forest Office Park at 148th Ave NE and NE Bel-Red Rd. in Bellevue (Bldg. F, Ste. 101). Free dedicated parking sits right outside the building. The office is a short drive from Redmond, Kirkland, and Sammamish.",
  },
  {
    q: "Can I come in for a second opinion?",
    a: "Yes. If another office has suggested major work and you're not sure, bring your X-rays or treatment plan. We'll take an honest look and tell you what we'd do. Sometimes that's the same plan, and sometimes a simpler one will work.",
  },
  {
    q: "Do you treat gum disease?",
    a: "Yes. Early gum disease often shows up as red, puffy gums that bleed when you brush. We check your gums at every exam. If you need more than a regular cleaning, we offer a deep cleaning called scaling and root planing, which clears buildup from below the gumline.",
  },
  {
    q: "I get nervous at the dentist. Can you help?",
    a: "You are not alone, and there is nothing to be embarrassed about. Tell us what worries you, and we'll go at your pace, explain each step before we do it, and stop whenever you raise a hand. Our team has worked together for years and keeps the mood calm.",
  },
  {
    q: "Can you get my records from my last dentist?",
    a: "Yes. Give us your previous dentist's name when you book, and we'll request your records and any recent X-rays. If your X-rays are recent enough, we can often use them instead of taking new ones. It saves you time and keeps your history in one place.",
  },
];

export const aboutFaqs: Faq[] = [
  {
    q: "Is this the same practice as Dr. Brooks'?",
    a: "Yes. Overlake Family Dentistry was formerly known as the practice of Dr. Brian Brooks. Dr. Ravneet Kaur now leads the practice. The office, phone number, team, and way of caring for patients all stayed the same. Only the name on the door changed.",
  },
  {
    q: "Are my records and X-rays still here?",
    a: "Yes. Your charts, X-rays, and treatment history stayed with the practice. Dr. Kaur can review them before your next visit, so you won't need to start over. If you ever need copies sent to another office or a specialist, call us and we'll take care of it.",
  },
  {
    q: "Is the team the same?",
    a: "Yes. Kris, Kristie, Marta, Ana, and Jeannie have all stayed on. Many of them have worked with our patients for a long time, and they know the families who come here. You'll hear the same voices when you call and see the same faces in the chair.",
  },
  {
    q: "Are you taking new patients?",
    a: `Yes. We welcome new patients of all ages, from toddlers to seniors. Call us at ${site.phone} to book a first visit. We'll ask a few questions about your dental history and any concerns, then find a time that fits your week.`,
  },
  {
    q: "What does \"conservative\" dentistry mean?",
    a: "It means we try to keep as much of your natural tooth as we can. We recommend treatment only when you need it, and we choose the smallest fix that will last. Sometimes the right call is to watch a spot and check it again in six months.",
  },
  {
    q: "Do you see children?",
    a: "Yes. We see kids from their first visit, usually around the first birthday or when the first teeth come in. Early visits are short and gentle. They help your child get used to the chair and let us catch small problems before they become big ones.",
  },
  {
    q: "What if I'm nervous about the dentist?",
    a: "Tell us. Many of our patients feel the same way. We'll explain each step before we do it, go at your pace, and stop whenever you raise a hand. You can ask to take a break at any time. Nobody here will judge you for how long it has been.",
  },
  {
    q: "How do I book an appointment?",
    a: `Call our front office at ${site.phone}. Kris and Jeannie can find a time, answer questions about your first visit, and help you get your records sent over if you're coming from another office. We're open Monday through Thursday.`,
  },
];

export const servicesFaqs: Faq[] = [
  {
    q: "Do you offer dental implants?",
    a: "Yes. Implants are part of our restorative care. We start with an exam and imaging to check your bone and gums, then plan the implant and the crown that goes on top. Healing usually takes a few months between steps. If a bridge or partial would serve you better, we'll say so.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: `Call ${site.phone} during office hours and we'll fit you in as soon as we can. If you can't reach the front desk, call or text ${site.emergencyPhone}. For a knocked-out tooth, keep it moist in milk and come in right away. For facial swelling with fever or trouble breathing, go to an emergency room.`,
  },
  {
    q: "Is Invisalign a good choice for teenagers?",
    a: "It can be, if your teen will wear the trays 20 to 22 hours a day. Teen aligners have small indicators that fade with wear, so you can see whether they're being used. Many teens like that they can remove them for sports and instruments. We'll check whether their teeth and habits make it a good fit.",
  },
  {
    q: "At what age should my child first see a dentist?",
    a: "By their first birthday, or within six months of the first tooth. The first visit is mostly a quick look and a chance for parents to ask about brushing, teething, and diet. Starting early means small problems get caught, and kids get comfortable here before they ever need a filling.",
  },
  {
    q: "Is professional teeth whitening safe?",
    a: "When it's used as directed, yes. We examine your teeth and gums first, since cavities or exposed roots can make whitening uncomfortable. Some people feel short-lived sensitivity to cold, which usually fades within a few days. Whitening won't change the color of crowns, veneers, or fillings, so we'll plan around those.",
  },
  {
    q: "What's the difference between a regular cleaning and a deep cleaning?",
    a: "A regular cleaning removes plaque and tartar above and just below the gumline. A deep cleaning, called scaling and root planing, goes further below the gums to clean and smooth the roots. We suggest it only when gum measurements and X-rays show gum disease. We numb the area, and it often takes one or two visits.",
  },
  {
    q: "How long does it take to get a crown?",
    a: "Most crowns take two visits. At the first, we shape the tooth, take an impression, and place a temporary crown. At the second, once the lab has made it, we fit and cement the permanent one. Before any of that, we check whether a filling or onlay could do the job and save more of your tooth.",
  },
  {
    q: "Can I come in for a second opinion?",
    a: "Yes. Bring your X-rays and treatment plan if you have them, or we can take new ones. Dr. Kaur will examine you, explain what she sees, and tell you whether she agrees. Sometimes she does. Sometimes she thinks a smaller treatment, or waiting and watching, makes more sense.",
  },
];
