import { useEffect, useState } from "react";

// Consent gate (MHMDA / privacy). No analytics/ad pixels fire until "accept".
const KEY = "ofd-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(KEY, value);
    setShow(false);
    if (value === "accepted") {
      window.dispatchEvent(new CustomEvent("consent-granted"));
    }
  };

  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 bg-white rounded-2xl shadow-lg ring-1 ring-navy/10 p-5">
      <p className="text-sm text-navy">
        We use cookies for analytics to improve your experience. No non-essential trackers
        run until you accept. See our{" "}
        <a href="/privacy-policy" className="underline">Privacy Policy</a>.
      </p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => decide("accepted")} className="btn btn-primary text-sm">Accept</button>
        <button onClick={() => decide("declined")} className="btn btn-secondary text-sm">Decline</button>
      </div>
    </div>
  );
}
