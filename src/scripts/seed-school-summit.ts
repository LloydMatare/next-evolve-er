//@ts-nocheck
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

async function seedSchoolSummit() {
  const payload = await getPayload({ config: configPromise })

  // Seed objectives
  const objectives = [
    {
      title: 'Digital Skills for the Future',
      section: 'objectives',
      description:
        'Comprehensive training in cutting-edge technology skills needed for the digital economy',
      objectiveIcon: 'cpu',
      skills: [
        { skill: 'Artificial Intelligence & Machine Learning' },
        { skill: 'Data Science & Big Data' },
        { skill: 'Cybersecurity & Digital Trust' },
        { skill: 'Cloud Computing & DevOps' },
        { skill: 'Robotics, IoT & Automation' },
        { skill: 'Software & Mobile App Development' },
      ],
      status: 'published',
      order: 1,
    },
    {
      title: 'Career Readiness',
      section: 'objectives',
      description: 'Preparing students for successful careers in the tech industry',
      objectiveIcon: 'briefcase',
      skills: [
        { skill: 'Career pathway guidance' },
        { skill: 'Certification roadmap sessions' },
        { skill: 'Internship opportunities' },
        { skill: 'Personal branding' },
        { skill: 'Portfolio development' },
      ],
      status: 'published',
      order: 2,
    },
    {
      title: 'Innovation & Entrepreneurship',
      section: 'objectives',
      description: 'Fostering innovation and entrepreneurial spirit in students',
      objectiveIcon: 'lightbulb',
      skills: [
        { skill: 'Tech-driven solutions' },
        { skill: 'Startup creation' },
        { skill: 'Innovation showcases' },
        { skill: 'Hackathons' },
        { skill: 'Learn from founders' },
      ],
      status: 'published',
      order: 3,
    },
    {
      title: 'Mentorship & Ecosystem',
      section: 'objectives',
      description: 'Building strong connections with industry leaders and mentors',
      objectiveIcon: 'heart-handshake',
      skills: [
        { skill: 'Connect with industry leaders' },
        { skill: 'University partnerships' },
        { skill: 'Innovation hubs' },
        { skill: 'Employer networking' },
      ],
      status: 'published',
      order: 4,
    },
  ]

  // Seed sub-themes
  const subThemes = [
    {
      title: 'Digital Skills for the Future of Work',
      section: 'sub-themes',
      description: 'Essential skills for the modern digital workplace',
      status: 'published',
      order: 1,
    },
    {
      title: 'Youth Innovation & Entrepreneurship',
      section: 'sub-themes',
      description: 'Nurturing young innovators and startup founders',
      status: 'published',
      order: 2,
    },
    {
      title: 'Women in Technology & Inclusive Growth',
      section: 'sub-themes',
      description: 'Promoting diversity and inclusion in tech',
      status: 'published',
      order: 3,
    },
    {
      title: 'AI and Emerging Technologies in Africa',
      section: 'sub-themes',
      description: 'Exploring cutting-edge tech applications in African context',
      status: 'published',
      order: 4,
    },
    {
      title: 'Building Local Solutions for Local Challenges',
      section: 'sub-themes',
      description: 'Using technology to solve African problems',
      status: 'published',
      order: 5,
    },
  ]

  // Seed programme highlights
  const highlights = [
    {
      title: 'Inspirational keynote sessions from African digital leaders',
      section: 'programme-highlights',
      description: 'Learn from the best minds in African tech',
      status: 'published',
      order: 1,
    },
    {
      title: 'Career guidance panels with industry experts',
      section: 'programme-highlights',
      description: 'Get direct advice from industry professionals',
      status: 'published',
      order: 2,
    },
    {
      title: 'Hands-on workshops and technical masterclasses',
      section: 'programme-highlights',
      description: 'Practical, skill-building sessions',
      status: 'published',
      order: 3,
    },
    {
      title: 'Student innovation showcase and project demonstrations',
      section: 'programme-highlights',
      description: 'Showcase your work to industry leaders',
      status: 'published',
      order: 4,
    },
    {
      title: 'Mentorship clinics and networking sessions',
      section: 'programme-highlights',
      description: 'Connect with mentors and peers',
      status: 'published',
      order: 5,
    },
    {
      title: 'Exhibitions by universities, tech companies, and training providers',
      section: 'programme-highlights',
      description: 'Explore opportunities and partnerships',
      status: 'published',
      order: 6,
    },
  ]

  try {
    // Create objectives
    for (const obj of objectives) {
      await payload.create({
        collection: 'school-summit',
        data: obj,
      })
    }
    console.log('✅ Objectives seeded')

    // Create sub-themes
    for (const theme of subThemes) {
      await payload.create({
        collection: 'school-summit',
        data: theme,
      })
    }
    console.log('✅ Sub-themes seeded')

    // Create highlights
    for (const highlight of highlights) {
      await payload.create({
        collection: 'school-summit',
        data: highlight,
      })
    }
    console.log('✅ Highlights seeded')

    console.log('✅ School Summit data seeded successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedSchoolSummit()
