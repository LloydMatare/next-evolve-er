import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Award, Briefcase, Globe, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const benefits = [
  {
    icon: Users,
    title: 'Talent Pipeline',
    description: 'Meet students, graduates, founders, and digital professionals ready to build.',
  },
  {
    icon: Briefcase,
    title: 'Brand Visibility',
    description: 'Place your brand inside a premium summit experience with stronger visual storytelling.',
  },
  {
    icon: Globe,
    title: 'Regional Reach',
    description: 'Connect with a multi-sector African audience spanning policy, education, and business.',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Show up as a visible supporter of innovation, inclusion, and digital growth.',
  },
]

const tiers = [
  { name: 'Bronze', price: '$2,500', items: ['Website logo placement', '1 booth space', 'Access to talent engagement'] },
  { name: 'Silver', price: '$7,500', items: ['Prominent logo visibility', '2 booth spaces', 'Speaking or showcase slot'] },
  { name: 'Gold', price: '$15,000', items: ['Title-level visibility', 'Keynote presence', 'Custom partnership activation'] },
]

export default function Partnerships() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Partner With Evolve"
        title="Turn your brand into part of the"
        accent="summit experience"
        description="The redesigned partnerships page now feels more like a premium sponsor prospectus, with stronger hierarchy, clearer tiers, and a more conversion-ready event atmosphere."
        primaryCta={{ href: '/contact', label: 'Contact Partnerships' }}
        secondaryCta={{ href: '/register', label: 'Register Interest' }}
        image="/images/partnerships-hero.svg"
        imageAlt="Partnership and collaboration illustration"
      />

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Partner Benefits"
            title="Built for visibility, recruitment, influence, and impact."
            description="Every partnership level is now framed around concrete event outcomes rather than just a list of features."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon

              return (
                <FadeIn key={benefit.title} delay={index * 90}>
                  <div className="event-surface event-card-hover rounded-[1.8rem] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-950">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#eef4ff,#ffffff)] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Sponsorship Tiers"
            title="Flexible packages with a more modern presentation."
            description="The tier cards now read like premium event offers instead of plain pricing tables."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier, index) => (
              <FadeIn key={tier.name} delay={index * 90}>
                <div
                  className={`${index === 1 ? 'event-panel-dark text-white' : 'event-surface'} rounded-[2rem] p-7`}
                >
                  <div className="text-sm uppercase tracking-[0.22em] text-slate-400">
                    {tier.name}
                  </div>
                  <div className={`mt-4 text-5xl font-semibold ${index === 1 ? 'text-white' : 'text-slate-950'}`}>
                    {tier.price}
                  </div>
                  <div className="mt-6 space-y-3">
                    {tier.items.map((item) => (
                      <div
                        key={item}
                        className={`rounded-[1.1rem] border p-4 text-sm ${
                          index === 1
                            ? 'border-white/10 bg-white/6 text-slate-200'
                            : 'border-slate-200 bg-white/80 text-slate-700'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button
                    asChild
                    className={`mt-6 w-full rounded-full ${
                      index === 1
                        ? 'bg-[var(--brand-gold)] text-slate-950 hover:bg-[#ffe36b]'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    <Link href="/contact">Enquire Now</Link>
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
