# IIG Website — Claude Code Implementation Spec
## Infrastructure & Integration Group, Inc.
### iig-corp.com · dustin@iig-corp.com · Vercel Deployment

---

## Project Overview

Build a single-page Next.js marketing site for IIG (Infrastructure & Integration Group), a healthcare IT integration consultancy targeting IT Directors and LIS Managers at specialty clinical laboratories. The site must pass the "are these people real and should I call them" test within 10 seconds.

**Tone:** Trustworthy, technically expert, direct. Refined and authoritative — not flashy.
**Primary Goal:** Get the visitor to schedule a call or submit a contact form.
**Aesthetic Direction:** Luxury/refined dark — think premium B2B SaaS meets healthcare precision. Deep navy, clean typography, one animated hero graphic, static everywhere else.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with custom theme tokens
- **Fonts:** Google Fonts via `next/font/google`
  - `Playfair_Display` — headings
  - `Inter` — body/UI
  - `JetBrains_Mono` — technical callouts/badges
- **Icons:** `lucide-react`
- **Animation:** CSS only — animated SVG canvas in hero, static everywhere else
- **Contact Form:** Resend API (email to dustin@iig-corp.com)
- **Scheduling:** Calendly (button opens in new tab)
- **Deployment:** Vercel
- **Domain:** iig-corp.com

---

## File Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single page — all sections
│   ├── globals.css         # CSS variables, base styles
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form handler (Resend)
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx            # Includes animated node graphic
│   ├── Services.tsx
│   ├── Expertise.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/
│   ├── IIG_Logo_1_trans_bkg.png
│   ├── IIG_Small_Logo_trans_bkg.png
│   └── favicon.ico         # Generate from monogram on #0E192B bg
└── .env.local
    └── RESEND_API_KEY=your_key_here
```

---

## Color Tokens — tailwind.config.ts

```ts
colors: {
  navy: {
    DEFAULT: '#0E192B',
    light: '#162236',
    dark: '#090F1A',
  },
  gray: {
    brand: '#58585A',
  },
  blue: {
    signal: '#2B6CB0',
    hover: '#1A56A0',
    light: '#EBF4FF',
  },
  steel: '#A0AEC0',
  offwhite: '#F4F5F7',
  border: '#E2E8F0',
}
```

---

## CSS Variables — globals.css

```css
:root {
  --navy: #0E192B;
  --navy-light: #162236;
  --gray-brand: #58585A;
  --blue-signal: #2B6CB0;
  --blue-hover: #1A56A0;
  --steel: #A0AEC0;
  --offwhite: #F4F5F7;
  --border: #E2E8F0;
  --white: #FFFFFF;
}
```

---

## Metadata — app/layout.tsx

```ts
export const metadata = {
  title: 'IIG — Healthcare IT Integration for Specialty Labs',
  description: 'Infrastructure & Integration Group provides expert Cloverleaf, HL7, and FHIR integration services for specialty clinical laboratories.',
  openGraph: {
    title: 'IIG — Healthcare IT Integration',
    description: 'Expert Cloverleaf, HL7, and FHIR integration for specialty labs.',
    url: 'https://iig-corp.com',
    siteName: 'Infrastructure & Integration Group',
    locale: 'en_US',
    type: 'website',
  },
}
```

---

## Section Specs

---

### 1. Nav — `components/Nav.tsx`

**Behavior:** Fixed top, full width. Transparent over hero, transitions to `navy/95` with backdrop blur on scroll (use `useEffect` + `scrollY` listener).

**Layout:** Logo left · CTA button right. No other nav items — minimal as specified.

**Logo:** `IIG_Logo_1_trans_bkg.png` — white version works on dark nav. Height: 40px.

**CTA Button:**
- Label: `Schedule a Call`
- Action: Opens Calendly link in new tab
- Style: Signal blue background, white text, 4px border radius
- Calendly URL placeholder: `https://calendly.com/iig-corp/discovery` (replace with real link)

**Mobile:** Hamburger not needed — single CTA button is sufficient at all breakpoints. Logo + button stack is fine on mobile.

---

### 2. Hero — `components/Hero.tsx`

**Background:** `#0E192B` (navy) full viewport height (`100vh`)

