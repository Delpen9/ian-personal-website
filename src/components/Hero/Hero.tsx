import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useHeroState } from '../../hooks/useHeroState'
import { Panel } from '../Panel/Panel'
import styles from './Hero.module.css'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { active, activate, deactivate } = useHeroState()
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play the boomerang only while active (and motion is allowed). Reset to the
  // poster frame on leave so idle always shows frame 0.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active && !reduce) {
      void v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [active, reduce])

  return (
    <section
      className={styles.hero}
      data-state={active ? 'active' : 'idle'}
      // Pointer + keyboard: hover OR focus reveals; symmetric on exit/blur.
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      tabIndex={0}
      aria-label="Sintra — hover or focus to reveal"
    >
      <div className={styles.rail} aria-hidden={active}>
        <AnimatePresence>
          {!active && (
            <motion.h1
              className={styles.wordmark}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              Sintra
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.stage}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/video/sintra-boomerang.mp4"
          poster="/video/sintra-poster.webp"
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className={styles.dim} data-hidden={active} />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.panelWrap}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Panel />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
