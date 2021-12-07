import { CstNode } from 'chevrotain'

export * from './grammar'
export * from './functions'
export * from './context'

export type BasicType = 'number' | 'string' | 'boolean' | 'object' | 'array'
export type ObjectType = 'Date' | 'Column' | 'Block'

export type FormulaType = BasicType | ObjectType | 'any'

export type SpecialDefaultVariableName = 'str' | 'num' | 'bool' | 'obj' | 'array' | 'date' | 'column' | 'block' | 'var'

export type FunctionGroup = 'core' | 'excel' | 'database' | 'custom' | string

export type FunctionName = string
export type VariableName = string
export type ColumnName = string

export type VariableKind = 'constant' | 'expression'

export type VariableTypeMeta = `error_${VariableKind}` | `success_${VariableKind}_${FormulaType}`
export type ErrorType = 'type' | 'syntax' | 'runtime' | 'fatal' | 'deps' | 'circular_dependency' | 'name_unique'

export type FunctionKey = `${FunctionGroup}::${FunctionName}`
export type VariableKey = `$${NamespaceId}@${VariableId}`

export type DefaultVariableName = `${SpecialDefaultVariableName}${number}`

// TODO https://www.typescriptlang.org/play?#code/C4TwDgpgBAcgrgWwgJwJYGMoF4oHIAMuUAPngIxGm4BMleAzHbgCxMCsTAbEwOxMAcTAJy4AUKEhQAggBswACwCGAIwjAM2PIqbKm6JgBMmEJgDMmAcybymqJgCsmAayYymCJgDsmAeyZgmAEcmZCYAZyZgJjgmADcmAHcmAA8mECYALzEJaFkFRU9EFA0cPKVVdUxSeCQ0dFFxcGgAJQhIRWAAHlEoXqgAYSVkKAhk4AhPAzCoMOA0TwsAGh6+-p84T2ARsYmpqEKEVWRlvqgAKR9UTwgDbfHJ6dn5i00AA1eTvql0TFH7vfwAG0ALqaEGiAB8mm+6EBuBkEwswBsoL+u2maw2WwA-OdLtdbgAuKCtdpdQaKY4DdabRZQV4AEgA3hcrjcAL7MinIdkfKCA-CLAB0IphwIhDRyUAAqtKAJIAEQAasw3szSRAOp0ygUinU6fwIeyALTqtqaro6g7FdB05hG01MjVaq16jB2h1msnauRKa36qD2k1ei0+-L+91QMjUI2vURAA
// export type uuid = `${string}-${string}-${string}-${string}`
export type uuid = string

export type NamespaceId = uuid
export type VariableId = uuid
export type ColumnId = uuid

export type Result = any

export interface View {
  [key: string]: any
}

export interface Formula {
  blockId: uuid
  definition: string
  id: uuid
  name: VariableName
  updatedAt: string
  createdAt: number
  cacheValue: object
  view: View
}

export interface Cell {
  value: any
}

export interface Column {
  namespaceId: NamespaceId
  columnId: ColumnId
  name: ColumnName | undefined
  index: number
  type: string
}
export interface Database {
  size: () => number
  name: () => string
  _data: () => any
  listColumns: () => Column[]
  getColumn: (columnId: ColumnId) => Column | undefined
  listCell: (columnId: ColumnId) => Cell[]
  getCell: (columnId: ColumnId, rowId: uuid) => Cell | undefined
}

export interface Argument {
  readonly name: string
  readonly type: FormulaType
  readonly spread?: boolean
}

export interface Example {
  readonly input: any[]
  readonly output: Result
}

export type CompletionKind = 'function' | 'variable'

export interface BaseCompletion {
  readonly kind: CompletionKind
  readonly weight: number
  readonly namespace: string
  readonly name: string
  readonly value: any
  readonly preview: any
}
export interface FunctionCompletion extends BaseCompletion {
  readonly kind: 'function'
  readonly namespace: FunctionGroup
  readonly value: FunctionKey
  readonly preview: FunctionClause
}

export interface VariableCompletion extends BaseCompletion {
  readonly kind: 'variable'
  readonly namespace: NamespaceId
  readonly value: VariableKey
  readonly preview: VariableData
}

export type Completion = FunctionCompletion | VariableCompletion

