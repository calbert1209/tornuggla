import { describe, it, expect } from 'vitest'
import { generateTwoDigitQuestion, generateOperator } from '../src/questionGenerator'

describe('Question Generator', () => {
  it('should generate a question with a >= b', () => {
    for (let i = 0; i < 10; i++) {
      const q = generateTwoDigitQuestion()
      expect(q.a).toBeGreaterThanOrEqual(q.b)
      expect(q.a).toBeLessThan(6)
      expect(q.b).toBeLessThan(6)
    }
  })

  it('should generate operator', () => {
    const operators = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const op = generateOperator()
      expect(['+', '-']).toContain(op)
      operators.add(op)
    }
    // With 20 iterations, we should get both operators
    expect(operators.size).toBe(2)
  })
})
