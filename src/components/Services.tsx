import {
  Network,
  GitBranch,
  Link as LinkIcon,
  FlaskConical,
  Activity,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Cloverleaf Integration Engine",
    Icon: Network,
    body: "Full lifecycle Cloverleaf development and administration. Thread design, TPS procs, site management, monitoring, and multi-site fleet operations across Windows, AIX and Linux environments.",
  },
  {
    title: "HL7 & FHIR Interoperability",
    Icon: GitBranch,
    body: "ORU, ORM, ADT — every message type, every edge case. From v2.x to FHIR R4, your data gets where it needs to go in the format your trading partners require.",
  },
  {
    title: "Epic Bridges",
    Icon: LinkIcon,
    body: "Certified Epic Bridges interface development and troubleshooting. We know the quirks, the workarounds, and the edge cases that only come from years of hands-on implementation.",
  },
  {
    title: "LIS Integration",
    Icon: FlaskConical,
    body: "Deep experience connecting laboratory information systems to hospitals, EHRs, reference clients, and billing platforms. We understand your lab's data model and your clients' expectations.",
  },
  {
    title: "Interface Monitoring & Support",
    Icon: Activity,
    body: "Proactive monitoring, alerting, and rapid response. When a critical interface goes down at 2am, you need someone who answers.",
  },
  {
    title: "Legacy System Modernization",
    Icon: RefreshCw,
    body: "Aging integration infrastructure keeping you up at night? We assess, document, and modernize complex interface environments without disrupting live operations.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-offwhite py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What We Do</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Integration That Just Works
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-gray-brand sm:text-lg">
            We specialize in the complex, mission-critical interface work that
            general IT consultants can&apos;t handle.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, body, Icon }) => (
            <article
              key={title}
              className="group rounded-lg border border-iig-border bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,25,43,0.12)]"
            >
              <Icon
                className="text-blue-signal"
                size={28}
                strokeWidth={1.75}
              />
              <h3 className="mt-5 font-display text-[22px] font-semibold leading-snug text-navy">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-gray-brand">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
