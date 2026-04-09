import { ContactForm } from '@/components/contact-form'
import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Clock, Mail, MapPin, MessageSquare, Phone, Users } from 'lucide-react'

const contactCards = [
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@evolveictsummit.com'],
    description: 'For registration, speaker, media, and partnership support.',
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+263 242 494 407', '+263 8677 105 028'],
    description: 'Business hours support for planning, logistics, and delegate questions.',
  },
  {
    icon: MapPin,
    title: 'Office',
    lines: ['313 Samora Machel Ave, Eastlea', 'Harare, Zimbabwe'],
    description: 'Operational HQ for the Evolve Africa team.',
  },
  {
    icon: Clock,
    title: 'Hours',
    lines: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
    description: 'All times listed in CAT.',
  },
]

const departments = [
  'Partnerships and sponsorships',
  'Media and press requests',
  'Program and speaker coordination',
  'Tickets and registration support',
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Contact The Team"
        title="Plan your summit journey with"
        accent="fast, human support"
        description="The contact experience now feels more premium too, with clearer information hierarchy, stronger visual cues, and a more polished inquiry flow."
        primaryCta={{ href: '/register', label: 'Register Now' }}
        secondaryCta={{ href: '/faq', label: 'Visit FAQ' }}
        image="/bg-v.jpg"
        imageAlt="Modern event lighting and crowd silhouettes"
        compact
      />

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Reach Us"
            title="Everything attendees, sponsors, and speakers need in one place."
            description="The redesigned contact page turns what used to be a basic form into a more trustworthy and intentional event support hub."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card, index) => {
              const Icon = card.icon

              return (
                <FadeIn key={card.title} delay={index * 80}>
                  <div className="event-surface event-card-hover rounded-[1.8rem] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-950">{card.title}</h3>
                    <div className="mt-4 space-y-1 text-sm text-slate-700">
                      {card.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-500">{card.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#081021,#101933)] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn>
            <div className="event-panel-dark rounded-[2rem] p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-gold),#ffd96c)] text-slate-950">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white">Send a message</h2>
                  <p className="text-slate-400">We typically respond within one business day.</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="event-surface rounded-[2rem] p-8 md:p-10">
              <SectionHeading
                eyebrow="Support Paths"
                title="Contact the right team faster."
                description="This side panel keeps common request types visible so visitors know where to go next."
                align="left"
              />
              <div className="space-y-4">
                {departments.map((department) => (
                  <div
                    key={department}
                    className="flex items-start gap-3 rounded-[1.3rem] border border-slate-200/70 bg-white/80 p-4"
                  >
                    <Users className="mt-1 h-5 w-5 flex-none text-[var(--brand-blue)]" />
                    <p className="text-slate-700">{department}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
