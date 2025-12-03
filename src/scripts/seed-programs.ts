//@ts-nocheck
// scripts/seed-programs.ts
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

async function seedPrograms() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Sample programs data (similar to your original timeSlots)
    const samplePrograms = [
      {
        title: 'Registration & Welcome Coffee',
        description: 'Arrival, badge pickup, and networking over morning refreshments',
        day: 'day-1',
        startTime: '08:00',
        endTime: '09:00',
        duration: '1h',
        type: 'registration',
        venue: 'main-lobby',
        capacity: 'All attendees',
        featured: false,
        color: 'bg-blue-50 border-blue-200',
        order: 1,
      },
      {
        title: 'Opening Ceremony',
        description:
          'Official welcome and summit opening by event organizers and government officials',
        day: 'day-1',
        startTime: '09:00',
        endTime: '09:30',
        duration: '30m',
        type: 'opening',
        venue: 'main-auditorium',
        capacity: 'All attendees',
        track: 'main',
        featured: true,
        color: 'bg-purple-50 border-purple-200',
        order: 2,
      },
      // Add more sample data...
    ]

    // Clear existing data
    const existingPrograms = await payload.find({
      collection: 'programs',
      limit: 1000,
    })

    for (const program of existingPrograms.docs) {
      await payload.delete({
        collection: 'programs',
        id: program.id,
      })
    }

    // Create new programs
    for (const program of samplePrograms) {
      await payload.create({
        collection: 'programs',
        data: program,
      })
      console.log(`Created program: ${program.title}`)
    }

    console.log('Programs seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding programs:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  seedPrograms()
}