**Animated Background Graphic:**
Build an HTML5 Canvas or SVG-based animated node/connection network. Specs:
- 18–24 nodes (small circles, `rgba(43, 108, 176, 0.6)`)
- Connecting lines between nearby nodes (`rgba(43, 108, 176, 0.15)`)
- Nodes drift slowly with random velocity vectors, bouncing off canvas edges
- Lines draw/fade based on proximity threshold (~150px)
- Two or three nodes pulse subtly (scale 1.0→1.3→1.0, opacity variation)
- Canvas fills full hero background, sits behind text content
- Use `requestAnimationFrame` loop
- Respect `prefers-reduced-motion` — if set, render static nodes only

**Content (centered, max-width 800px):**

Eyebrow label (JetBrains Mono, uppercase, tracked, signal blue, 13px):
```
HEALTHCARE IT INTEGRATION
```

H1 (Playfair Display Bold, 56px desktop / 36px mobile, white):
```
Your Lab's Integration
Problems Stop Here.
```

Subheadline (Inter Regular, 20px desktop / 17px mobile, `#A0AEC0`, max-width 600px):
```
IIG provides expert Cloverleaf, HL7, and FHIR integration
services exclusively for specialty clinical laboratories.
When your LIS needs to talk to Epic, Cerner, or 40 other
systems — we make it work.
```

**CTA Buttons (side by side, centered):**
- Primary: `Schedule a Call` — signal blue fill, white text — opens Calendly
- Secondary: `See Our Services` — transparent, white border, white text — scrolls to `#services`

**Bottom of hero:** Subtle scroll indicator — a small animated chevron-down in steel color

---

### 3. Services — `components/Services.tsx`

**Background:** `#F4F5F7` (off-white)
**Section padding:** 96px top/bottom

**Section Header (centered):**
- Eyebrow: `WHAT WE DO` (JetBrains Mono, signal blue, uppercase, tracked)
- H2: `Integration That Just Works` (Playfair Display, navy)
- Subhead: `We specialize in the complex, mission-critical interface work that general IT consultants can't handle.` (Inter, gray-brand, max-width 560px, centered)

**Grid:** 3 columns × 2 rows on desktop, 2×3 on tablet, 1×6 on mobile

**6 Service Cards:**

Each card:
- White background
- 1px border `#E2E8F0`
- 8px border radius
- 32px padding
- Hover: lift shadow `0 8px 24px rgba(14,25,43,0.12)`, 200ms transition
- Top-left: Lucide icon in signal blue, 28px
- H3 (Playfair Display, 22px, navy)
- Body (Inter, 15px, gray-brand, line-height 1.6)

**Card Content:**

1. **Cloverleaf Integration Engine**
   Icon: `Network`
   Body: Full lifecycle Cloverleaf development and administration. Thread design, TPS procs, site management, monitoring, and multi-site fleet operations across AIX and Linux environments.

2. **HL7 & FHIR Interoperability**
   Icon: `GitBranch`
   Body: ORU, ORM, ADT — every message type, every edge case. From v2.x to FHIR R4, your data gets where it needs to go in the format your trading partners require.

3. **Epic Bridges**
   Icon: `Link`
   Body: Certified Epic Bridges interface development and troubleshooting. We know the quirks, the workarounds, and the edge cases that only come from years of hands-on implementation.

4. **LIS Integration**
   Icon: `FlaskConical`
   Body: Deep experience connecting laboratory information systems to hospitals, EHRs, reference clients, and billing platforms. We understand your lab's data model and your clients' expectations.

5. **Interface Monitoring & Support**
   Icon: `Activity`
   Body: Proactive monitoring, alerting, and rapid response. When a critical interface goes down at 2am, you need someone who answers.

6. **Legacy System Modernization**
   Icon: `RefreshCw`
   Body: Aging integration infrastructure keeping you up at night? We assess, document, and modernize complex interface environments without disrupting live operations.

---

### 4. Expertise — `components/Expertise.tsx`

**Background:** `#0E192B` (navy) — dark section for contrast break
**Section padding:** 96px top/bottom
**All text:** white or steel

