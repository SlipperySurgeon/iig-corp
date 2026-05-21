"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CALENDLY_URL } from "@/lib/links";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="IIG home">
          <Image
            src="/IIG_Logo_1_trans_bkg.png"
            alt="Infrastructure & Integration Group"
            width={160}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </a>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-blue-signal hover:bg-blue-hover text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
        >
          Schedule a Call
        </a>
      </div>
    </nav>
  );
}
