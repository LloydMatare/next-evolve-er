import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import {
  Award,
  Calendar,
  Globe,
  Lightbulb,
  Network,
  Play,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    icon: Network,
    title: 'Collaboration',
    description:
      'A summit designed to connect government, industry, academia, startups, and youth.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We spotlight practical ideas, prototypes, and scalable African technology stories.',
  },
  {
    icon: Shield,
    title: 'Trust',
    description:
      'The event creates space for credible, future-shaping conversations about infrastructure and security.',
  },
  {
    icon: Sparkles,
    title: 'Exposure',
    description:
      'Attendees gain visibility, opportunity, and meaningful access to partnerships and markets.',
  },
]

const themes = [
  'Emerging technologies and AI',
  'Digital transformation and infrastructure',
  'Cybersecurity and digital trust',
  'Innovation, startups, and entrepreneurship',
  'Data governance and regulation',
  'Skills, employability, and future work',
  'Blockchain, Digital Identity & Trust',
  'Cloud & Zero-Trust Architecures',
]

const timeline = [
  {
    year: '2024',
    title: 'Lead With Vision',
    description:
      'The 2024 Evolve ICT Summit, themed *Lead with Vision*, empowered professionals to embrace bold leadership in the digital age. The event featured inspiring keynote speakers, forward-thinking panel discussions, and practical insights on innovation, strategy, and transformation. Attendees gained clarity, confidence, and actionable tools to lead impactful change within their organizations and communities.',
  },
  {
    year: '2025',
    title: 'Sustainable ICT Solutions For The Future',
    description:
      'The 2025 Evolve ICT Summit, themed *Sustainable ICT Solutions for the Future*, brought together industry leaders, innovators, and young professionals to explore eco-friendly technologies, digital transformation, and responsible innovation. Key highlights included expert-led discussions, practical insights on green IT, collaborative networking sessions, and actionable strategies for building a resilient, sustainable digital future.',
  },
]

const team = [
  { name: 'Dr. Sarah Chen', role: 'Summit Director', image: '/placeholder-team-1.jpg' },
  { name: 'Marcus Johnson', role: 'Program Lead', image: '/placeholder-team-2.jpg' },
  { name: 'Amara Okonkwo', role: 'Partnerships Director', image: '/placeholder-team-3.jpg' },
  { name: 'David Mwangi', role: 'Technical Lead', image: '/placeholder-team-4.jpg' },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
  'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=600&q=80',
  'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="About The Summit"
        title="An event brand built around"
        accent="Africa's digital leap"
        description="Evolve ICT Summit brings together the people shaping digital transformation across policy, business, education, and innovation, then presents that story with a more modern and immersive web experience."
        primaryCta={{ href: '/program', label: 'View Program' }}
        secondaryCta={{ href: '/partnerships', label: 'Explore Partnerships' }}
        image="/bg-2.jpg"
        imageAlt="Summit audience and stage lighting"
        stats={[
          { value: '2 Days', label: 'of programming' },
          { value: '30+', label: 'countries represented' },
          { value: '50+', label: 'speakers and facilitators' },
          { value: '100+', label: 'exhibitors and partners' },
        ]}
      />

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Evolve"
            title="A clearer story, stronger confidence, and more event energy."
            description="The refreshed page structure puts vision, value, and event credibility up front while keeping the content easy to scan."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon

              return (
                <FadeIn key={value.title} delay={index * 100}>
                  <div className="event-surface event-card-hover rounded-[1.8rem] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-950">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{value.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#f9fbff,#ffffff)] px-4 sm:px-6 lg:px-8">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="event-panel-dark rounded-[2rem] p-8 md:p-10">
              <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Vision
              </div>
              <h2 className="mt-5 text-4xl font-semibold text-white">
                Build a trusted hub for digital leadership in Africa.
              </h2>
              <p className="mt-4 text-slate-300">
                Evolve positions Zimbabwe as a meeting point for innovation, policy dialogue,
                partnerships, and talent development across the continent.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="event-surface rounded-[2rem] p-8 md:p-10">
              <div className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                Mission
              </div>
              <h2 className="mt-5 text-4xl font-semibold text-slate-950">
                Turn conversations into action through visibility, access, and collaboration.
              </h2>
              <p className="section-copy mt-4">
                From keynote stages to workshop rooms and partner lounges, the summit is built to
                generate real outcomes for delegates, students, brands, and institutions.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Discussion Themes"
            title="The topics driving the 2026 conversation."
            description="The redesign also lets the content breathe, so major themes feel more premium and easier to navigate."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {themes.map((theme, index) => (
              <FadeIn key={theme} delay={index * 80}>
                <div className="event-surface rounded-[1.6rem] p-5">
                  <div className="flex items-start gap-3">
                    <Award className="mt-1 h-5 w-5 flex-none text-[var(--brand-gold)]" />
                    <p className="text-slate-700">{theme}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[450px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://cdn.coverr.co/videos/coverr-abstract-connection-background-15837/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/60" />
        </div>
        <div className="relative flex h-full items-center">
          <div className="container-custom">
            <FadeIn>
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Experience The Energy
                </div>
                <h2 className="text-4xl font-semibold text-white md:text-5xl">
                  Where Africa's digital future takes shape
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Join industry leaders, innovators, and visionaries for two days of inspiring
                  keynotes, hands-on workshops, and meaningful connections.
                </p>
                <Button
                  asChild
                  className="mt-6 rounded-full bg-white text-slate-900 hover:bg-white/90"
                >
                  <Link href="/gallery">
                    <Play className="mr-2 h-4 w-4" /> Watch Highlights
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Journey"
            title="Six years of shaping Africa's tech landscape."
            description="From a small gathering to a continental event, see how we've grown together."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {timeline.map((item, index) => (
              <FadeIn key={item.year} delay={index * 100}>
                <div className="event-surface rounded-[1.5rem] p-5 text-center">
                  <div className="mb-3 text-3xl font-bold text-[var(--brand-blue)]">
                    {item.year}
                  </div>
                  <h4 className="font-semibold text-slate-950">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#f8fafc,#eef4ff)] px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind the summit."
            description="Meet the dedicated team working to bring you this transformative event."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <FadeIn key={member.name} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-[1.8rem]">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800/10">
                      <div className="text-center">
                        <Users className="mx-auto h-12 w-12 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">Team Member</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments from past summits."
            description="A visual journey through the highlights and memories we've created together."
          />

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {galleryImages.map((src, index) => (
              <FadeIn key={index} delay={index * 50}>
                <div className="group relative aspect-square overflow-hidden rounded-[1.25rem] bg-slate-200">
                  <img
                    src={src}
                    alt={`Summit moment ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 border-slate-300 px-6"
            >
              <Link href="/gallery">
                View Full Gallery
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="container-custom overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-cyan)] p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                  Join us in making history
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Be part of Africa's largest tech gathering. Whether you're a startup, enterprise,
                  or student, there's a place for you at Evolve 2026.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="rounded-full bg-white px-6 text-[var(--brand-blue)] hover:bg-white/90">
                  <Calendar className="mr-2 h-4 w-4" />
                  Register Now
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-2 border-white/30 bg-white/10 px-6 text-white hover:bg-white/20"
                >
                  <Link href="/partnerships">
                    <Globe className="mr-2 h-4 w-4" />
                    Become a Partner
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
