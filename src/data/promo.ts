// Holiday special (New Patient Special + referral gift). One switch for every site mention.
// Mentions are rendered only while the offer is live at build time, and a small script in
// BaseLayout hides [data-promo] elements once `endsAt` passes, so nothing needs a manual
// cleanup on Feb 1 even if the site isn't rebuilt.
export const holidayPromo = {
  href: "/holiday-special",
  endsAt: "2027-02-01T08:00:00Z", // end of Jan 31, 2027, Pacific time
  label: "Holiday Special",
  short: "New patients get Philips Zoom! whitening, a $400 value, and so do patients who refer a friend.",
  shortMobile: "Free Philips Zoom! whitening for new patients and their referrers.",
};

export const promoActive = (now = new Date()) => now < new Date(holidayPromo.endsAt);
