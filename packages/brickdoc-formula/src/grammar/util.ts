import { ILexingResult } from 'chevrotain'
import {
  AnyTypeResult,
  CodeFragment,
  ErrorMessage,
  ErrorResult,
  ExpressionType,
  FormulaColorType,
  FormulaType,
  FunctionContext
} from '../types'
import { FormulaLexer } from './lexer'

// TODO: dirty hack to get the string literal value
export const parseString = (str: string): string => {
  if (!str.startsWith('"')) {
    return str
  }
  return str.substring(1, str.length - 1).replace(/""/g, '"')
}

const lexer = FormulaLexer

const checkValidToken = (input: string): boolean => {
  const lexResult: ILexingResult = lexer.tokenize(input)
  const tokens = lexResult.tokens
  return tokens.length === 1
}

export const checkValidName = (name: string): boolean => {
  if (name.length !== name.trim().length) {
    return false
  }

  const { tokens, errors } = lexer.tokenize(name)

  if (errors.length > 0) {
    return false
  }

  if (tokens.length !== 1) {
    return false
  }

  return tokens[0].tokenType.name === 'FunctionName'
}

export const maybeEncodeString = (str: string): [boolean, string] => {
  const valid = checkValidToken(str)
  if (valid) {
    return [true, str]
  }
  return [false, encodeString(str)]
}

export const shouldReturnEarly = (result: AnyTypeResult | undefined): boolean => {
  if (!result) return false
  if (['Error', 'Blank', 'Pending'].includes(result.type)) {
    return true
  }

  return false
}

const encodeString = (str: string): string => {
  return `"${str}"`
}

export const truncateString = (str: string, length: number = 20): string => {
  if (typeof str !== 'string') return str
  if (str.length < length) return str
  // console.log({ str })
  return `${str.substring(0, length)}...`
}

export const truncateArray = (array: any[], length: number = 8): any[] => {
  if (!Array.isArray(array)) return array
  if (array.length < length) return array
  return array.slice(0, length).concat(['...'])
}

export const extractSubType = (array: AnyTypeResult[]): FormulaType => {
  const types = array.map(a => a.type)
  const uniqTypes = [...new Set(types)]

  if (uniqTypes.length === 0) {
    return 'void'
  }

  if (uniqTypes.length === 1) {
    return uniqTypes[0]
  }

  return 'any'
}

export const intersectType = (
  expectedArgumentType: ExpressionType,
  contextResultType: FormulaType,
  label: string,
  ctx: FunctionContext
): { errorMessages: ErrorMessage[]; newType: FormulaType } => {
  if (expectedArgumentType === undefined) {
    return { errorMessages: [], newType: contextResultType }
  }

  // if (contextResultType === 'Pending') {
  //   return { errorMessages: [], newType: 'any' }
  // }

  if (expectedArgumentType === 'any') {
    return { errorMessages: [], newType: contextResultType }
  }

  if (contextResultType === 'any' || contextResultType === 'Pending') {
    return {
      errorMessages: [],
      newType: expectedArgumentType instanceof Array ? expectedArgumentType[0] : expectedArgumentType
    }
  }

  if (expectedArgumentType instanceof Array && expectedArgumentType.includes(contextResultType)) {
    return { errorMessages: [], newType: contextResultType }
  }

  if (expectedArgumentType === contextResultType) {
    return { errorMessages: [], newType: expectedArgumentType }
  }

  if (expectedArgumentType === 'Reference') {
    return { errorMessages: [], newType: expectedArgumentType }
  }
  if (expectedArgumentType === 'Cst') {
    return { errorMessages: [], newType: expectedArgumentType }
  }

  if (expectedArgumentType === 'Predicate') {
    return { errorMessages: [], newType: contextResultType }
  }

  if (contextResultType === 'Error') {
    return { errorMessages: [], newType: contextResultType }
  }

  // console.error({ expectedArgumentType, contextResultType, label, ctx })

  return {
    errorMessages: [{ type: 'type', message: `Expected ${expectedArgumentType} but got ${contextResultType}` }],
    newType: contextResultType
  }
}

export const runtimeCheckType = (
  expectedArgumentType: ExpressionType,
  contextResultType: FormulaType,
  label: string,
  ctx: FunctionContext
): ErrorResult | undefined => {
  const { errorMessages } = intersectType(expectedArgumentType, contextResultType, `[Runtime] ${label}`, ctx)

  if (errorMessages.length > 0) {
    const { type, message } = errorMessages[0]
    // devLog('runtimeCheckType', { label, expectedArgumentType, contextResultType, errorMessages })
    return { type: 'Error', result: message, errorKind: type }
  }

  return undefined
}

export const resultToColorType = ({ type, result }: AnyTypeResult): FormulaColorType => {
  if (type === 'boolean') {
    return result ? 'TRUE' : 'FALSE'
  }
  return type
}

export const attrsToColorType = ({ code, value }: CodeFragment): FormulaColorType => {
  switch (code) {
    case 'NullLiteral':
      return 'null'
    case 'NumberLiteral':
      return 'number'
    case 'StringLiteral':
      return 'string'
    case 'BooleanLiteral':
      return value === 'true' ? 'TRUE' : 'FALSE'
    case 'Function':
    case 'Variable':
      return code
    default:
      return code as FormulaColorType
  }
}

export const castData = (data: any): AnyTypeResult => {
  switch (typeof data) {
    case 'string':
      return { type: 'string', result: data }
    case 'number':
      return { type: 'number', result: data }
    case 'boolean':
      return { type: 'boolean', result: data }
    case 'function':
      // TODO function
      return { type: 'null', result: null }
    default:
      break
  }

  if (data === null || data === undefined) return { type: 'null', result: null }

  if (Array.isArray(data)) {
    const result = data.map(e => castData(e))
    return { type: 'Array', subType: extractSubType(result), result }
  }

  const object: object = data
  const newObject: { [key: string]: AnyTypeResult } = {}
  Object.entries(object).forEach(([k, v]) => {
    newObject[k] = castData(v)
  })

  return { type: 'Record', result: newObject, subType: extractSubType(Object.values(newObject)) }
}
