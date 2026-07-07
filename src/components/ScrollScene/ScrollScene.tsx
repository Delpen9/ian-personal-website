import { useEffect, useRef } from 'react'
import { useInViewport } from '../../hooks/useInViewport'
import styles from './ScrollScene.module.css'

type Props = {
  video: string
  poster?: string
  eyebrow?: string
  title: string
  body: string
}

/**
 * A full-viewport scroll scene. Extensible unit for the page below the hero:
 * lazy-loads its video (src attaches only in view) and plays/pauses on visibility.
 */
export function ScrollScene({ video, poster, eyebrow, title, body }: Props) {
  const { ref, inView } = useInViewport<HTMLElement>(0.4)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) void v.play().catch(() => {})
    else v.pause()
  }, [inView])

  return (
    <section ref={ref} className={styles.scene} data-inview={inView}>
      <video
        ref={videoRef}
        className={styles.video}
        // ponytail: src attaches only when in view → no fetch until near screen.
        src={inView ? video : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
      />
      <div className={styles.overlay}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>
    </section>
  )
}
