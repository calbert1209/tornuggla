import { describe, it, expect, beforeEach } from 'vitest'
import { State, Retries } from '../src/models/game'
import type { Question } from '../src/models/game'

describe('Game State', () => {
  let state: State
  let retries: Retries

  const questionGenerator = (): Question => ({
    a: 5,
    b: 3,
  })

  beforeEach(() => {
    retries = new Retries()
    state = new State(3, retries, questionGenerator)
  })

  it('should initialize with correct max questions', () => {
    state.next()
    expect(state.getCurrent()).toEqual({ a: 5, b: 3 })
  })

  it('should move to next question on ok', () => {
    let callCount = 0
    const generator = (): Question => ({
      a: 5 + callCount++,
      b: 3,
    })
    const customState = new State(3, new Retries(), generator)
    customState.next()
    const firstQuestion = customState.getCurrent()
    customState.ok()
    const secondQuestion = customState.getCurrent()

    expect(firstQuestion).not.toEqual(secondQuestion)
  })

  it('should increment count on ok', () => {
    state.next()
    expect(state.getCount()).toBe(0)

    state.ok()
    expect(state.getCount()).toBe(1)

    state.ok()
    expect(state.getCount()).toBe(2)
  })

  it('should mark game as done when reaching max questions', () => {
    state.next() // Question 1
    state.ok()
    expect(state.isDone()).toBe(false)

    state.ok() // Question 2
    expect(state.isDone()).toBe(false)

    state.ok() // Question 3
    expect(state.isDone()).toBe(true)
  })

  it('should handle ng correctly', () => {
    state.next()
    state.getCurrent()
    state.ng()

    expect(state.getCount()).toBe(0)
  })

  it('should reset the game state', () => {
    state.next()
    state.ok()
    state.ok()

    expect(state.getCount()).toBe(2)

    state.reset()
    expect(state.getCount()).toBe(0)
    expect(state.isDone()).toBe(false)
  })
})

describe('Retries', () => {
  let retries: Retries
  const question: Question = { a: 5, b: 3 }

  beforeEach(() => {
    retries = new Retries()
  })

  it('should add a retry', () => {
    retries.add(0, question)
    expect(retries.hasRetry(2)).toBe(true)
  })

  it('should shift a retry', () => {
    retries.add(0, question)
    const shifted = retries.shift()
    expect(shifted).toEqual(question)
  })

  it('should handle multiple retries', () => {
    const q1 = { a: 1, b: 1 }
    const q2 = { a: 2, b: 2 }

    retries.add(0, q1)
    retries.add(1, q2)

    expect(retries.shift()).toEqual(q1)
    expect(retries.shift()).toEqual(q2)
  })

  it('should reset retries', () => {
    retries.add(0, question)
    retries.reset()
    expect(retries.shift()).toBeUndefined()
  })
})
