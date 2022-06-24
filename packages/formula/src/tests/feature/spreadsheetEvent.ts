import {
  dispatchFormulaSpreadsheetNameChange,
  dispatchFormulaSpreadsheetRemove,
  FormulaContextNameChanged,
  FormulaContextNameRemove,
  FormulaSpreadsheetDeleted,
  FormulaUpdatedViaId
} from '../../events'
import { mockCell, mockColumn, mockRow, mockSpreadsheet } from '../testMock'
import { SpreadsheetInput, TestCaseInterface } from '../testType'

const page0Id = '44444444-5555-bbbb-7777-444444444444'
const spreadsheet1Id = '44444444-5555-cccc-8888-444444444444'
const spreadsheet2Id = '44444444-6666-dddd-8888-444444444444'
const column1Id = '44444444-7777-cccc-8888-444444444444'
const cell1Id = '44444444-9999-dddd-8888-444444444444'

interface AllowEvents {
  changeName: typeof dispatchFormulaSpreadsheetNameChange
  delete: typeof dispatchFormulaSpreadsheetRemove
}

type DistributeEvents<Event extends keyof AllowEvents> = Event extends keyof AllowEvents
  ? [AllowEvents[Event], Omit<Parameters<AllowEvents[Event]>[0], 'username'>]
  : never

const buildEvent: (
  input: Array<DistributeEvents<keyof AllowEvents>>
) => NonNullable<TestCaseInterface['testCases']['eventTestCases']>[0]['event'] = input => {
  return async ctx => {
    for (const [f, args] of input) {
      await f({ ...args, username: ctx.formulaContext.domain } as any)
    }
  }
}

