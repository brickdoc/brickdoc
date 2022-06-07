import { parse } from '../grammar/core'
import { makeContext } from '../tests/testHelper'
import { buildTestCases } from '../tests'

const [testCases] = buildTestCases('complete')

describe('completer', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  it.each([...testCases.successTestCases, ...testCases.errorTestCases])('$jestTitle', async args => {
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const parseResult = parse(newCtx)
    expect(parseResult.completions.length).not.toBe(0)
    const groupOption = args.groupOptions.find(g => g.name === 'complete')!.options
    // console.log(parseResult.completions[0])
    expect(parseResult.completions[0]).toMatchObject(groupOption)
  })
})