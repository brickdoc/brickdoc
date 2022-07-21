# Interface: AnyFunctionClause<T\>

## Type parameters

| Name | Type                                                              |
| :--- | :---------------------------------------------------------------- |
| `T`  | extends [`UsedFormulaType`](../README.md#usedformulatype) = `any` |

## Table of contents

### Properties

- [acceptError](AnyFunctionClause.md#accepterror)
- [args](AnyFunctionClause.md#args)
- [async](AnyFunctionClause.md#async)
- [chain](AnyFunctionClause.md#chain)
- [description](AnyFunctionClause.md#description)
- [effect](AnyFunctionClause.md#effect)
- [examples](AnyFunctionClause.md#examples)
- [feature](AnyFunctionClause.md#feature)
- [group](AnyFunctionClause.md#group)
- [key](AnyFunctionClause.md#key)
- [lazy](AnyFunctionClause.md#lazy)
- [name](AnyFunctionClause.md#name)
- [persist](AnyFunctionClause.md#persist)
- [pure](AnyFunctionClause.md#pure)
- [reference](AnyFunctionClause.md#reference)
- [returns](AnyFunctionClause.md#returns)
- [testCases](AnyFunctionClause.md#testcases)

## Properties

### <a id="accepterror" name="accepterror"></a> acceptError

• `Readonly` **acceptError**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:498](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L498)

---

### <a id="args" name="args"></a> args

• `Readonly` **args**: [`Argument`](Argument.md)<`"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Button"` \| `"Switch"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"`\>[]

#### Defined in

[packages/formula/src/type/index.ts:503](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L503)

---

### <a id="async" name="async"></a> async

• `Readonly` **async**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:491](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L491)

---

### <a id="chain" name="chain"></a> chain

• `Readonly` **chain**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:492](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L492)

---

### <a id="description" name="description"></a> description

• `Readonly` **description**: `string`

#### Defined in

[packages/formula/src/type/index.ts:499](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L499)

---

### <a id="effect" name="effect"></a> effect

• `Readonly` **effect**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:494](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L494)

---

### <a id="examples" name="examples"></a> examples

• `Readonly` **examples**: [`Example`<`T`\>, ...Example<T\>[]]

#### Defined in

[packages/formula/src/type/index.ts:501](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L501)

---

### <a id="feature" name="feature"></a> feature

• `Optional` `Readonly` **feature**: `string`

#### Defined in

[packages/formula/src/type/index.ts:496](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L496)

---

### <a id="group" name="group"></a> group

• `Readonly` **group**: `string`

#### Defined in

[packages/formula/src/type/index.ts:500](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L500)

---

### <a id="key" name="key"></a> key

• `Optional` `Readonly` **key**: `string`

#### Defined in

[packages/formula/src/type/index.ts:490](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L490)

---

### <a id="lazy" name="lazy"></a> lazy

• `Readonly` **lazy**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:497](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L497)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: `string`

#### Defined in

[packages/formula/src/type/index.ts:489](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L489)

---

### <a id="persist" name="persist"></a> persist

• `Readonly` **persist**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:495](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L495)

---

### <a id="pure" name="pure"></a> pure

• `Readonly` **pure**: `boolean`

#### Defined in

[packages/formula/src/type/index.ts:493](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L493)

---

### <a id="reference" name="reference"></a> reference

• `Readonly` **reference**: (`ctx`: [`FunctionContext`](FunctionContext.md), ...`args`: `any`[]) => `AnyFunctionResult`<`T`\> \| `Promise`<`AnyFunctionResult`<`T`\>\>

#### Type declaration

▸ (`ctx`, ...`args`): `AnyFunctionResult`<`T`\> \| `Promise`<`AnyFunctionResult`<`T`\>\>

##### Parameters

| Name      | Type                                    |
| :-------- | :-------------------------------------- |
| `ctx`     | [`FunctionContext`](FunctionContext.md) |
| `...args` | `any`[]                                 |

##### Returns

`AnyFunctionResult`<`T`\> \| `Promise`<`AnyFunctionResult`<`T`\>\>

#### Defined in

[packages/formula/src/type/index.ts:508](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L508)

---

### <a id="returns" name="returns"></a> returns

• `Readonly` **returns**: `T` \| readonly [`T`, `T`]

#### Defined in

[packages/formula/src/type/index.ts:502](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L502)

---

### <a id="testcases" name="testcases"></a> testCases

• `Readonly` **testCases**: { `input`: (`null` \| `string` \| `number` \| `boolean` \| `Date` \| [`ErrorMessage`](ErrorMessage.md) \| (`Omit`<`FormulaRecordType`, `"dump"`\> \| `Omit`<{ `dump`: [`ErrorMessage`](ErrorMessage.md) ; `result`: [`ErrorMessage`](ErrorMessage.md) ; `type`: `"Error"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"string"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `number` ; `result`: `number` ; `type`: `"number"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `boolean` ; `result`: `boolean` ; `type`: `"boolean"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"null"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`BlockType`](BlockType.md) ; `type`: `"Block"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`ButtonType`](ButtonType.md) ; `type`: `"Button"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`SwitchType`](SwitchType.md) ; `type`: `"Switch"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Date` ; `type`: `"Date"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `"Blank"` ; `result`: `"Blank"` ; `type`: `"Blank"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaArrayType`, `"dump"`\> \| `Omit`<{ `dump`: [`string`, `string`] ; `result`: [`SpreadsheetType`](SpreadsheetType.md) ; `type`: `"Spreadsheet"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`RowType`](RowType.md) ; `type`: `"Row"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`CellVia`](../README.md#cellvia), [`Cell`](Cell.md)] ; `result`: [`CellType`](CellType.md) ; `type`: `"Cell"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: [`string`, [`FindKey`](FindKey.md)] ; `result`: [`ColumnType`](ColumnType.md) ; `type`: `"Column"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`RangeType`](RangeType.md) ; `type`: `"Range"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `CstNode` ; `type`: `"Cst"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `Reference` ; `type`: `"Reference"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: [`FormulaFunction`, ...FormulaFunction[]] ; `type`: `"Function"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<`FormulaPredicateType`, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"literal"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Pending"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `string` ; `result`: `string` ; `type`: `"Waiting"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\> \| `Omit`<{ `dump`: `null` ; `result`: `null` ; `type`: `"NoPersist"` ; `view?`: [`ViewData`](ViewData.md)<`string`\> }, `"dump"`\>)[] \| { `[key: string]`: [`AnyTypeResult`](../README.md#anytyperesult); } \| [`BlockType`](BlockType.md) \| [`SpreadsheetType`](SpreadsheetType.md) \| [`RowType`](RowType.md) \| [`ColumnType`](ColumnType.md) \| [`CellType`](CellType.md) \| `CstNode` \| `Reference` \| [`FormulaFunction`, ...FormulaFunction[]] \| [`RangeType`](RangeType.md) \| [`ButtonType`](ButtonType.md) \| [`SwitchType`](SwitchType.md))[] ; `output`: `AnyFunctionResult`<`T`\> }[]

#### Defined in

[packages/formula/src/type/index.ts:504](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/type/index.ts#L504)