**Section Header (centered):**
- Eyebrow: `TECHNICAL DEPTH` (JetBrains Mono, signal blue, uppercase)
- H2: `We Speak Your Language` (Playfair Display, white)
- Subhead: `No ramp-up time. No explaining what HL7 is. Just deep domain expertise from day one.` (Inter, steel, max-width 520px)

**Technology Badge Grid:**
Render as wrapping flex row, centered. Each badge:
- Background: `rgba(43, 108, 176, 0.15)`
- Border: `1px solid rgba(43, 108, 176, 0.3)`
- Text: `#A0AEC0`, JetBrains Mono, 13px
- Padding: 6px 14px, border-radius 4px
- Hover: border brightens to `rgba(43, 108, 176, 0.7)`, text goes white

**Badges (in this order):**
`Cloverleaf` · `HL7 v2.x` · `FHIR R4` · `Epic Bridges` · `Cerner` · `AIX` · `Linux` · `TCL` · `Python` · `SQL` · `ORM/ORU/ADT` · `LIS Integration` · `PACS` · `Radiology Workflows` · `Cardiology Workflows` · `Forensic Toxicology` · `Perinatal Testing` · `Infor IPN Member`

**Stats Row (below badges, ~64px margin top):**
4 stats in a row (2×2 on mobile), centered, with thin vertical dividers between on desktop:

| Stat | Label |
|------|-------|
| `20+` | Years in Healthcare IT |
| `45+` | Active Interfaces Managed |
| `78+` | Sites Supported |
| `1` | Point of Contact — Always |

Stat number: Playfair Display Bold, 52px, white
Label: Inter, 14px, steel, uppercase, tracked

---

### 5. About — `components/About.tsx`

**Background:** `#FFFFFF`
**Section padding:** 96px top/bottom

**Layout:** Two-column on desktop — left column text, right column a subtle decorative element (use the IIG monogram logo at large size, low opacity `0.06`, as a watermark background element — `IIG_Small_Logo_trans_bkg.png`, tinted navy)

**Section Header:**
- Eyebrow: `ABOUT IIG` (JetBrains Mono, signal blue, uppercase)
- H2: `Small by Design. Expert by Necessity.` (Playfair Display, navy)

**Body Copy (Inter, 17px, gray-brand, line-height 1.7):**

```
Infrastructure & Integration Group, Inc. is a Colorado-based
healthcare IT integration firm built on a simple premise:
specialty laboratories deserve the same caliber of integration
expertise as large hospital systems — without the enterprise
price tag or the bureaucracy.

We are an Infor Partner Network member and one of a small number
of independent consultants with deep, hands-on Cloverleaf
expertise at scale. Currently supporting a national specialty
reference laboratory with 45+ active interfaces across a
diverse trading partner network including Epic and Cerner
health systems.

Our clients get direct access to senior-level integration
engineering on every engagement — no junior staff, no account
managers, no ticket queues. If your lab is growing its trading
partner network, modernizing a legacy integration environment,
or dealing with a critical interface issue nobody else has been
able to solve — this is the right call.
```

**Below copy — two small badges/pills:**
- `📍 Pagosa Springs, Colorado`
- `🏢 Colorado S-Corporation · IPN Member`

Style: `#F4F5F7` background, `#58585A` text, Inter 13px, 6px 14px padding, 4px border radius

---

### 6. Contact — `components/Contact.tsx`

**Background:** `#F4F5F7`
**Section padding:** 96px top/bottom

**Section Header (centered):**
- Eyebrow: `LET'S TALK` (JetBrains Mono, signal blue, uppercase)
- H2: `Ready to Solve Your Integration Problems?` (Playfair Display, navy)
- Subhead: `Tell us what you're dealing with. We'll respond within one business day.` (Inter, gray-brand)

**Two-part layout, centered, max-width 640px:**

**Part 1 — Calendly CTA block:**
- White card, 32px padding, 8px border radius, border `#E2E8F0`
- Icon: `CalendarDays` (Lucide, signal blue, 32px)
- H3: `Schedule a Discovery Call` (Playfair Display, 24px, navy)
- Body: `30 minutes. No sales pitch. Just an honest conversation about your integration challenges.` (Inter, gray-brand)
- Button: `Open Scheduling Link` — signal blue, white text, full width
- Action: `window.open('https://calendly.com/iig-corp/discovery', '_blank')` (replace with real URL)

