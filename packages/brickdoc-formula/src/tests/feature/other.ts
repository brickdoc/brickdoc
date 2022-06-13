import { TestCaseInterface } from '../testType'

export const OtherTestCase: TestCaseInterface = {
  name: 'other',
  testCases: {
    successTestCases: [
      { definition: '=1.123%', result: 0.01123 },
      { definition: '=01.2000100', result: 1.20001 }
    ],
    errorTestCases: [
      { definition: '=a', errorType: 'syntax', errorMessage: '"a" not found' },
      { definition: '=-1.%', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '=hel"lo', errorType: 'syntax', errorMessage: '"hel" not found' },
      { definition: '=he中文"', errorType: 'syntax', errorMessage: '"he中文" not found' },
      { definition: '=中文"123asd', errorType: 'parse', errorMessage: 'Parse error: "中文\\"123asd"', valid: false },
      { definition: '=1:', errorType: 'type', errorMessage: 'Expected Cell but got number' },
      { definition: '=1:1', errorType: 'type', errorMessage: 'Expected Cell but got number' },
      { definition: '=1.%', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '="123":1', errorType: 'type', errorMessage: 'Expected Cell but got string' },
      { definition: '=)=', errorType: 'syntax', errorMessage: 'Missing expression' },
      { definition: '=>=', errorType: 'parse', errorMessage: 'Parse error: ""', valid: false },
      { definition: '=<', errorType: 'parse', errorMessage: 'Parse error: ""', valid: false },
      { definition: '=<>', errorType: 'parse', errorMessage: 'Parse error: ""', valid: false },
      { definition: '=ABS(1 {a: 1}.a', errorType: 'type', errorMessage: 'Expected Cell but got number' },
      { definition: '=(1 {}.', errorType: 'syntax', errorMessage: 'Missing closing token' },
      {
        definition: '== 1',
        newAbbrevInput: '==1',
        todo: 'fix space',
        errorType: 'parse',
        errorMessage: 'TODO mismatch token startExpression',
        valid: false
      }
    ]
  }
}