import type { Question } from './game'

export function generateTwoDigitQuestion(): Question {
  const values = [
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
  ]
  const [a, b] = [Math.max(...values), Math.min(...values)]
  return { a, b }
}

export function generateOperator(): '+' | '-' {
  return Math.random() > 0.5 ? '+' : '-'
}
