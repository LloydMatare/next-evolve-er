import {
  Calendar,
  Users,
  Award,
  TrendingUp,
  ImageIcon,
  Play,
  ChevronRight,
  Star,
  Trophy,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  Clock,
  MapPin,
  Heart,
  Share2,
  Download,
  Maximize2,
  Film,
  Camera,
} from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import SubHero from '@/components/sub-hero'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { PreviousSummit, Media } from '@/payload-types'
import PreviousSummitClient from './previous-summit-client'

export interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail: string
  title: string
  description: string
  category: string
  year: string
  likes: number
}

export interface SummitData {
  year: string
  title: string
  theme: string
  highlights: string[]
  themes: string[]
  stats: {
    delegates: string
    speakers: string
    exhibitors: string
    startups: string
    countries: string
    partnerships: string
    days?: string
  }
  color: string
  gradient: string
  images: MediaItem[]
  videos: MediaItem[]
}

async function getPreviousSummits(): Promise<SummitData[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'previous-summits',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-order',
      depth: 2,
    })

    return result.docs.map((summit: PreviousSummit) => {
      const images: MediaItem[] = (summit.images || []).map((img, index) => {
        const mediaData = img.image as Media
        return {
          id: img.id || `img-${index}`,
          type: 'image' as const,
          url: mediaData.url || '/placeholder.png',
          thumbnail: mediaData.url || '/placeholder.png',
          title: img.title,
          description: img.description,
          category: img.category,
          year: summit.year,
          likes: img.likes || 0,
        }
      })

      const videos: MediaItem[] = (summit.videos || []).map((vid, index) => {
        const thumbnailData = vid.thumbnail as Media | null
        return {
          id: vid.id || `vid-${index}`,
          type: 'video' as const,
          url: vid.videoUrl,
          thumbnail: thumbnailData?.url || '/placeholder.png',
          title: vid.title,
          description: vid.description,
          category: vid.category,
          year: summit.year,
          likes: vid.likes || 0,
        }
      })

      return {
        year: summit.year,
        title: summit.title,
        theme: summit.theme,
        highlights: summit.highlights.map((h) => h.highlight),
        themes: summit.themes.map((t) => t.theme),
        stats: {
          delegates: summit.stats.delegates,
          speakers: summit.stats.speakers,
          exhibitors: summit.stats.exhibitors,
          startups: summit.stats.startups,
          countries: summit.stats.countries,
          partnerships: summit.stats.partnerships,
          days: summit.stats.days || '2',
        },
        color: summit.color,
        gradient: summit.gradient,
        images,
        videos,
      }
    })
  } catch (error) {
    console.error('Error fetching previous summits:', error)
    return []
  }
}

export default async function PreviousSummitPage() {
  const summitsData = await getPreviousSummits()

  return <PreviousSummitClient summitsData={summitsData} />
}
