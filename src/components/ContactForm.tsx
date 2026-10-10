import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";

// Submits via Web3Forms (static-friendly, no backend). Set PUBLIC_WEB3FORMS_KEY to enable.
// No PHI is collected (see disclaimer) so no BAA is required for this form.
// Public Web3Forms access key (safe to commit). Overridable via env.
const ACCESS_KEY = (import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined) || "45cbc7e7-14f1-4411-aa78-55e8b24d2e36";
const CONTACT_EMAIL = "info@drkaurdds.com";
// hCaptcha via Web3Forms: OFF by default (visible checkbox adds friction for patients;
// the honeypot, timing, and link checks below handle ordinary bots). To turn it back on,
// set PUBLIC_HCAPTCHA_SITE_KEY to Web3Forms' shared free-plan key
// 50b2fe65-b00b-4b9e-ad62-3ba471098be2 AND select hCaptcha in the Web3Forms dashboard.
const HCAPTCHA_KEY = (import.meta.env.PUBLIC_HCAPTCHA_SITE_KEY as string | undefined) || "";
// Spam heuristics: bots submit instantly and almost always include a link.
const MIN_FILL_SECONDS = 3;
const LINK_RE = /(https?:\/\/|www\.|\[url|<a\s|\b[a-z0-9-]+\.(?:com|net|org|ru|cn|info|biz|xyz|top|shop|club|online|site)\b)/i;

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
  const loadedAt = useRef(Date.now());

  // Load the hCaptcha script once, only when a site key is configured.
  useEffect(() => {
    if (!HCAPTCHA_KEY || document.getElementById("hcaptcha-script")) return;
    const el = document.createElement("script");
    el.id = "hcaptcha-script";
    // recaptchacompat=off: otherwise hCaptcha also adds g-recaptcha-response, which
    // Web3Forms treats as reCAPTCHA (a Pro feature) and rejects the submission.
    el.src = "https://js.hcaptcha.com/1/api.js?recaptchacompat=off";
    el.async = true;
    el.defer = true;
    document.head.appendChild(el);
  }, []);

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

    // Honeypot: only a bot fills a hidden field. Fail silently so it learns nothing.
    if (data.get("_hp")) { setStatus("success"); return; }

    // Nobody types a name, email, and message in under a few seconds.
    if ((Date.now() - loadedAt.current) / 1000 < MIN_FILL_SECONDS) { setStatus("success"); return; }

    // Patients rarely paste links; spam almost always does. Recoverable, so say so.
    // Strip email addresses first, since a patient may type their own in the message.
    const deEmail = (t: string) => t.replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, " ");
    const message = deEmail(String(data.get("message") || ""));
    if (LINK_RE.test(message) || LINK_RE.test(deEmail(String(data.get("name") || "")))) {
      setStatus("error");
      setError(`Please remove any web links from your message, or call us at ${site.phone}.`);
      return;
    }

    // No key configured yet → fall back to opening the user's email client.
    if (!ACCESS_KEY) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nFlexible: ${flexible ? "Yes" : "No"}\n1st choice: ${data.get("preferred_date") || "—"} ${data.get("preferred_time") || ""}\n2nd choice: ${data.get("preferred_date_2") || "—"} ${data.get("preferred_time_2") || ""}\n\n${data.get("message")}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(body)}`;
      return;
    }

    // hCaptcha injects h-captcha-response into the form once solved.
    if (HCAPTCHA_KEY && !data.get("h-captcha-response")) {
      setStatus("error");
      setError("Please check the \u201cI am human\u201d box below, then send again.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      data.delete("g-recaptcha-response");
      data.append("access_key", ACCESS_KEY);
      data.set("flexible", flexible ? "Yes, flexible on day and time" : "No");
      const wantsAppt = ["preferred_date", "preferred_time", "preferred_date_2", "preferred_time_2"].some((k) => data.get(k));
      data.append("subject", wantsAppt ? "Appointment request from Overlake Family Dentistry website" : "New inquiry from Overlake Family Dentistry website");
      data.append("from_name", "Overlake Family Dentistry Website");
      data.append("botcheck", "");
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
        loadedAt.current = Date.now();
        (window as unknown as { hcaptcha?: { reset: () => void } }).hcaptcha?.reset();
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
      <h2 className="text-xl font-semibold">Request an Appointment / Send us a message</h2>
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
        <div className={`grid sm:grid-cols-2 gap-3 ${flexible ? "text-navy/40" : ""}`}>
          <label className="block text-sm">{showSecond ? "First choice date" : "Date"}
            <input type="date" name="preferred_date" min={today} value={d1} onChange={pick(setD1)} disabled={flexible} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 disabled:bg-navy/5 disabled:text-navy/40 disabled:cursor-not-allowed" />
          </label>
          <label className="block text-sm">Time of day
            <select name="preferred_time" value={t1} onChange={pick(setT1)} disabled={flexible} className="mt-1 w-full rounded-lg border border-navy/15 px-3 py-2 bg-white disabled:bg-navy/5 disabled:text-navy/40 disabled:cursor-not-allowed">
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
          <button type="button" onClick={() => setShowSecond(true)} disabled={flexible} className="text-sm font-medium text-slate hover:text-navy disabled:text-navy/30 disabled:cursor-not-allowed disabled:hover:text-navy/30">
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
      {HCAPTCHA_KEY && <div className="h-captcha" data-captcha="true" data-sitekey={HCAPTCHA_KEY} />}
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
