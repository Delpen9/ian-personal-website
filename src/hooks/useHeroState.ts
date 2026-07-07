import { useCallback, useReducer } from 'react'
import { heroReducer, type HeroState } from './heroMachine'

/** Drives the hero's idle ⇄ active transition. `active` is the derived boolean. */
export function useHeroState() {
  const [state, dispatch] = useReducer(heroReducer, 'idle' as HeroState)
  const activate = useCallback(() => dispatch('enter'), [])
  const deactivate = useCallback(() => dispatch('leave'), [])
  return { state, active: state === 'active', activate, deactivate }
}
