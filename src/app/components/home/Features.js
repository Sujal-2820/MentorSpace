'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const features = [
  {
    title: 'Smart Matching',
    description: 'Our AI-powered algorithm finds the perfect mentor-mentee matches based on skills, goals, and preferences.',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Easily schedule and manage mentorship sessions with our integrated calendar system.',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    title: 'Progress Tracking',
    description: 'Set goals, track progress, and celebrate milestones together on your mentorship journey.',
    image: '/placeholder.svg?height=400&width=600',
  },
  {
    title: 'Resource Sharing',
    description: 'Share and access a wealth of learning resources, from articles to video courses.',
    image: '/placeholder.svg?height=400&width=600',
  },
]

function FeatureItem({ feature, index }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col md:flex-row items-center justify-between min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <Image
          src={feature.image}
          alt={feature.title}
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className={`w-full md:w-1/2 mt-8 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
        <p className="text-lg text-foreground">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newActiveFeature = Math.floor(scrollPosition / windowHeight)
      setActiveFeature(newActiveFeature)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
            Everything you need for successful mentorship
          </p>
        </div>
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
          {features.map((feature, index) => (
            <div key={feature.title} className="snap-start h-screen">
              <FeatureItem feature={feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}