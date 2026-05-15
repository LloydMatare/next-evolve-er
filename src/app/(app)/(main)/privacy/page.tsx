import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Lock, Mail, Shield, Users, FileText, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const sections = [
  {
    title: 'Information We Collect',
    content: [
      {
        heading: 'Information You Give Us',
        items: [
          'Registration details: full name, email address, phone number, organisation, job title, and country of residence.',
          'Professional information: company name, industry, sponsorship tier, booth preferences, team member names and roles.',
          'Payment information: billing details and transaction records processed through our secure payment gateway (Paynow). We do not store full payment card numbers.',
          'Communications: any correspondence you send us, including support requests, inquiries, and feedback.',
          'Event preferences: dietary restrictions, accessibility requirements, session preferences, and special requests.',
        ],
      },
      {
        heading: 'Information We Collect Automatically',
        items: [
          'Device information: the type of device, browser, operating system, and network provider you use to access our site.',
          'Log data: your IP address, pages visited, time and date of visits, referral URLs, and interactions with our platform.',
          'Cookies and similar technologies: we use cookies to remember your preferences, understand how you use our site, and improve your experience. For more details, see our Cookie Policy.',
          'Usage data: your activity on our platform—such as registration selections, pages viewed, and features used—to help us improve the event experience.',
          'Location information: we infer your approximate geographic location from your IP address to tailor relevant event information.',
        ],
      },
      {
        heading: 'Information From Third Parties',
        items: [
          'Payment processors: we receive transaction confirmation data from Paynow and other payment gateways to verify payments.',
          'Service providers: analytics and marketing partners may share aggregated or anonymised data about interactions with our communications.',
          'Public sources: we may use information from public professional networks (e.g., LinkedIn) to verify sponsorship or exhibitor applications.',
        ],
      },
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      {
        heading: 'To Deliver the Event Experience',
        items: [
          'Process registrations, manage payments, and issue digital passes and QR codes.',
          'Communicate event updates, schedules, and logistical information via email.',
          'Coordinate booth assignments, sponsorship benefits, and team member access.',
          'Facilitate networking and attendee matching where you have opted in.',
        ],
      },
      {
        heading: 'To Improve Our Services',
        items: [
          'Analyse registration trends and attendance patterns to optimise future events.',
          'Monitor platform performance and troubleshoot technical issues.',
          'Conduct surveys and gather feedback to enhance the attendee experience.',
          'Develop new features and service offerings based on usage insights.',
        ],
      },
      {
        heading: 'For Safety and Compliance',
        items: [
          'Verify identities and prevent fraudulent registrations or duplicate accounts.',
          'Enforce our Terms and Conditions, including event conduct policies.',
          'Comply with legal obligations, court orders, or regulatory requests.',
          'Protect the rights, property, and safety of our attendees, staff, and partners.',
        ],
      },
      {
        heading: 'For Marketing (With Your Consent)',
        items: [
          'Send promotional materials about future Evolve ICT Summit events and related offerings.',
          'Showcase sponsors and exhibitors on our website and marketing materials.',
          'Deliver personalised content and recommendations based on your interests.',
          'You may opt out of marketing communications at any time via the unsubscribe link in our emails or by contacting us directly.',
        ],
      },
    ],
  },
  {
    title: 'Legal Basis for Processing',
    content: [
      {
        heading: 'For EEA, UK, and Swiss Residents',
        items: [
          'Contract performance: processing your registration and delivering event services is necessary to fulfil our agreement with you.',
          'Legitimate interests: we use your data to improve our platform, ensure security, and communicate relevant event information where our interests do not override your rights.',
          'Consent: where we rely on your consent (e.g., marketing emails, cookies), you may withdraw at any time without affecting the lawfulness of processing before withdrawal.',
          'Legal obligation: certain data processing is required to comply with applicable laws and regulations.',
        ],
      },
    ],
  },
  {
    title: 'Your Rights and Choices',
    content: [
      {
        heading: 'Data Protection Rights',
        items: [
          'Access: request a copy of the personal data we hold about you.',
          'Rectification: correct any inaccurate or incomplete information.',
          'Erasure: request deletion of your data where applicable by law.',
          'Restriction: limit how we process your data in certain circumstances.',
          'Portability: receive your data in a structured, machine-readable format.',
          'Objection: object to processing based on legitimate interests or direct marketing.',
          'Automated decision-making: request human intervention for decisions made solely by automated means.',
        ],
      },
      {
        heading: 'How to Exercise Your Rights',
        items: [
          'Submit a request via email to info@evolveictsummit.com with the subject line "Data Subject Request."',
          'We will respond within 30 days. We may require identity verification before processing your request.',
          'If you are unsatisfied with our response, you have the right to lodge a complaint with your local data protection authority.',
          'In Zimbabwe, the relevant authority is the Postal and Telecommunications Regulatory Authority of Zimbabwe (POTRAZ).',
        ],
      },
    ],
  },
  {
    title: 'How We Share Your Information',
    content: [
      {
        heading: 'With Service Providers',
        items: [
          'Payment processors (e.g., Paynow) to handle transactions securely.',
          'Email and communication platforms to send event updates and confirmations.',
          'Analytics providers to understand platform usage and improve our services.',
          'Cloud hosting providers to store and process data securely.',
        ],
      },
      {
        heading: 'With Event Partners',
        items: [
          'Sponsors and exhibitors may receive attendee information only where you have explicitly opted in (e.g., networking or lead generation).',
          'Venue and logistics partners may receive necessary information to facilitate your attendance.',
          'We do not sell your personal data to third parties.',
        ],
      },
      {
        heading: 'For Legal Reasons',
        items: [
          'We may disclose information if required by law, court order, or government regulation.',
          'We may share data to enforce our Terms, protect our rights or property, or ensure the safety of our attendees and staff.',
          'In the event of a merger, acquisition, or restructuring, your data may be transferred as part of that transaction, with notice provided.',
        ],
      },
    ],
  },
  {
    title: 'International Data Transfers',
    content: [
      {
        heading: 'Cross-Border Processing',
        items: [
          'As a global event, your data may be transferred to and processed in countries outside your country of residence, including Zimbabwe and the United States.',
          'Where we transfer data to countries without an adequate level of data protection, we implement appropriate safeguards, including Standard Contractual Clauses (SCCs) or equivalent mechanisms.',
          'For EEA, UK, and Swiss residents: we rely on adequacy decisions, SCCs, or the Data Privacy Framework where applicable for transfers to third countries.',
          'By registering for the Evolve ICT Summit, you acknowledge that your information may be processed in jurisdictions where data protection laws may differ from those in your home country.',
        ],
      },
    ],
  },
  {
    title: 'Data Retention',
    content: [
      {
        heading: 'How Long We Keep Your Data',
        items: [
          'Registration data: retained for the duration of the event plus three years for record-keeping and future event communications.',
          'Payment records: retained for seven years to comply with tax and financial regulations.',
          'Communications: support inquiries and correspondence retained for two years after resolution.',
          'Marketing data: retained until you opt out or unsubscribe from our communications.',
          'Analytics data: retained in aggregated, anonymised form for reporting and planning purposes.',
          'Account information: retained for as long as your account is active. Upon deletion, we remove or depersonalise your data within 90 days unless legal retention requirements apply.',
        ],
      },
    ],
  },
  {
    title: 'Media Release Notice',
    content: [
      {
        heading: 'Photography, Filming, and Recording',
        items: [
          'By entering this venue, attending this event, or engaging with our services, you consent to being photographed, filmed, or recorded for promotional, marketing, archival, and communication purposes.',
          'Compulink Holdings and its subsidiaries reserve the right to use such media across its digital platforms, publications, social media channels, presentations, and promotional materials.',
          'Attendance constitutes consent to the use of your image and likeness without compensation.',
          'Any individual who prefers not to be photographed or recorded is encouraged to inform event staff or management in advance so that reasonable accommodations can be made.',
        ],
      },
    ],
  },
  {
    title: 'Children\'s Privacy',
    content: [
      {
        heading: 'Age Restrictions',
        items: [
          'The Evolve ICT Summit is intended for professional attendees aged 18 and over.',
          'We do not knowingly collect personal data from individuals under 18 years of age.',
          'If we become aware that a person under 18 has provided us with personal data, we will take steps to delete such information promptly.',
          'If you believe a minor has provided us with their data, please contact us immediately at info@evolveictsummit.com.',
        ],
      },
    ],
  },
  {
    title: 'Security Measures',
    content: [
      {
        heading: 'How We Protect Your Data',
        items: [
          'All data transmitted between your browser and our servers is encrypted using TLS 1.3 (256-bit encryption).',
          'Payment processing is handled by PCI DSS-compliant third-party providers (Paynow).',
          'Access to personal data is restricted to authorised personnel only, on a need-to-know basis.',
          'We conduct regular security audits, vulnerability assessments, and penetration testing.',
          'Employee access is governed by strict internal policies, multi-factor authentication, and activity logging.',
          'In the event of a data breach, we will notify affected individuals and relevant authorities within 72 hours as required by applicable law.',
        ],
      },
    ],
  },
  {
    title: 'Cookies and Tracking',
    content: [
      {
        heading: 'How We Use Cookies',
        items: [
          'Essential cookies: required for the platform to function (e.g., session management, authentication).',
          'Functional cookies: remember your preferences and settings for a personalised experience.',
          'Analytics cookies: help us understand how visitors use our site so we can improve it (e.g., page views, navigation patterns).',
          'Marketing cookies: used only with your consent to deliver relevant event promotions.',
          'You can manage cookie preferences through your browser settings at any time. Disabling certain cookies may affect platform functionality.',
          'For detailed information, please review our full Cookie Policy.',
        ],
      },
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      {
        heading: 'Policy Updates',
        items: [
          'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or event operations.',
          'Material changes will be communicated via email to registered attendees and through a notice on our website.',
          'The "Last Updated" date at the bottom of this page indicates when the policy was most recently revised.',
          'Your continued use of our platform after changes take effect constitutes acceptance of the updated policy.',
        ],
      },
    ],
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Privacy Policy"
        title="How we handle your"
        accent="personal data"
        description="We are committed to protecting your privacy and being transparent about how we collect, use, and safeguard your information when you interact with the Evolve ICT Summit."
        primaryCta={{ href: '/contact', label: 'Contact Our Team' }}
        secondaryCta={{ href: '/', label: 'Back to Home' }}
        image="/bg-2.jpg"
        imageAlt="Abstract digital privacy visual"
        compact
      />

      {/* Introduction */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom max-w-4xl mx-auto">
          <FadeIn>
            <div className="event-surface rounded-[2rem] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Scope</p>
                </div>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed">
                This Privacy Policy describes how the Evolve ICT Summit (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, stores,
                shares, and protects your personal data when you visit our website, register for the event,
                or interact with our services. This policy applies to all attendees, sponsors, exhibitors,
                speakers, and partners.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                For the purposes of the General Data Protection Regulation (&quot;GDPR&quot;), if you are a resident
                of the EEA, Switzerland, or the United Kingdom, the data controller for your personal
                information is Evolve ICT Summit. If you have any questions about our data processing
                activities, please contact our Data Protection Officer using the details in the
                &quot;Contact Us&quot; section below.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Detailed Policy Sections */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Full Policy"
            title="Detailed information about how we handle your data."
            description="Each section below explains a specific aspect of our data practices in clear, straightforward language."
          />

          <div className="space-y-6">
            {sections.map((section, index) => (
              <FadeIn key={section.title} delay={Math.min(index * 60, 500)}>
                <div className="event-surface rounded-[1.8rem] p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-950">{section.title}</h2>
                  </div>

                  <div className="space-y-8">
                    {section.content.map((subsection) => (
                      <div key={subsection.heading}>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
                          {subsection.heading}
                        </h3>
                        <div className="grid gap-3">
                          {subsection.items.map((item) => (
                            <div
                              key={item}
                              className="rounded-[1.15rem] border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700 leading-relaxed"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Your Data Rights Section */}
      <section className="section-padding bg-[linear-gradient(180deg,#081021,#101933)] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <FadeIn>
            <div className="event-panel-dark rounded-[2rem] p-8 md:p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-gold),#ffd96c)] text-slate-950">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-semibold text-white">Your data rights</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Depending on your jurisdiction, you have the following rights regarding your personal data:
              </p>
              <div className="mt-6 space-y-4">
                {[
                  'Access your personal data and receive a copy',
                  'Correct inaccurate or incomplete information',
                  'Request deletion of your data (right to be forgotten)',
                  'Restrict or object to certain processing activities',
                  'Request data portability in a structured format',
                  'Withdraw consent at any time where processing is based on consent',
                  'Lodge a complaint with your local data protection authority',
                ].map((right) => (
                  <div
                    key={right}
                    className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 text-slate-200"
                  >
                    {right}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="event-surface rounded-[2rem] p-8 md:p-10">
              <SectionHeading
                eyebrow="Questions?"
                title="Reach out if you need privacy or registration support."
                description="For privacy concerns, registration records, data subject requests, or any questions about this policy, contact the event team directly."
                align="left"
              />

              <div className="space-y-4">
                <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-5 text-slate-700">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[var(--brand-blue)]" />
                    <span>info@evolveictsummit.com</span>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-5 text-slate-700">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[var(--brand-cyan)]" />
                    <span>Support available during business hours in CAT (UTC+2)</span>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-5 text-slate-700">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-[var(--brand-gold)]" />
                    <span>Harare International Conference Centre, Harare, Zimbabwe</span>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-5 text-slate-700">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-emerald-500" />
                    <span>Last updated: May 15, 2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button asChild className="w-full rounded-full bg-slate-950 text-white hover:bg-slate-800">
                  <Link href="/contact">Contact Data Protection Officer</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full border-slate-200 bg-white/80">
                  <Link href="/register">Return to Registration</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
