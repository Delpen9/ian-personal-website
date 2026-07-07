import { test } from 'node:test'
import assert from 'node:assert/strict'
import { heroReducer } from './heroMachine.ts'

// Run: npm test  (node --test with built-in TS type stripping, no framework)
test('hero state machine is symmetric', () => {
  assert.equal(heroReducer('idle', 'enter'), 'active') // hover in
  assert.equal(heroReducer('active', 'leave'), 'idle') // hover out
  assert.equal(heroReducer('idle', 'leave'), 'idle') // leave while idle = no-op
  assert.equal(heroReducer('active', 'enter'), 'active') // re-enter while active = no-op
})
