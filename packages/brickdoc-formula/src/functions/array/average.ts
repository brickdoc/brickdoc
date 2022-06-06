import { createFunctionClause } from '../../types'

export const arrayAverage = createFunctionClause({
  name: 'Average',
  async: false,
  lazy: false,
  persist: false,
  acceptError: false,
  pure: true,
  effect: false,
  description: 'Returns the average of the array.',
  group: 'core',
  args: [{ name: 'array', type: 'Array' }],
  examples: [{ input: '=Average([1,2,3])', output: { type: 'number', result: 2 } }],
  returns: 'number',
  testCases: [],
  chain: true,
  reference: (ctx, { result }) => {
    return { result: result.map(a => Number(a.result)).reduce((a, b) => a + b, 0) / result.length, type: 'number' }
  }
})
