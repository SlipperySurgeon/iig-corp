import Image from "next/image";
import { LINKEDIN_URL } from "@/lib/links";

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy py-12 text-steel">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <Image
            src="/IIG_Small_Logo_trans_bkg.png"
            alt="IIG monogram"
            width={36}
            height={36}
            className="h-9 w-auto opacity-80"
          />
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-steel transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="IIG on LinkedIn"
            className="text-steel transition-colors hover:text-white"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>
        <div className="mt-6 border-t border-white/10 pt-6 text-center text-[12px] text-steel">
          © {new Date().getFullYear()} Infrastructure & Integration Group, Inc. · North America
        </div>
      </div>
    </footer>
  );
}
