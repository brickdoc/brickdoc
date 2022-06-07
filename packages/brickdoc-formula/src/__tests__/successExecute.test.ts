import { interpret, parse } from '../grammar'
import { makeContext, buildTestCases, trackTodo } from '../tests'
import { matchObject } from '../tests/testMock'

const [testCases] = buildTestCases()

describe('successExecute', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  trackTodo(it, testCases.successTestCases)

  it.each(testCases.successTestCases)('$jestTitle', async args => {
    jest.useRealTimers()
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const parseResult = parse(newCtx)
    expect([parseResult.variableParseResult.valid, parseResult.success, parseResult.errorMessages]).toStrictEqual([
      true,
      true,
      []
    ])

    const tempT = await interpret({ ctx: newCtx, parseResult })
    const value = await tempT.task.variableValue
    expect(matchObject(value.result.result)).toStrictEqual(args.result)

    for (const { key, match, matchType } of args.expected ?? []) {
      const matchData = [key, parseResult.variableParseResult[key]]
      switch (matchType) {
        case undefined:
        case 'toStrictEqual':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toStrictEqual([key, match])
          break
        case 'toMatchObject':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toMatchObject([key, match])
          break
        case 'toMatchSnapshot':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toMatchSnapshot()
          break
      }
    }

    jest.clearAllTimers()
  })
})