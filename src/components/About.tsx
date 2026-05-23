import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative bg-white py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">About IIG</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Small by Design. Expert by Necessity.
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.7] text-gray-brand">
            <p>
              Infrastructure &amp; Integration Group, Inc. is a US-based
              healthcare IT integration firm built on a simple premise:
              specialty laboratories deserve the same caliber of integration
              expertise as large hospital systems — without the enterprise
              price tag or the bureaucracy.
            </p>
            <p>
              We are one of a small number of independent consultants with deep, hands-on integration
              expertise at scale. Currently supporting a national specialty
              reference laboratory with 45+ active interfaces across a diverse
              trading partner network including Epic and Cerner health systems.
            </p>
            <p>
              Our clients get direct access to senior-level integration
              engineering on every engagement — no junior staff, no account
              managers, no ticket queues. If your lab is growing its trading
              partner network, modernizing a legacy integration environment, or
              dealing with a critical interface issue nobody else has been able
              to solve — this is the right call.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded bg-offwhite px-3.5 py-1.5 text-[13px] text-gray-brand">
              📍 USA
            </span>
            <span className="rounded bg-offwhite px-3.5 py-1.5 text-[13px] text-gray-brand">
              🏢 S-Corporation · Insured
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden h-full min-h-[320px] items-center justify-center lg:flex"
        >
          <Image
            src="/IIG_Small_Logo_trans_bkg.png"
            alt=""
            width={480}
            height={480}
            className="h-auto w-[80%] max-w-[420px] opacity-[0.06]"
            style={{ filter: "brightness(0) saturate(100%) invert(8%) sepia(33%) saturate(2300%) hue-rotate(196deg)" }}
          />
        </div>
      </div>
    </section>
  );
}
