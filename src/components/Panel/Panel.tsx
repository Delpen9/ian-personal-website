import styles from './Panel.module.css'

/** Content panel that slides in on hover. Fill nav / tagline / CTA as needed. */
export function Panel() {
  return (
    <aside className={styles.panel}>
      <nav className={styles.nav}>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className={styles.body}>
        <p className={styles.tagline}>Cinematic stories, told frame by frame.</p>
        <a className={styles.cta} href="#work">
          Enter&nbsp;→
        </a>
      </div>
    </aside>
  )
}
