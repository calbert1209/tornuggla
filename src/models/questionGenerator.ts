import type { Question } from './game'

export const generateTwoDigitQuestion = (): Question => {
  const values = [
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
  ]
  const [a, b] = [Math.max(...values), Math.min(...values)]
  return { a, b }
}

export const generateOperator = (): '+' | '-' =>
  Math.random() > 0.5 ? '+' : '-'
