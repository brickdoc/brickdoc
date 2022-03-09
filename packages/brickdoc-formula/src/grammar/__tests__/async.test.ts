import { interpretAsync, parse } from '../core'
import { FormulaContext } from '../../context'
import { VariableMetadata, VariableValue } from '../../types'
import { quickInsert } from '../testHelper'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const barVariableId = '6c1bc8c7-9849-45cb-81d8-10874d1acf30'

const formulaContext = new FormulaContext({})

const meta: VariableMetadata = {
  namespaceId,
  variableId,
  name: 'foo',
  input: '=SLEEP(24)',
  position: 0,
  type: 'normal'
}

const testCases = [
  { input: '=SLEEP(123)', output: 123, async: true },
  { input: '=SLEEP(123+1)', output: 124, async: true },
  { input: '=1+SLEEP(123)', output: NaN, async: true, todo: true },
  { input: '=SLEEP(123)+1', output: NaN, async: true, todo: true },
  { input: '=foo+1', output: 25, async: false }
]

const ctx = {
  formulaContext,
  meta,
  interpretContext: { ctx: {}, arguments: [] }
}

describe('async', () => {
  beforeAll(async () => {
    jest.useRealTimers()
    await quickInsert({ ctx })
    jest.clearAllTimers()
  })

  it.each(testCases)('[async: $async] "$input"', async ({ input, output, async }) => {
    jest.useRealTimers()

    const newMeta = { ...meta, variableId: barVariableId, input, name: 'bar' }
    const newCtx = { ...ctx, meta: newMeta }
    const parseResult = parse({ ctx: newCtx })
    expect(parseResult.async).toBe(async)
    expect(parseResult.valid).toBe(true)
    expect(parseResult.errorMessages).toEqual([])
    expect(parseResult.success).toBe(true)

    const newVariable = interpretAsync({ ctx: newCtx, parseResult })
    expect(newVariable.t.async).toBe(true)

    await (newVariable.t.variableValue as Promise<VariableValue>).then(result => {
      expect(result.result.result).toEqual(output)
    })

    jest.clearAllTimers()
  })
})