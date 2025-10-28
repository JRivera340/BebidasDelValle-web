'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Package, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Collection } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { waBasketMessage } from '@/lib/whatsapp'

interface AccordionShowroomProps {
  collections: Collection[]
}

export function AccordionShowroom({ collections }: AccordionShowroomProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const colorMap = {
    red: { bg: 'bg-brand-red/10', border: 'border-brand-red', text: 'text-brand-red' },
    gold: { bg: 'bg-brand-gold/10', border: 'border-brand-gold', text: 'text-brand-gold' },
    white: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700' },
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % collections.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + collections.length) % collections.length)
  }

  // Mobile Carousel View
  if (isMobile) {
    const activeCollection = collections[activeIndex]
    return (
      <div className="relative w-full">
        <div className="relative h-[500px] rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={activeCollection.image}
                alt={activeCollection.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white space-y-3">
                <span className="text-4xl font-bold opacity-30">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-bold">{activeCollection.name}</h3>
                <p className="text-white/90 text-sm">{activeCollection.description}</p>
                
                <div className="space-y-2 py-2">
                  {activeCollection.features.map((feature, idx) => {
                    const icons = [Package, Clock, Star]
                    const Icon = icons[idx % icons.length]
                    return (
                      <div key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                        <Icon className="h-4 w-4 text-brand-gold" />
                        <span>{feature}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    <a
                      href={waBasketMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Consultar disponibilidad
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    <Link href="/colecciones">Ver todas</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Colección anterior"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Colección siguiente"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {collections.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex ? 'w-8 bg-brand-gold' : 'w-2 bg-white/50'
                }`}
                aria-label={`Ir a colección ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Desktop Accordion View
  return (
    <div className="w-full h-[600px] flex gap-2 overflow-hidden rounded-2xl">
      {collections.map((collection, index) => {
        const isActive = activeIndex === index
        const colors = colorMap[collection.color]

        return (
          <motion.div
            key={collection.id}
            layout
            initial={false}
            animate={{
              width: isActive ? '65%' : '17.5%',
            }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveIndex(index)
              }
            }}
            className="relative cursor-pointer overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-gold"
            tabIndex={0}
            role="button"
            aria-expanded={isActive}
            aria-label={`Ver ${collection.name}`}
          >
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                filter: isActive ? 'grayscale(0%)' : 'grayscale(90%)',
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
                sizes={isActive ? '65vw' : '17.5vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </motion.div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              {/* Index Number */}
              <motion.div
                className="flex items-start justify-between"
                animate={{ opacity: isActive ? 1 : 0.7 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-6xl font-bold text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/50"
                    />
                  )}
                </div>
              </motion.div>

              {/* Title and Details */}
              <div className="space-y-4">
                <motion.h3
                  className="text-white font-bold"
                  animate={{
                    fontSize: isActive ? '2.5rem' : '1.5rem',
                    writingMode: isActive ? 'horizontal-tb' : 'vertical-rl',
                    textOrientation: isActive ? 'mixed' : 'mixed',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {collection.name}
                </motion.h3>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <p className="text-white/90 text-lg max-w-xl">
                        {collection.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-1 gap-3">
                        {collection.features.map((feature, idx) => {
                          const icons = [Package, Clock, Star]
                          const Icon = icons[idx % icons.length]
                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-3 text-white/80"
                            >
                              <Icon className="h-5 w-5 text-brand-gold" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          )
                        })}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          asChild
                          variant="primary"
                          size="lg"
                          className="group/btn shadow-xl hover:shadow-2xl"
                        >
                          <a
                            href={waBasketMessage()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                            Consultar disponibilidad
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                          <Link href="/colecciones">Ver todas</Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              animate={{
                boxShadow: isActive
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  : '0 0 0 0 rgba(0, 0, 0, 0)',
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

