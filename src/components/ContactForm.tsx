import { useState } from "react";

// Submits via Web3Forms (static-friendly, no backend). Set PUBLIC_WEB3FORMS_KEY to enable.
// No PHI is collected (see disclaimer) so no BAA is required for this form.
const ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;
const CONTACT_EMAIL = "info@drbrianbrooks.com";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get("_hp")) return;

    // No key configured yet → fall back to opening the user's email client.
    if (!ACCESS_KEY) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      data.append("access_key", ACCESS_KEY);
      data.append("subject", "New inquiry from Overlake Family Dentistry website");
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
      <h2 className="text-xl font-semibold">Send us a message</h2>
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
