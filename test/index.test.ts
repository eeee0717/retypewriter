import { describe, expect, it } from 'vitest'
import { applyPatches, calculatePatch, diff } from '../src'

const input = `
import { describe, expect, it } from 'vitest'
import type { Diff } from 'diff-match-patch'

describe('should', () => {
  it('exported', () => {
    expect(1).toEqual(1)
  })
})
`

const output = `
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('one', () => {
    expect(1).toEqual(1)
    expect(2).toEqual(2)
  })
})
`

describe('should', () => {
  it('exported', () => {
    const delta = diff(input, output)
    expect(delta).toMatchSnapshot('delta')
    const patches = calculatePatch(delta)
    expect(patches).toMatchSnapshot('patches')
    const applied = applyPatches(input, patches)
    expect(applied.output).toMatchSnapshot('applied')
    expect(applied.output).toEqual(output)
  })
})
