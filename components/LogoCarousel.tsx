'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { DISTRIBUTORS } from '@/lib/distributors'

import 'swiper/css'
import 'swiper/css/pagination'

export function LogoCarousel() {
  return (
    <section className="py-12 md:py-16 bg-[#f6f6f6]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 uppercase tracking-tight text-gray-900">
          DISTRIBUIDORES AUTORIZADOS
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 50,
            },
            1536: {
              slidesPerView: 8,
              spaceBetween: 60,
            },
          }}
          className="logo-carousel-swiper"
        >
          {DISTRIBUTORS.map((distributor) => (
            <SwiperSlide key={distributor.id}>
              <div className="flex items-center justify-center h-24 md:h-32 px-4">
                <div className="relative w-full h-full max-h-[100px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <Image
                    src={distributor.logo}
                    alt={distributor.name}
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
