import { useState } from "react";
import { site } from "../data/site";

// Submits via Web3Forms (static-friendly, no backend). Set PUBLIC_WEB3FORMS_KEY to enable.
// No PHI is collected (see disclaimer) so no BAA is required for this form.
// Public Web3Forms access key (safe to commit). Overridable via env.
const ACCESS_KEY = (import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined) || "45cbc7e7-14f1-4411-aa78-55e8b24d2e36";
const CONTACT_EMAIL = "info@drkaurdds.com";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [flexible, setFlexible] = useState(true);
  const [d1, setD1] = useState("");
  const [t1, setT1] = useState("");
  const [showSecond, setShowSecond] = useState(false);
  const [d2, setD2] = useState("");
  const [t2, setT2] = useState("");

  // Earliest selectable date: today (local time), formatted YYYY-MM-DD.
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  // Office is open Monday–Thursday. getUTCDay on a YYYY-MM-DD string avoids timezone shifts.
  const isClosed = (v: string) => { const d = v ? new Date(v).getUTCDay() : -1; return d === 0 || d === 5 || d === 6; };
  const dates = [d1, showSecond ? d2 : ""].filter(Boolean);
  const dateState = dates.some(isClosed) ? "closed" : dates.length ? "open" : "none";
  const closedDay = dateState === "closed";

  // Picking a specific date or time means the patient isn't "flexible" any more.
  const pick = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    set(e.currentTarget.value);
    if (e.currentTarget.value) setFlexible(false);
  };
  function onFlexible(e: React.ChangeEvent<HTMLInputElement>) {
    const on = e.currentTarget.checked;
    setFlexible(on);
    if (on) { setD1(""); setT1(""); setD2(""); setT2(""); setShowSecond(false); }
  }
  function resetPrefs() { setFlexible(true); setD1(""); setT1(""); setD2(""); setT2(""); setShowSecond(false); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("_hp")) return;

    // No key configured yet → fall back to opening the user's email client.
    if (!ACCESS_KEY) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nFlexible: ${flexible ? "Yes" : "No"}\n1st choice: ${data.get("preferred_date") || "—"} ${data.get("preferred_time") || ""}\n2nd choice: ${data.get("preferred_date_2") || "—"} ${data.get("preferred_time_2") || ""}\n\n${data.get("message")}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      data.append("access_key", ACCESS_KEY);
      data.set("flexible", flexible ? "Yes, flexible on day and time" : "No");
      const wantsAppt = ["preferred_date", "preferred_time", "preferred_date_2", "preferred_time_2"].some((k) => data.get(k));
      data.append("subject", wantsAppt ? "Appointment request from Overlake Family Dentistry website" : "New inquiry from Overlake Family Dentistry website");
      data.append("from_name", "Overlake Family Dentistry Website");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
        resetPrefs();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please call us.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please call us at (425) 883-3040.");
    }
  }

  if (status === "success") {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold">Thank you!</h2>
        <p className="mt-2 text-slate text-sm">
          We received your message and will get back to you soon. For anything urgent,
          please call <a href="tel:+14258833040" className="underline">(425) 883-3040</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="card space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Send us a message / Choose an appointment time</h2>
      <p className="text-xs text-slate">
        Please do not include personal health information — call for anything medical.
      </p>
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="block text-sm">Name
        <input required name="name" className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2" />
      </label>
      <label className="block text-sm">Email
        <input required type="email" name="email" className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2" />
      </label>
      <label className="block text-sm">Phone
        <input name="phone" className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2" />
      </label>
      <label className="block text-sm">Message
        <textarea required name="message" rows={4} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2"></textarea>
      </label>
      <fieldset className="rounded-xl border border-navy/10 p-4 space-y-3">
        <legend className="px-1 text-sm font-medium">Preferred appointment <span className="font-normal text-slate">(optional)</span></legend>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="flexible" value="Yes" checked={flexible} onChange={onFlexible} className="h-4 w-4 accent-navy" />
          I'm flexible on day and time
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block text-sm">{showSecond ? "First choice date" : "Date"}
            <input type="date" name="preferred_date" min={today} value={d1} onChange={pick(setD1)} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2" />
          </label>
          <label className="block text-sm">Time of day
            <select name="preferred_time" value={t1} onChange={pick(setT1)} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 bg-white">
              <option value="">No preference</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </label>
        </div>
        {showSecond ? (
          <div>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block text-sm">Second choice date
                <input type="date" name="preferred_date_2" min={today} value={d2} onChange={pick(setD2)} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2" />
              </label>
              <label className="block text-sm">Time of day
                <select name="preferred_time_2" value={t2} onChange={pick(setT2)} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 bg-white">
                  <option value="">No preference</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                </select>
              </label>
            </div>
            <button type="button" onClick={() => { setShowSecond(false); setD2(""); setT2(""); }} className="mt-2 text-xs text-slate underline hover:text-navy">
              Remove second choice
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setShowSecond(true)} className="text-sm font-medium text-slate hover:text-navy">
            + Add another option
          </button>
        )}
        <p className={`text-xs ${closedDay ? "text-red-600" : "text-slate"}`}>
          {closedDay ? (
            <>
              We are open Mon - Thursday. For dental emergencies, please call{" "}
              <a href={site.emergencyPhoneHref} className="font-semibold underline">{site.emergencyPhone}</a>.
            </>
          ) : dateState === "open" ? (
            "Thanks! We'll call or email to confirm the time."
          ) : (
            "We're open Monday to Thursday. We'll call or email to confirm the time."
          )}
        </p>
      </fieldset>
      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      {!ACCESS_KEY && (
        <p className="text-xs text-slate">
          Note: form delivery isn’t connected yet — the Send button will open your email app
          until a form key is added.
        </p>
      )}
    </form>
  );
}
