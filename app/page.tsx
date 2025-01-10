"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect } from 'react'

const topics = [
  {
    name: 'Cancer Research',
    image: 'https://image.pollinations.ai/prompt/cancer%20research%20laboratory%20visualization,%20scientific,%20medical,%20detailed?width=1000&height=600&nologo=true',
    slug: 'cancer-research'
  },
  {
    name: 'Machine Learning',
    image: 'https://image.pollinations.ai/prompt/machine%20learning%20neural%20network%20visualization,%20technology,%20data%20patterns?width=1000&height=600&nologo=true',
    slug: 'machine-learning'
  },
  {
    name: 'Sustainability',
    image: 'https://image.pollinations.ai/prompt/sustainability%20wind%20turbines%20and%20solar%20panels,%20environmental%20research?width=1000&height=600&nologo=true',
    slug: 'sustainability'
  },
  {
    name: 'COVID-19',
    image: 'https://image.pollinations.ai/prompt/covid%20virus%20research%20visualization,%20medical,%20scientific?width=1000&height=600&nologo=true',
    slug: 'covid-19'
  },
  {
    name: 'Neuroscience',
    image: 'https://image.pollinations.ai/prompt/neuroscience%20brain%20research%20visualization,%20neurons,%20scientific?width=1000&height=600&nologo=true',
    slug: 'neuroscience'
  },
  {
    name: 'Quantum Computing',
    image: 'https://image.pollinations.ai/prompt/quantum%20computing%20visualization,%20scientific,%20technological?width=1000&height=600&nologo=true',
    slug: 'quantum-computing'
  },
  {
    name: 'Artificial Intelligence',
    image: 'https://image.pollinations.ai/prompt/artificial%20intelligence%20visualization,%20technology,%20futuristic?width=1000&height=600&nologo=true',
    slug: 'ai'
  },
  {
    name: 'Climate Change',
    image: 'https://image.pollinations.ai/prompt/climate%20change%20research%20visualization,%20environmental%20science?width=1000&height=600&nologo=true',
    slug: 'climate-change'
  },
  {
    name: 'Genetics',
    image: 'https://image.pollinations.ai/prompt/genetics%20dna%20research%20visualization,%20molecular%20biology?width=1000&height=600&nologo=true',
    slug: 'genetics'
  }
]

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    console.log('Home page mounted')
  }, [])

  const handleTopicClick = (topic: string) => {
    console.log(`Searching for topic: ${topic}`)
    // Encode the topic name for the URL
    const encodedTopic = encodeURIComponent(topic)
    // Navigate to a search results page with both grants and research
    router.push(`/search?q=${encodedTopic}`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Explore popular keywords</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.slug}
            onClick={() => handleTopicClick(topic.name)}
            className="group relative aspect-[3/2] overflow-hidden rounded-xl bg-muted text-left"
          >
            <Image
              src={topic.image}
              alt={topic.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => console.log(`Image loaded for topic: ${topic.name}`)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-semibold text-white">{topic.name}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
