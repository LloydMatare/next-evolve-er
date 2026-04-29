//@ts-nocheck
import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import {
  Award,
  Briefcase,
  Calendar,
  Cpu,
  Globe,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Play,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ICON_MAP: Record<string, React.ReactNode> = {
  cpu: <Cpu className="h-6 w-6" />,
  briefcase: <Briefcase className="h-6 w-6" />,
  lightbulb: <Lightbulb className="h-6 w-6" />,
  'heart-handshake': <HeartHandshake className="h-6 w-6" />,
}

export default async function SchoolSummit() {
  let fetchedData: any = null

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const response = await fetch(`${apiUrl}/api/school-summit`, {
      next: { revalidate: 3600 },
    })

    if (response.ok) {
      const result = await response.json()
      fetchedData = result.data
    }
  } catch (error) {
    console.error('Failed to fetch school summit data:', error)
  }

  const objectives = fetchedData?.objectives?.length
    ? fetchedData.objectives.map((obj: any) => ({
        icon: ICON_MAP[obj.objectiveIcon] || <Cpu className="h-6 w-6" />,
        title: obj.title,
        skills: obj.skills?.map((skill: any) => skill.skill) || [],
      }))
    : [
        {
          icon: <Cpu className="h-6 w-6" />,
          title: 'Digital Skills for the Future',
          skills: [
            'Artificial Intelligence and machine learning',
            'Cloud, cybersecurity, and DevOps foundations',
            'Data, mobile, and software development pathways',
          ],
        },
        {
          icon: <Briefcase className="h-6 w-6" />,
          title: 'Career Readiness',
          skills: [
            'Career guidance and certification roadmaps',
            'Internship visibility and portfolio growth',
          ],
        },
        {
          icon: <Lightbulb className="h-6 w-6" />,
          title: 'Innovation and Entrepreneurship',
          skills: ['Hackathons, showcases, startup thinking, and founder exposure'],
        },
        {
          icon: <HeartHandshake className="h-6 w-6" />,
          title: 'Mentorship and Ecosystem Access',
          skills: ['Industry mentors, university connections, and employer networking'],
        },
      ]

  const highlights = fetchedData?.programmeHighlights?.length
    ? fetchedData.programmeHighlights.map((item: any) => item.title)
    : [
        'Keynotes from African digital leaders',
        'Career panels and technical workshops',
        'Student innovation showcase',
        'Mentorship clinics and networking sessions',
      ]

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Evolve Student Summit"
        title="A youth-focused experience for"
        accent="future digital leaders"
        description="This refreshed page presents the student track as a serious, inspiring event product with stronger visuals, clearer pathways, and a more exciting call to action."
        primaryCta={{ href: '/register', label: 'Register Interest' }}
        secondaryCta={{ href: '/partnerships', label: 'Become a Partner' }}
        image="/bg-1.jpg"
        imageAlt="Students and event audience"
        stats={[
          { value: 'Youth-first', label: 'program focus' },
          { value: 'Skills', label: 'career pathways' },
          { value: 'Mentors', label: 'industry access' },
          { value: 'Innovation', label: 'showcase moments' },
        ]}
      />

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Student Experience"
            title="From exposure to employability to entrepreneurship."
            description="The new layout makes it easier for students, schools, and partners to understand exactly what the summit delivers."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {objectives.map((objective, index) => (
              <FadeIn key={objective.title} delay={index * 90}>
                <div className="event-surface rounded-[1.8rem] p-7">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                    {objective.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-950">{objective.title}</h3>
                  <div className="mt-5 space-y-3">
                    {objective.skills.map((skill: string) => (
                      <div
                        key={skill}
                        className="rounded-[1.15rem] border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#081021,#0d1730)] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <div className="event-panel-dark rounded-[2rem] p-8 md:p-10">
              <SectionHeading
                eyebrow="Program Highlights"
                title="A more energetic way to present the student agenda."
                description="The content is now framed like a real event journey instead of a long static information dump."
                align="left"
              />
              <div className="space-y-4">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 text-slate-200"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="event-surface rounded-[2rem] p-8 md:p-10">
              <div className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                Why It Matters
              </div>
              <h2 className="mt-5 text-4xl font-semibold text-slate-950">
                Students are not just future participants. They are present-day builders.
              </h2>
              <p className="section-copy mt-4">
                The student summit creates a stronger bridge between academic learning, real-world
                digital opportunities, and employer or startup ecosystems.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild className="rounded-full bg-slate-950 text-white hover:bg-slate-800">
                  <Link href="/register">Join the Student Summit</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-slate-300 bg-transparent text-slate-900 hover:bg-slate-50"
                >
                  <Link href="/contact">Talk to the Team</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative h-[400px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://cdn.coverr.co/videos/coverr-group-of-friends-studying-4677/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue)]/85 to-[var(--brand-cyan)]/70" />
        </div>
        <div className="relative flex h-full items-center">
          <div className="container-custom">
            <FadeIn>
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  <Play className="mr-2 h-4 w-4" />
                  Student Experience
                </div>
                <h2 className="text-4xl font-semibold text-white md:text-5xl">
                  Shape your future in tech
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Join hundreds of students from across Africa for two days of learning, networking,
                  and innovation.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Student Stories"
            title="Hear from past attendees."
            description="What students gained from participating in the summit."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Tasha Moyo',
                uni: 'University of Zimbabwe',
                quote:
                  'Got internship offers from two tech companies! The workshops were incredible.',
              },
              {
                name: 'Brian Okello',
                uni: 'UCT',
                quote:
                  'Met my current mentor at the summit. Changed my career trajectory completely.',
              },
              {
                name: 'Amara Diallo',
                uni: 'University of Nairobi',
                quote: "The hackathon helped me build my portfolio. Now I'm working on my startup!",
              },
            ].map((student, index) => (
              <FadeIn key={student.name} delay={index * 100}>
                <div className="event-surface rounded-[1.8rem] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-cyan)] text-white text-lg font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{student.name}</p>
                      <p className="text-sm text-slate-500">{student.uni}</p>
                    </div>
                  </div>
                  <div className="mb-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700">"{student.quote}"</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Info */}
      <section className="section-padding bg-[linear-gradient(180deg,#f8fafc,#eef4ff)] px-4 sm:px-6 lg:px-8">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="event-surface rounded-[2rem] p-8 md:p-10">
              <div className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                Who Can Join
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-slate-950">Open to all students</h3>
              <div className="mt-6 space-y-4">
                {[
                  'University and college students',
                  'High school seniors',
                  'Coding bootcamp participants',
                  'Self-taught developers',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[1rem] border border-slate-200/70 bg-white/80 p-4"
                  >
                    <Users className="h-5 w-5 text-[var(--brand-blue)]" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="event-panel-dark rounded-[2rem] p-8 md:p-10">
              <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Event Details
              </div>
              <div className="mt-6 grid gap-4">
                <div className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/6 p-5">
                  <Calendar className="h-6 w-6 text-[var(--brand-gold)]" />
                  <div>
                    <p className="font-semibold text-white">June 11-12, 2026</p>
                    <p className="text-sm text-white/60">Summit dates</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/6 p-5">
                  <MapPin className="h-6 w-6 text-[var(--brand-cyan)]" />
                  <div>
                    <p className="font-semibold text-white">Harare, Zimbabwe</p>
                    <p className="text-sm text-white/60">HICC Venue</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/6 p-5">
                  <Globe className="h-6 w-6 text-[var(--brand-rose)]" />
                  <div>
                    <p className="font-semibold text-white">500+ Students</p>
                    <p className="text-sm text-white/60">Expected attendance</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="container-custom overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-cyan)] p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                  Ready to build your future?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Register now to secure your spot at the student summit. Limited spaces available.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="rounded-full bg-white px-6 text-[var(--brand-blue)] hover:bg-white/90">
                  Register as Student
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-2 border-white/30 bg-white/10 px-6 text-white hover:bg-white/20"
                >
                  <Link href="/partnerships">Partner with Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
