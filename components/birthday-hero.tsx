"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function BirthdayHero({ name, age }: { name: string; age: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-background"
    >
      {/* Editorial Vertical Columns */}
<div className="flex-1 border-r border-foreground/5 relative min-h-[50vh] md:min-h-screen z-10">
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-editorial text-4xl md:text-6xl text-primary"
          >
            The Grace of
          </motion.h2>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter"
          >
            {name.split(" ")[0]}
          </motion.h1>
        </div>
      </div>

      <div className="flex-1 relative min-h-[50vh] md:min-h-screen border-r border-foreground/5">
        <div className="absolute inset-0 bg-neutral-200">
          <img
            src="/atas.jpeg"
            alt={name}
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
        <div className="absolute top-8 left-8">
          <span className="text-8xl md:text-[15vw] font-serif italic opacity-10 text-primary pointer-events-none">
            {age}
          </span>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-between min-h-[30vh] md:min-h-screen">
        <div className="flex justify-end">

        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest font-bold text-primary">Est. 2006</p>
          <h1 className="text-7xl md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter">
            {name.split(" ")[1]}
          </h1>
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            Merayakan dua dekade penuh cahaya, tawa, dan jiwa indah bernama Sylvia Monica Hari ini adalah harimu.          
            </p>
        </div>
      </div>

      {/* Marquee Effect */}
      <div className="absolute bottom-0 w-full py-4 border-y border-foreground/10 overflow-hidden whitespace-nowrap bg-background z-20">
        <div className="scrolling-text inline-block">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.5em] font-bold mx-8">
              - Happy Birthday Sylvia Monica YANG KE 20 TAHUN -
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
