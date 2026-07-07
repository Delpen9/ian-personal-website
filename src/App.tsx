import { Hero } from './components/Hero/Hero'
import { ScrollScene } from './components/ScrollScene/ScrollScene'

export default function App() {
  return (
    <>
      <Hero />

      {/* Duplicate this block to add scenes. Each lazy-loads its own video and
          only plays while on screen. Swap the src for real footage per scene. */}
      <ScrollScene
        video="/video/sintra-boomerang.mp4"
        poster="/video/sintra-poster.webp"
        eyebrow="Scene 01"
        title="Beneath the surface"
        body="This is the extensible scroll scene. Copy the <ScrollScene> in App.tsx, point it at another clip, and it reveals and plays itself as it enters the viewport."
      />
    </>
  )
}
