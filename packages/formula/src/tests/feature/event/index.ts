import { TestCaseInterface, TestCaseName } from '../../testType'
import { BlockEventTestCase } from './blockEvent'
import { ColumnEventTestCase } from './columnEvent'
import { SpreadsheetEventTestCase } from './spreadsheetEvent'
import { VariableEventTestCase } from './variableEvent'

export const EventTestCases: TestCaseInterface[] = [
  BlockEventTestCase,
  SpreadsheetEventTestCase,
  VariableEventTestCase,
  ColumnEventTestCase
]

export const EventNames: TestCaseName[] = EventTestCases.map(c => c.name)