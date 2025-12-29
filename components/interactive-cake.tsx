"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2 } from "lucide-react"

export function InteractiveCake() {
  const [isBlown, setIsBlown] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  // Generate random positions once and reuse them
  const sprinklePositions = useMemo(() => 
    Array.from({ length: 20 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random()
    })),
    []
  )

  // Auto hide celebration after 5 seconds
  useEffect(() => {
    if (isBlown) {
      setShowCelebration(true)
      const timer = setTimeout(() => {
        setShowCelebration(false)
      }, 5000) // 5 detik
      
      return () => clearTimeout(timer)
    }
  }, [isBlown])

  return (
    <>
      <section className="py-16 md:py-32 px-4 md:px-6 flex flex-col items-center relative overflow-hidden bg-white/40 backdrop-blur-md rounded-2xl md:rounded-[3rem] mx-2 md:mx-4 my-8 md:my-12 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />

        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Wand2 className="text-primary animate-bounce h-4 w-4 md:h-5 md:w-5" />
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] md:tracking-[0.4em] text-primary uppercase">Special Moment</span>
        </div>
        <h3 className="text-3xl md:text-5xl lg:text-7xl font-black mb-8 md:mb-16 text-center tracking-tighter uppercase">
          Make a Wish,
          <br />
          <span className="text-primary italic font-serif normal-case tracking-normal">Sylvia Monica</span>
        </h3>

        <div
          className="relative cursor-pointer group active:scale-95 transition-transform scale-75 md:scale-90 lg:scale-100"
          onClick={() => {
            if (!isBlown) {
              setClicks((prev) => prev + 1)
              if (clicks >= 4) setIsBlown(true)
            }
          }}
        >
          <div className="relative w-64 md:w-80 h-48 md:h-64 flex flex-col items-center justify-end">
            {/* Top Layer */}
            <div className="w-48 md:w-64 h-16 md:h-24 bg-gradient-to-b from-white to-pink-50 rounded-t-3xl shadow-lg relative z-30 border-x border-t border-primary/10">
              <div className="absolute -bottom-2 left-0 w-full h-6 bg-pink-100/50 rounded-full blur-sm" />
              {/* Drip Effect */}
              <div className="absolute top-4 md:top-8 left-0 w-full flex justify-around px-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 md:w-4 h-6 md:h-8 bg-white rounded-b-full shadow-sm" />
                ))}
              </div>
            </div>

            {/* Bottom Layer */}
            <div className="w-64 md:w-80 h-24 md:h-32 bg-gradient-to-b from-pink-50 to-pink-100 rounded-t-3xl -mt-4 shadow-xl relative z-20 border-x border-t border-primary/10">
              {/* Sprinkles/Dots */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-t-3xl">
                {sprinklePositions.map((pos, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2 + pos.delay, repeat: Number.POSITIVE_INFINITY, delay: pos.delay }}
                    className="absolute w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-primary/20 shadow-sm"
                    style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Golden Stand */}
            <div className="w-72 md:w-96 h-4 md:h-6 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full shadow-2xl relative z-10 border-b-2 md:border-b-4 border-yellow-700/30" />
          </div>

          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-10 z-40">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="relative w-4 md:w-5 h-16 md:h-24 bg-gradient-to-b from-accent to-accent/80 rounded-full border-b-2 md:border-b-4 border-black/5 shadow-inner"
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-full bg-white/20 rounded-full" />
                <AnimatePresence>
                  {!isBlown && (
                    <motion.div
                      exit={{ opacity: 0, scale: 0, y: -20 }}
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 8, -8, 0],
                        y: [0, -4, 0],
                        filter: ["blur(1px)", "blur(2px)", "blur(1px)"],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                      className="absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 w-6 md:w-8 h-8 md:h-12 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-200 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.6)] md:shadow-[0_0_20px_rgba(251,146,60,0.6)]"
                    >
                      <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 w-2 md:w-3 h-4 md:h-6 bg-yellow-100 rounded-full opacity-60" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Wish Meter */}
          {!isBlown && (
            <div className="hidden md:block absolute -left-16 top-0 bottom-0 w-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-primary"
                initial={{ height: "0%" }}
                animate={{ height: `${(clicks / 5) * 100}%` }}
              />
            </div>
          )}

          {/* Interaction Hint */}
          <AnimatePresence>
            {!isBlown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-16 md:-bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              >
                <p className="text-center text-[10px] md:text-xs font-bold tracking-wider md:tracking-widest text-primary uppercase">
                  {clicks === 0 ? "Blow the candles (Click!)" : `Wish intensity: ${clicks * 20}%`}
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-colors ${i < clicks ? "bg-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Fullscreen Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(244,236,233,0.95) 0%, rgba(233,213,202,0.95) 50%, rgba(212,163,115,0.95) 100%)'
            }}
          >
            {/* Emoji rain across entire screen */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -100,
                    x: `${Math.random() * 100}vw`,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    y: '110vh',
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.5, 1, 0.5],
                    rotate: [0, 360, 720]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    ease: "easeOut",
                    delay: i * 0.1
                  }}
                  className="absolute text-4xl md:text-6xl"
                  style={{
                    left: `${Math.random() * 100}%`
                  }}
                >
                  {["💖", "✨", "🌸", "🎁", "🎂", "🎉", "🎈", "🌟", "💝", "🎊"][i % 10]}
                </motion.div>
              ))}
            </div>

            {/* Center message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10 text-center px-6 max-w-2xl"
            >
              <motion.h4 
                className="text-5xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter uppercase italic mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Wish Sent!
              </motion.h4>
              <motion.p 
                className="text-foreground font-serif italic text-xl md:text-3xl lg:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Semoga di usia 20 tahun ini, hidup memperlakukanmu seindah dirimu.
              </motion.p>
            </motion.div>

            {/* Sparkle effects */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-3 h-3 bg-primary/40 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}