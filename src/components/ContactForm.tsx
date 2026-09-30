import { useState } from "react";

// Submits via Web3Forms (static-friendly, no backend). Set PUBLIC_WEB3FORMS_KEY to enable.
// No PHI is collected (see disclaimer) so no BAA is required for this form.
// Public Web3Forms access key (safe to commit). Overridable via env.
const ACCESS_KEY = (import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined) || "45cbc7e7-14f1-4411-aa78-55e8b24d2e36";
const CONTACT_EMAIL = "info@drkaurdds.com";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [closedDay, setClosedDay] = useState(false);

  // Earliest selectable date: today (local time), formatted YYYY-MM-DD.
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.currentTarget.value;
    // Office is open Monday–Thursday. getUTCDay on a YYYY-MM-DD string avoids timezone shifts.
    const day = v ? new Date(v).getUTCDay() : -1;
    setClosedDay(day === 0 || day === 5 || day === 6);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("_hp")) return;

    // No key configured yet → fall back to opening the user's email client.
    if (!ACCESS_KEY) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nPreferred date: ${data.get("preferred_date") || "—"}\nPreferred time: ${data.get("preferred_time") || "No preference"}\n\n${data.get("message")}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      data.append("access_key", ACCESS_KEY);
      const wantsAppt = data.get("preferred_date") || data.get("preferred_time");
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
      <fieldset className="rounded-xl border border-navy/10 p-4">
        <legend className="px-1 text-sm font-medium">Preferred appointment <span className="font-normal text-slate">(optional)</span></legend>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block text-sm">Date
            <input type="date" name="preferred_date" min={today} onChange={onDateChange} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2" />
          </label>
          <label className="block text-sm">Time of day
            <select name="preferred_time" defaultValue="" className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 bg-white">
              <option value="">No preference</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </label>
        </div>
        <p className={`mt-2 text-xs ${closedDay ? "text-red-600" : "text-slate"}`}>
          {closedDay
            ? "We're closed Friday through Sunday. Please pick a Monday to Thursday date."
            : "We're open Monday to Thursday. We'll call or email to confirm a time."}
        </p>
      </fieldset>
      <label className="block text-sm">Message
        <textarea required name="message" rows={4} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2"></textarea>
      </label>
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
