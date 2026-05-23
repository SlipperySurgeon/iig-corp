const badges = [
  "Cloverleaf",
  "Mirth Connect",
  "HL7 v2.x",
  "FHIR R4",
  "Epic Bridges",
  "Cerner",
  "Windows",
  "AIX and Linux",
  "TCL",
  "Python",
  "JavaScript",
  "SQL",
  "ORM/ORU/ADT",
  "LIS Integration",
  "PACS",
  "Radiology Workflows",
  "Cardiology Workflows",
  "Directory of Services / DOS",
  "Order Catalog Implementation Guide",
];

const stats = [
  { value: "20+", label: "Years in Healthcare IT" },
  { value: "5000+", label: "Active Interfaces Managed" },
  { value: "78+", label: "Sites Supported" },
  { value: "1", label: "Point of Contact — Always" },
];

export default function Expertise() {
  return (
    <section id="expertise" className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Technical Depth</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            We Speak Your Language
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-base leading-relaxed text-steel sm:text-lg">
            No ramp-up time. No explaining what HL7 is. Just deep domain
            expertise from day one.
          </p>
        </div>

        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {badges.map((b) => (
            <li
              key={b}
              className="group rounded border border-blue-signal/30 bg-blue-signal/15 px-3.5 py-1.5 font-mono text-[13px] text-steel transition-colors hover:border-blue-signal/70 hover:text-white"
            >
              {b}
            </li>
          ))}
        </ul>

        <dl className="mt-16 grid grid-cols-2 gap-y-10 sm:gap-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="px-6 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[44px] font-bold leading-none text-white sm:text-[52px]">
                {s.value}
              </dd>
              <p className="mt-3 text-[13px] uppercase tracking-[0.12em] text-steel">
                {s.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
