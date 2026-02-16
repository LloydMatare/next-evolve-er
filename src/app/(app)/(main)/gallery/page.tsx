//@ts-nocheck
import { Navbar } from '@/components/navbar'
import SubHero from '@/components/sub-hero'
import GalleryClient from './gallery-client'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Gallery as GalleryType, Media } from '@/payload-types'

export interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail: string
  title: string
  description: string
  category: string
  year: number
  likes: number
  views?: number
}

export default async function GalleryPage() {
  const payload = await getPayload({ config })

  // Fetch gallery items
  const galleryData = await payload.find({
    collection: 'gallery',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 1000,
    sort: 'order',
  })

  // Transform the data to match MediaItem interface
  const mediaItems: MediaItem[] = galleryData.docs.map((item) => {
    const mediaItem: MediaItem = {
      id: item.id,
      type: item.type as 'image' | 'video',
      url: '',
      thumbnail: '',
      title: item.title,
      description: item.description,
      category: item.category,
      year: item.year,
      likes: item.likes || 0,
      views: item.views || 0,
    }

    if (item.type === 'image' && typeof item.image !== 'string' && item.image) {
      mediaItem.url = (item.image as Media).url || ''
      mediaItem.thumbnail = (item.image as Media).url || ''
    } else if (item.type === 'video') {
      mediaItem.url = item.videoUrl || ''
      if (item.thumbnail && typeof item.thumbnail !== 'string') {
        mediaItem.thumbnail = (item.thumbnail as Media).url || '/placeholder.png'
      } else {
        mediaItem.thumbnail = '/placeholder.png'
      }
    }

    return mediaItem
  })

  const images = mediaItems.filter((item) => item.type === 'image')
  const videos = mediaItems.filter((item) => item.type === 'video')

  // Get unique categories and years from the data
  const categoriesSet = new Set(mediaItems.map((item) => item.category))
  const categories = ['All', ...Array.from(categoriesSet).sort()]

  const yearsSet = new Set(mediaItems.map((item) => item.year))
  const years = [
    'All',
    ...Array.from(yearsSet)
      .sort((a, b) => b - a)
      .map(String),
  ]

  return <GalleryClient images={images} videos={videos} categories={categories} years={years} />
}