**Part 2 — Contact Form (below Calendly card, ~48px margin):**

Divider with centered text: `— or send a message —` (Inter, 13px, steel)

Form fields (full width, stacked):
- `Name *` — text input
- `Organization *` — text input  
- `Email *` — email input
- `Phone` — tel input (optional label)
- `What integration challenges are you facing? *` — textarea, 5 rows

**Input styles:**
- Border: `1px solid #E2E8F0`
- Border radius: 4px
- Padding: 12px 16px
- Focus: border `#2B6CB0`, outline none, box-shadow `0 0 0 3px rgba(43,108,176,0.1)`
- Font: Inter, 15px, navy

**Submit button:** `Send Message` — signal blue, white text, full width, 48px height

**Form submission:** POST to `/api/contact` — send email via Resend to `dustin@iig-corp.com`

**Success state:** Replace form with a confirmation message:
- Icon: `CheckCircle` (Lucide, green)
- Heading: `Message Sent`
- Body: `Thanks — we'll be in touch within one business day.`

**Error state:** Inline error message in red below submit button.

---

### 7. Footer — `components/Footer.tsx`

**Background:** `#0E192B`
**Padding:** 48px top/bottom

**Layout (3-column on desktop, stacked centered on mobile):**

Left: IIG monogram (`IIG_Small_Logo_trans_bkg.png`, 36px height, opacity 0.8)

Center: Nav anchor links in a row
- Services · Expertise · About · Contact
- Style: Inter 13px, `#A0AEC0`, hover white, no underline

Right: LinkedIn icon (`Linkedin` from Lucide, 20px, steel, hover white)
- Link: `https://linkedin.com/company/iig-corp` (replace with real URL)

**Bottom border row (full width, `border-top: 1px solid rgba(255,255,255,0.08)`, 24px margin top):**
- Centered: `© 2025 Infrastructure & Integration Group, Inc. · Pagosa Springs, CO`
- Inter, 12px, `#A0AEC0`

---

## Contact API Route — app/api/contact/route.ts

```ts
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, organization, email, phone, message } = await req.json();

  if (!name || !organization || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'IIG Website <noreply@iig-corp.com>',
      to: 'dustin@iig-corp.com',
      subject: `New Inquiry — ${organization}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
```

---

## Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Vercel: Add `RESEND_API_KEY` in Project Settings → Environment Variables.

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `< 640px` (mobile) | Single column everything, H1 36px, stat grid 2×2 |
| `640–1024px` (tablet) | Service cards 2-col, about single-col |
| `> 1024px` (desktop) | Full layout as specified |

---

## Performance Notes

- Use `next/image` for both logo files with appropriate `width`/`height`
- Canvas animation: throttle to 60fps max, pause when tab is not visible (`document.hidden`)
- No analytics scripts
- No third-party scripts except Calendly (loaded on-demand via `window.open`, not embedded)
- Target Lighthouse score: 90+ on all metrics

---

## Deployment Checklist

- [ ] Set `RESEND_API_KEY` in Vercel environment variables
- [ ] Update Calendly URL in `Nav.tsx`, `Hero.tsx`, and `Contact.tsx`
- [ ] Update LinkedIn URL in `Footer.tsx`
- [ ] Verify `dustin@iig-corp.com` domain is verified in Resend dashboard
- [ ] Add `iig-corp.com` custom domain in Vercel project settings
- [ ] Test contact form end-to-end before going live
- [ ] Generate and place favicon from IIG monogram on `#0E192B` background

---

## Assets Required (place in /public)

| File | Source |
|------|--------|
| `IIG_Logo_1_trans_bkg.png` | Provided |
| `IIG_Small_Logo_trans_bkg.png` | Provided |
| `favicon.ico` | Generate: monogram on `#0E192B`, export 32×32 |
| `apple-touch-icon.png` | Generate: monogram on `#0E192B`, export 180×180 |

---

*Implementation spec v1.0 — IIG · Infrastructure & Integration Group, Inc.*
