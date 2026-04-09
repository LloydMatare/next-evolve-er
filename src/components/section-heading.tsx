import React from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-12 max-w-3xl ${alignment}`}>
      <div className="inline-flex rounded-full border border-[rgba(67,97,238,0.12)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {eyebrow}
      </div>
      <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
        {title}
      </h2>
      {description ? <p className="section-copy mt-4">{description}</p> : null}
    </div>
  )
}
