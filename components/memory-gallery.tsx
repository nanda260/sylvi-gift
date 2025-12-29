"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Camera } from "lucide-react"

const memories = [
  { id: 1, title: "First Meet", image: "/1.jpg", subtitle: "Oktober, 2025" },
  { id: 2, title: "Ours Photobooth", image: "/2.jpg", subtitle: "Oktober, 2025" },
  { id: 3, title: "First Flower", image: "/3.jpg", subtitle: "November, 2025" },
  { id: 4, title: "Malang's Date", image: "/4.jpeg", subtitle: "Desember, 2025" },
]

export function MemoryGallery() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background border-t border-foreground/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 md:sticky top-24 self-start">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest">Archive</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
            Our
            <br />
            <span className="text-editorial">Stories</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-sm mb-12">
            Setiap frame menyimpan cerita kita. Momen-momen kecil yang mengukir kisah kita, dan kamulah peran utamanya hari ini.
          </p>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group aspect-[4/5] relative overflow-hidden bg-neutral-200 grayscale hover:grayscale-0 transition-all duration-700"
            >
              <Image
                src={memory.image || "/placeholder.svg"}
                alt={memory.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-xs uppercase tracking-widest mb-2 font-bold">{memory.subtitle}</p>
                <h4 className="text-white text-4xl font-serif italic leading-none">{memory.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
