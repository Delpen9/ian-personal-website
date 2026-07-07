export type HeroState = 'idle' | 'active'
export type HeroEvent = 'enter' | 'leave'

/**
 * Pure hero state machine: idle ⇄ active.
 * Kept free of React so it can be unit-tested in isolation (see heroMachine.test.ts).
 */
export function heroReducer(_state: HeroState, event: HeroEvent): HeroState {
  return event === 'enter' ? 'active' : 'idle'
}
