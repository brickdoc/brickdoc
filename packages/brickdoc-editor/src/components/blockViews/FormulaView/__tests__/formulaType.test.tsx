import { makeContext } from '@brickdoc/formula'
import { renderHook, act } from '@testing-library/react-hooks'
import { codeFragments2content, definition2content } from '../../../../helpers'
import { useFormula } from '../useFormula'

import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { FormulaType } from '../../../../extensions/marks/formulaType'
import { BrickdocEventBus, FormulaEditorUpdateTrigger } from '@brickdoc/schema'

const rootId = 'eeeeeeee-eeee-4444-8888-444444444444'
const formulaId = '22222222-2222-ffff-aaaa-999999999999'

const simpleCommonTestCases = [
  '123',
  ' 1 + 1  +  1 ',
  '123asdasd',
  'a123 1',
  `#CurrentBlock`,
  `#CurrentBlock.foo_bar`,
  'foo_bar',
  ' " " & foo_bar ',
  'a+foo_bar',
  'custom::ADD(1)'
]

interface TestCase {
  input: string
  type: 'normal' | 'spreadsheet'
}

const simpleNormalTestCases: TestCase[] = ['', ...simpleCommonTestCases].map(c => ({ input: c, type: 'normal' }))

const simpleSpreadsheetTestCases: TestCase[] = [
  '',
  '=',
  ' foo baz ',
  '   ',
  ...simpleCommonTestCases.map(input => `=${input}`)
].map(c => ({ input: c, type: 'spreadsheet' }))

describe('formulaType', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext({
      pages: [
        {
          pageName: 'formulaType',
          pageId: rootId,
          variables: [{ definition: '=123123', variableName: 'foo_bar' }]
        }
      ]
    })
    jest.clearAllTimers()
  })
  it.each([...simpleNormalTestCases, ...simpleSpreadsheetTestCases])('"$type" - "$input"', async ({ type, input }) => {
    const { result } = renderHook(() =>
      useFormula({
        formulaContext: ctx.formulaContext,
        meta: ctx.buildMeta({
          definition: '',
          variableId: formulaId,
          namespaceId: rootId,
          ...(type === 'normal'
            ? {}
            : { richType: { type: 'spreadsheet', meta: { spreadsheetId: '', columnId: '', rowId: '' } } })
        })
      })
    )

    const editorPosition = 0
    const jsonContent = definition2content(input, type === 'normal')[0]

    await act(async () => {
      const result = BrickdocEventBus.dispatch(
        FormulaEditorUpdateTrigger({ formulaId, rootId, content: jsonContent, position: editorPosition })
      )

      await Promise.all(result)
    })

    const content = codeFragments2content(
      result.current.temporaryVariableT!.variableParseResult.codeFragments,
      type === 'normal'
    )[0]

    const { container } = render(<TestEditorContent content={content} extensions={[FormulaType]} />)

    expect(container).toMatchSnapshot()
  })
})
