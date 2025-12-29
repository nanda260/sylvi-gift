"use client"

import { BirthdayHero } from "@/components/birthday-hero"
import { MemoryGallery } from "@/components/memory-gallery"
import { LoveLetter } from "@/components/love-letter"
import { InteractiveCake } from "@/components/interactive-cake"
import { useState, useRef } from "react"
import { Play, Pause, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"


export default function BirthdayPage() {
  const name = "Sylvia Monica"
  const age = 20
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [currentLyric, setCurrentLyric] = useState<number | null>(null)
  const [showLyrics, setShowLyrics] = useState(false)
  const [showContent, setShowContent] = useState(false)
  
  const lyrics = [
    { text: "Selamat datang di dua puluh", time: 500 },
    { text: "Segala doa yang baik adanya,", time: 3800 },
    { text: "untukmu dan mimpimu yang mulia", time: 8900 }
  ]

  const handleEnter = async () => {
    setShowSplash(false)
    setShowLyrics(true)

    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)

        // Start lyrics animation
        lyrics.forEach((lyric, index) => {
          setTimeout(() => {
            setCurrentLyric(index)
            // Hide lyric after 3 seconds
            setTimeout(() => {
              setCurrentLyric(null)
              if (index === lyrics.length - 1) {
                // Setelah lirik terakhir selesai, tunggu sebentar lalu tampilkan konten
                setTimeout(() => {
                  setShowLyrics(false)
                  setShowContent(true)
                }, 500)
              }
            }, 3000)
          }, lyric.time)
        })

      } catch (error) {
        console.log("Failed to play audio:", error)
        setShowSplash(false)
        setShowContent(true)
      }
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/birthday-song.mp3"
      />

      {/* Lyrics Overlay - Fullscreen dengan tone website */}
      <AnimatePresence mode="wait">
        {showLyrics && (
          <motion.div
            key="lyrics-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #f4ece9 0%, #e9d5ca 50%, #d4a373 100%)'
            }}
          >
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Sparkle icons floating */}
            <Sparkles className="absolute top-20 left-20 w-12 h-12 text-primary/30 floating" style={{ animationDelay: '0s' }} />
            <Sparkles className="absolute top-40 right-32 w-8 h-8 text-primary/40 floating" style={{ animationDelay: '1s' }} />
            <Sparkles className="absolute bottom-32 left-40 w-10 h-10 text-primary/30 floating" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute bottom-20 right-20 w-12 h-12 text-primary/40 floating" style={{ animationDelay: '1.5s' }} />

            <AnimatePresence mode="wait">
              {currentLyric !== null && (
                <motion.div
                  key={`lyric-${currentLyric}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0]
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    opacity: { duration: 0.8, ease: "easeOut" },
                    scale: { duration: 0.8, ease: "easeOut" },
                    y: { 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-foreground drop-shadow-[0_4px_20px_rgba(212,163,115,0.4)] max-w-5xl px-8 text-center relative z-10"
                >
                  {lyrics[currentLyric].text.split(' ').map((word, i) => (
                    <motion.span
                      key={`${currentLyric}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6,
                        delay: i * 0.15,
                        ease: "easeOut"
                      }}
                      className="inline-block mr-3 md:mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center">
          <div className="text-center space-y-8 px-6">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                Sylvia
              </h1>
              <p className="text-2xl md:text-4xl font-serif italic text-primary">
                Monica
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                Hadiah kecil untukmu, Sayang.
              </p>
              <button
                onClick={handleEnter}
                className="group relative px-8 md:px-12 py-4 md:py-6 bg-primary text-white font-bold text-sm md:text-lg uppercase tracking-widest overflow-hidden transition-all hover:scale-105 shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Enter
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-white" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Music Controller */}
        <button
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group border-4 border-white/20"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75" style={{ animationDuration: '2s' }} />
          {isPlaying ? (
            <Pause className="w-6 h-6 md:w-7 md:h-7 relative z-10 fill-white" />
          ) : (
            <Play className="w-6 h-6 md:w-7 md:h-7 relative z-10 ml-1 fill-white" />
          )}
        </button>

        {/* Editorial Navigation */}
        <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
          <span className="text-white text-xs font-bold uppercase tracking-[0.3em] pointer-events-auto cursor-default">
            SM/20
          </span>
          <div className="flex gap-8 pointer-events-auto">
            {[
              { label: "Wish", id: "cake" },
              { label: "Archive", id: "gallery" },
              { label: "Letter", id: "letter" }
            ].map((nav) => (
              <span
                key={nav.label}
                onClick={() => handleScroll(nav.id)}
                className="text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:opacity-50 transition-opacity"
              >
                {nav.label}
              </span>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <BirthdayHero name={name} age={age} />

        {/* Interactive Cake Section */}
        <section id="cake" className="bg-background py-24 border-t border-foreground/5 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="absolute -top-12 -left-12 text-[12rem] font-serif italic text-primary/10 select-none">
                  Wish
                </div>
                <InteractiveCake />
              </div>
              <div className="space-y-8">
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                  Make A <br />
                  <span className="text-editorial">Wish,</span> <br />
                  My Love
                </h3>
                <p className="text-lg text-muted-foreground font-serif italic leading-relaxed">
Tiup lilinnya untuk membuka bab selanjutnya dari perjalanan kita bersama-sama.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Memories Gallery */}
        <div id="gallery">
          <MemoryGallery />
        </div>

        {/* The Love Letter Section */}
        <div id="letter">
          <LoveLetter />
        </div>

        {/* Simplified Footer */}
        <footer className="bg-background border-t border-foreground/5 py-12 px-8 flex flex-col items-center justify-center gap-6">
          <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-60 text-center">
            2026 All Rights Reserved. Crafted with Love, Mas.
          </p>
          <div className="text-[15vw] leading-[0.7] font-serif italic tracking-tighter text-primary/5 select-none text-center">
            Sylvia
          </div>
        </footer>
      </motion.div>
    </main>
  )
}