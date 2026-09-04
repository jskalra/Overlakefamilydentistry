import { useState } from "react";

interface NavItem { label: string; href: string; }

export default function MobileNav({ items, phoneHref, phone }: { items: readonly NavItem[]; phoneHref: string; phone: string; }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="p-2 text-navy"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-full bg-white shadow-lg ring-1 ring-navy/10 px-6 py-4 flex flex-col gap-3 z-50">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="py-1 text-navy font-medium">{item.label}</a>
          ))}
          <a href={phoneHref} className="btn btn-primary mt-2">Call {phone}</a>
        </nav>
      )}
    </div>
  );
}