export interface ContextInterface {
  databases: { [key: NamespaceId]: Database }
  backendActions: BackendActions
  variableCount: () => number
  getDefaultVariableName: (namespaceId: NamespaceId, type: FormulaType) => DefaultVariableName
  listCellByColumn: (column: Column) => Cell[]
  completions: (namespaceId: NamespaceId) => Completion[]
  findDatabase: (namespaceId: NamespaceId) => Database | undefined
  findColumn: (namespaceId: NamespaceId, variableId: VariableId) => Column | undefined
  setDatabase: (namespaceId: NamespaceId, database: Database) => void
  removeDatabase: (namespaceId: NamespaceId) => void
  listVariables: (namespaceId: NamespaceId) => VariableInterface[]
  findVariable: (namespaceId: NamespaceId, variableId: VariableId) => VariableInterface | undefined
  findVariableByName: (namespaceId: NamespaceId, name: VariableName) => VariableInterface | undefined
  clearDependency: (namespaceId: NamespaceId, variableId: VariableId) => void
  trackDependency: (variable: VariableInterface) => void
  handleBroadcast: (variable: VariableInterface) => void
  commitVariable: ({ variable, skipCreate }: { variable: VariableInterface; skipCreate?: boolean }) => Promise<void>
  removeVariable: (namespaceId: NamespaceId, variableId: VariableId) => Promise<void>
  findFunctionClause: (group: FunctionGroup, name: FunctionName) => FunctionClause | undefined
  reset: () => void
}

export interface BaseFunctionClause {
  readonly name: FunctionName
  readonly pure: boolean
  readonly effect: boolean
  readonly async: boolean
  readonly chain: boolean
  readonly description: string
  readonly group: FunctionGroup
  readonly args: Argument[]
  readonly returns: FormulaType
  readonly examples: Example[]
  readonly reference: (ctx: ContextInterface, ...args: any[]) => Result
}

export interface NormalFunctionClause extends BaseFunctionClause {
  readonly chain: false
}

export interface ChainFunctionClause extends BaseFunctionClause {
  readonly chain: true
  readonly args: [Argument, ...Argument[]]
  readonly reference: (ctx: ContextInterface, chainResult: any, ...args: any[]) => Result
}

export type FunctionClause = NormalFunctionClause | ChainFunctionClause

export interface CodeFragment {
  readonly code: string
  readonly name: string
  readonly spaceBefore: boolean
  readonly spaceAfter: boolean
  readonly meta: { [key: string]: any }
  readonly type: FormulaType
  readonly errors: ErrorMessage[]
}
export interface VariableDependency {
  readonly variableId: VariableId
  readonly namespaceId: NamespaceId
}

export interface BaseVariableValue {
  updatedAt: Date
  readonly success: boolean
  readonly value?: Result
  readonly display?: string
  readonly type?: FormulaType
  readonly errorMessages?: ErrorMessage[]
}

export interface SuccessVariableValue extends BaseVariableValue {
  readonly success: true
  readonly display: string
  readonly value: Result
  readonly type: FormulaType
}

export interface ErrorVariableValue extends BaseVariableValue {
  readonly success: false
  readonly errorMessages: [ErrorMessage, ...ErrorMessage[]]
}

export type VariableValue = SuccessVariableValue | ErrorVariableValue

export interface VariableData {
  name: VariableName
  level: number
  namespaceId: NamespaceId
  variableId: VariableId
  definition: string
  dirty: boolean
  view?: View
  kind: VariableKind
  variableValue: VariableValue
  cst: CstNode
  codeFragments: CodeFragment[]
  flattenVariableDependencies: Set<VariableDependency>
  variableDependencies: VariableDependency[]
  functionDependencies: FunctionClause[]
}

export type VariableUpdateHandler = (variable: VariableInterface) => void

export interface VariableMetadata {
  readonly namespaceId: NamespaceId
  readonly variableId: VariableId
  readonly input: string
  readonly name: VariableName
}

export interface VariableInterface {
  t: VariableData
  backendActions: BackendActions
  meta: () => VariableMetadata
  completion: (weight: number) => VariableCompletion
  onUpdate: (handler: VariableUpdateHandler) => void
  invokeBackendCreate: () => Promise<void>
  invokeBackendUpdate: () => Promise<void>
  afterUpdate: () => void
  refresh: (formulaContext: ContextInterface) => Promise<void>
}

export interface BackendActions {
  createVariable: (variable: VariableInterface) => Promise<{ success: boolean }>
  updateVariable: (variable: VariableInterface) => Promise<{ success: boolean }>
  deleteVariable: (variable: VariableInterface) => Promise<{ success: boolean }>
}

export interface ErrorMessage {
  readonly message: string
  readonly type: ErrorType
}