export const SpreadsheetEventTestCase: TestCaseInterface = {
  name: 'spreadsheetEvent',
  testCases: {
    pages: [
      {
        pageName: 'SpreadsheetEventPage1',
        pageId: page0Id,
        variables: [{ variableName: 'num0', definition: '=0' }],
        spreadsheets: [
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<3, 3>>{
            name: 'spreadsheet1foobar',
            spreadsheetId: spreadsheet1Id,
            columns: [
              {
                name: 'first',
                columnId: column1Id,
                displayIndex: 'A',
                cells: [{ value: '1', cellId: cell1Id }, { value: '3' }, { value: '5' }]
              },
              {
                name: 'second',
                displayIndex: 'B',
                cells: [{ value: '2' }, { value: '4' }, { value: '6' }]
              },
              {
                name: 'third',
                displayIndex: 'C',
                cells: [{ value: '3' }, { value: '' }, { value: 'Foo' }]
              }
            ]
          },
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          <SpreadsheetInput<0, 0>>{
            name: 'Spreadsheet2 2',
            spreadsheetId: spreadsheet2Id,
            columns: []
          }
        ]
      }
    ],
    eventTestCases: [
      {
        definition: '=SpreadsheetEventPage1.spreadsheet1foobar',
        resultBefore: mockSpreadsheet('spreadsheet1foobar', spreadsheet1Id),
        resultAfter: mockSpreadsheet('spreadsheet1foobar', spreadsheet1Id),
        event: buildEvent([])
      },
      {
        definition: '=SpreadsheetEventPage1."Spreadsheet2 2"',
        resultBefore: mockSpreadsheet('Spreadsheet2 2', spreadsheet2Id),
        resultAfter: mockSpreadsheet('Spreadsheet2 2', spreadsheet2Id),
        event: buildEvent([])
      },
      {
        definition: '=SpreadsheetEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        resultAfter: '"unknownVariable" not found',
        event: buildEvent([])
      },
      {
        definition: '=SpreadsheetEventPage1.spreadsheet1foobar',
        resultBefore: mockSpreadsheet('spreadsheet1foobar', spreadsheet1Id),
        resultAfter: mockSpreadsheet('spreadsheet2foobar', spreadsheet1Id),
        variableParseResultAfter: { definition: '=SpreadsheetEventPage1.spreadsheet2foobar' },
        event: buildEvent([
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'spreadsheet2foobar', namespaceId: page0Id }
          ]
        ])
      },
      {
        definition: '=spreadsheet1foobar',
        namespaceId: page0Id,
        resultBefore: mockSpreadsheet('spreadsheet1foobar', spreadsheet1Id),
        resultAfter: mockSpreadsheet('spreadsheet2foobar', spreadsheet1Id),
        variableParseResultAfter: { definition: '=spreadsheet2foobar' },
        event: buildEvent([
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'spreadsheet2foobar', namespaceId: page0Id }
          ]
        ])
      },
      {
        definition: '=spreadsheet1foobar.first',
        namespaceId: page0Id,
        resultBefore: mockColumn('first', column1Id),
        resultAfter: mockColumn('first', column1Id),
        variableParseResultAfter: { definition: '=spreadsheet2foobar.first' },
        event: buildEvent([
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'spreadsheet2foobar', namespaceId: page0Id }
          ]
        ])
      },
      {
        definition: '=spreadsheet1foobar.1',
        namespaceId: page0Id,
        resultBefore: mockRow('1'),
        resultAfter: mockRow('1'),
        variableParseResultAfter: { definition: '=spreadsheet2foobar.1' },
        event: buildEvent([
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'spreadsheet2foobar', namespaceId: page0Id }
          ]
        ])
      },
      {
        definition: '=spreadsheet1foobar.first[1]',
        namespaceId: page0Id,
        resultBefore: mockCell('1', cell1Id, column1Id, '1'),
        resultAfter: mockCell('1', cell1Id, column1Id, '1'),
        variableParseResultAfter: { definition: '=spreadsheet2foobar.first[1]' },
        event: buildEvent([
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'spreadsheet2foobar', namespaceId: page0Id }
          ]
        ])
      },
      {
        definition: '=SpreadsheetEventPage1.unknownVariable',
        resultBefore: '"unknownVariable" not found',
        resultAfter: mockSpreadsheet('foo bar zzz', spreadsheet1Id),
        variableParseResultAfter: { definition: '=SpreadsheetEventPage1."foo bar zzz"' },
        event: buildEvent([
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'unknownVariable', namespaceId: page0Id }
          ],
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'foo bar zzz', namespaceId: page0Id }
          ]
        ])
      },
      {
        definition: '=SpreadsheetEventPage1.spreadsheet1foobar',
        resultBefore: mockSpreadsheet('spreadsheet1foobar', spreadsheet1Id),
        resultAfter: '"spreadsheet1foobar" not found',
        triggerEvents: ctx => [
          {
            event: FormulaSpreadsheetDeleted,
            eventId: `${ctx.formulaContext.domain}#${spreadsheet1Id}`,
            payload: { id: spreadsheet1Id, username: ctx.formulaContext.domain }
          },
          {
            event: FormulaContextNameRemove,
            eventId: `${ctx.formulaContext.domain}#${page0Id}#spreadsheet1foobar`
          },
          {
            event: FormulaUpdatedViaId,
            eventId: `${ctx.meta.namespaceId},${ctx.meta.variableId}`
          },
          {
            event: FormulaContextNameChanged,
            eventId: `${ctx.formulaContext.domain}#${ctx.meta.namespaceId}#${ctx.meta.name}`,
            callLength: 0
          }
        ],
        event: buildEvent([[dispatchFormulaSpreadsheetRemove, { id: spreadsheet1Id }]])
      },
      {
        definition: '=SpreadsheetEventPage1.spreadsheet1foobar',
        resultBefore: mockSpreadsheet('spreadsheet1foobar', spreadsheet1Id),
        resultAfter: '"spreadsheet1foobar" not found',
        triggerEvents: ctx => [
          {
            event: FormulaSpreadsheetDeleted,
            eventId: `${ctx.formulaContext.domain}#${spreadsheet1Id}`,
            payload: { id: spreadsheet1Id, username: ctx.formulaContext.domain }
          },
          {
            event: FormulaContextNameRemove,
            eventId: `${ctx.formulaContext.domain}#${page0Id}#spreadsheet1foobar`
          },
          {
            event: FormulaUpdatedViaId,
            eventId: `${ctx.meta.namespaceId},${ctx.meta.variableId}`
          },
          {
            event: FormulaContextNameChanged,
            eventId: `${ctx.formulaContext.domain}#${ctx.meta.namespaceId}#${ctx.meta.name}`,
            callLength: 0
          }
        ],
        event: buildEvent([
          [dispatchFormulaSpreadsheetRemove, { id: spreadsheet1Id }],
          [
            dispatchFormulaSpreadsheetNameChange,
            { spreadsheetId: spreadsheet1Id, title: 'spreadsheet2foobar', namespaceId: page0Id }
          ]
        ])
      }
    ]
  }
}