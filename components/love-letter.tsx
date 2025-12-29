"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Send, Sparkles, BookHeart, X } from "lucide-react"

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <section className="py-40 px-6 flex flex-col items-center relative overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

      <div className="relative max-w-4xl w-full flex flex-col items-center z-10">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="text-primary w-5 h-5" />
              <span className="text-xs font-bold tracking-[0.5em] text-primary uppercase">The Final Gift</span>
            </div>

            <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Pesan
              <br />
              Pribadi
            </h3>

            <motion.button
              onClick={() => setIsOpen(true)}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              className="group relative px-12 py-6 bg-primary text-white font-bold text-lg uppercase tracking-widest overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                Buka Pesan{" "}
                <Send className={`w-5 h-5 transition-transform ${hovered ? "translate-x-2 -translate-y-2" : ""}`} />
              </span>
              <motion.div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -100 }}
              className="bg-white p-10 md:p-24 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden text-foreground w-full border-[10px] border-primary/5"
            >
              <div className="absolute top-10 right-10 flex flex-col items-center gap-1 border-2 border-primary/20 p-4 rotate-12 bg-white">
                <span className="text-[10px] font-black uppercase text-primary/40 leading-none">Special Delivery</span>
                <span className="text-lg font-black text-primary leading-none">SM-20</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-2">
                  <Heart size={16} fill="var(--primary)" className="text-primary" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-12">
                <BookHeart className="text-primary w-8 h-8" />
                <div className="h-[2px] flex-grow bg-primary/10" />
              </div>

              <h4 className="text-5xl font-serif italic mb-10 text-primary"><br></br>Untukmu Sayang,</h4>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Hari ini bukan hari biasa, 20 tahun lalu, dunia menjadi sedikit lebih terang karena kehadiranmu. Melihatmu tersnyum dan tertawa adalah anugerah terbesar dalam hidupku.
                </p>
                <p>
                  Di usia 20 tahun, dunia yang membentang luas di hadapanmu. Kebaikan hatimu, kekuatanmu, dan senyuman indahmu adalah segalanya yang selalu aku harapkan.
                </p>
                <p>
                  Semoga tahun yang akan datang membawa hal baik dalam hidupmu. Aku akan selalu di sini, di sampingmu, mendukung dan menyemangatimu di setiap langkah.
                </p>
                <p>
                  Di usia ke-20 ini, aku berdoa agar kamu selalu dikelilingi kebahagiaan. Teruslah bersinar, teruslah berani, dan jangan pernah lupa betapa berharganya setiap perjalanan yang kamu tempuh.
                </p>
                <p>
                  Selamat ulang tahun untukmu yang kini berusia 20 tahun. Untuk kita, dan untuk banyak tahun ke depan dalam merayakan dirimu.
                </p>

                <div className="pt-12 flex flex-col items-end">
                  <p className="text-muted-foreground text-sm uppercase tracking-widest mb-5 font-bold">
                    With all my love, Mas.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="absolute bottom-5 text-xs font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors flex items-center gap-2"
              >
                <X size={14} /> Close secret folder
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
