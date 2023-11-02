import { calculatePatch, diff, createAnimator } from './src'

const typingEl = document.getElementById('typing') as HTMLParagraphElement
const inputEl = document.getElementById('input') as HTMLTextAreaElement
const outputEl = document.getElementById('output') as HTMLTextAreaElement

let input = `
import { describe, expect, it } from 'vitest'
import type { Diff } from 'diff-match-patch'

describe('should', () => {
  it('exported', () => {
    expect(1).toEqual(1)
  })
})
`

let output = `
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('one', () => {
    expect(1).toEqual(1)
    expect(2).toEqual(2)
  })
})
`

inputEl.value = input
outputEl.value = output

inputEl.addEventListener('input', () => {
    input = inputEl.value
    start()
})

outputEl.addEventListener('input', () => {
    output = outputEl.value
    start()
})

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function start() {
    let _input = input
    const patches = calculatePatch(diff(_input, output))
    const animator = createAnimator(_input, patches)

    for (const result of animator) {
        typingEl.textContent = result.output
        await sleep(100)
    }
}
start()
