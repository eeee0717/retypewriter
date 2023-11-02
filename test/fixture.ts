
export const input = `
import { describe, expect, it } from 'vitest'
import type { Diff } from 'diff-match-patch'

describe('should', () => {
  it('exported', () => {
    expect(1).toEqual(1)
  })
})
`

export const output = `
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('one', () => {
    expect(1).toEqual(1)
    expect(2).toEqual(2)
  })
})
`
