# Interface: OperatorType

## Table of contents

### Properties

- [dynamicInterpretLhs](OperatorType.md#dynamicinterpretlhs)
- [dynamicInterpretRhsType](OperatorType.md#dynamicinterpretrhstype)
- [dynamicParseRhsType](OperatorType.md#dynamicparserhstype)
- [dynamicParseType](OperatorType.md#dynamicparsetype)
- [dynamicParseValidator](OperatorType.md#dynamicparsevalidator)
- [expressionType](OperatorType.md#expressiontype)
- [interpret](OperatorType.md#interpret)
- [lhsType](OperatorType.md#lhstype)
- [name](OperatorType.md#name)
- [packageInterpretResult](OperatorType.md#packageinterpretresult)
- [parseRhs](OperatorType.md#parserhs)
- [reverseLhsAndRhs](OperatorType.md#reverselhsandrhs)
- [rhsType](OperatorType.md#rhstype)
- [skipReturnEarlyCheck](OperatorType.md#skipreturnearlycheck)
- [skipReturnFinalCheck](OperatorType.md#skipreturnfinalcheck)
- [skipRhsCstParse](OperatorType.md#skiprhscstparse)
- [testCases](OperatorType.md#testcases)

## Properties

### <a id="dynamicinterpretlhs" name="dynamicinterpretlhs"></a> dynamicInterpretLhs

• `Optional` `Readonly` **dynamicInterpretLhs**: (`args`: { `args`: [`InterpretArgument`](InterpretArgument.md) ; `interpreter`: [`FormulaInterpreter`](../classes/FormulaInterpreter.md) ; `operators`: (`undefined` \| `IToken`)[] }) => `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Type declaration

▸ (`args`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

##### Parameters

| Name               | Type                                                     |
| :----------------- | :------------------------------------------------------- |
| `args`             | `Object`                                                 |
| `args.args`        | [`InterpretArgument`](InterpretArgument.md)              |
| `args.interpreter` | [`FormulaInterpreter`](../classes/FormulaInterpreter.md) |
| `args.operators`   | (`undefined` \| `IToken`)[]                              |

##### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/formula/src/grammar/operator.ts:44](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L44)

---

### <a id="dynamicinterpretrhstype" name="dynamicinterpretrhstype"></a> dynamicInterpretRhsType

• `Optional` `Readonly` **dynamicInterpretRhsType**: (`__namedParameters`: { `args`: [`InterpretArgument`](InterpretArgument.md) ; `cst`: `CstNode` ; `index`: `number` ; `operator`: `undefined` \| `IToken` ; `result`: [`AnyResult`](../README.md#anyresult) }) => [`InterpretArgument`](InterpretArgument.md)

#### Type declaration

▸ (`__namedParameters`): [`InterpretArgument`](InterpretArgument.md)

##### Parameters

| Name                         | Type                                        |
| :--------------------------- | :------------------------------------------ |
| `__namedParameters`          | `Object`                                    |
| `__namedParameters.args`     | [`InterpretArgument`](InterpretArgument.md) |
| `__namedParameters.cst`      | `CstNode`                                   |
| `__namedParameters.index`    | `number`                                    |
| `__namedParameters.operator` | `undefined` \| `IToken`                     |
| `__namedParameters.result`   | [`AnyResult`](../README.md#anyresult)       |

##### Returns

[`InterpretArgument`](InterpretArgument.md)

#### Defined in

[packages/formula/src/grammar/operator.ts:51](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L51)

---

### <a id="dynamicparserhstype" name="dynamicparserhstype"></a> dynamicParseRhsType

• `Optional` `Readonly` **dynamicParseRhsType**: (`cst`: `CstNode`, `prevType`: [`FormulaCheckType`](../README.md#formulachecktype), `args`: [`CstVisitorArgument`](CstVisitorArgument.md), `index`: `number`) => [`CstVisitorArgument`](CstVisitorArgument.md)

#### Type declaration

▸ (`cst`, `prevType`, `args`, `index`): [`CstVisitorArgument`](CstVisitorArgument.md)

##### Parameters

| Name       | Type                                                |
| :--------- | :-------------------------------------------------- |
| `cst`      | `CstNode`                                           |
| `prevType` | [`FormulaCheckType`](../README.md#formulachecktype) |
| `args`     | [`CstVisitorArgument`](CstVisitorArgument.md)       |
| `index`    | `number`                                            |

##### Returns

[`CstVisitorArgument`](CstVisitorArgument.md)

#### Defined in

[packages/formula/src/grammar/operator.ts:65](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L65)

---

### <a id="dynamicparsetype" name="dynamicparsetype"></a> dynamicParseType

• `Optional` `Readonly` **dynamicParseType**: (`lhsType`: [`FormulaCheckType`](../README.md#formulachecktype)) => [`FormulaCheckType`](../README.md#formulachecktype)

#### Type declaration

▸ (`lhsType`): [`FormulaCheckType`](../README.md#formulachecktype)

##### Parameters

| Name      | Type                                                |
| :-------- | :-------------------------------------------------- |
| `lhsType` | [`FormulaCheckType`](../README.md#formulachecktype) |

##### Returns

[`FormulaCheckType`](../README.md#formulachecktype)

#### Defined in

[packages/formula/src/grammar/operator.ts:50](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L50)

---

### <a id="dynamicparsevalidator" name="dynamicparsevalidator"></a> dynamicParseValidator

• `Optional` `Readonly` **dynamicParseValidator**: (`cstVisitor`: [`CodeFragmentVisitor`](../classes/CodeFragmentVisitor.md), `result`: [`CodeFragmentResult`](CodeFragmentResult.md)) => [`CodeFragmentResult`](CodeFragmentResult.md)

#### Type declaration

▸ (`cstVisitor`, `result`): [`CodeFragmentResult`](CodeFragmentResult.md)

##### Parameters

| Name         | Type                                                       |
| :----------- | :--------------------------------------------------------- |
| `cstVisitor` | [`CodeFragmentVisitor`](../classes/CodeFragmentVisitor.md) |
| `result`     | [`CodeFragmentResult`](CodeFragmentResult.md)              |

##### Returns

[`CodeFragmentResult`](CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/operator.ts:49](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L49)

---

### <a id="expressiontype" name="expressiontype"></a> expressionType

• `Readonly` **expressionType**: `"string"` \| `"number"` \| `"boolean"` \| `"null"` \| `"Block"` \| `"Date"` \| `"Blank"` \| `"Record"` \| `"Array"` \| `"Error"` \| `"Spreadsheet"` \| `"Row"` \| `"Cell"` \| `"Column"` \| `"Range"` \| `"Cst"` \| `"Reference"` \| `"Function"` \| `"Predicate"` \| `"Button"` \| `"Switch"` \| `"literal"` \| `"Pending"` \| `"Waiting"` \| `"NoPersist"` \| `"any"` \| `"void"`

#### Defined in

[packages/formula/src/grammar/operator.ts:42](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L42)

---

### <a id="interpret" name="interpret"></a> interpret

• `Readonly` **interpret**: (`__namedParameters`: { `cst`: `CstNode` ; `interpreter`: [`FormulaInterpreter`](../classes/FormulaInterpreter.md) ; `lhs`: [`AnyResult`](../README.md#anyresult) ; `operator`: `IToken` ; `rhs`: `undefined` \| [`AnyResult`](../README.md#anyresult) }) => `Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Type declaration

▸ (`__namedParameters`): `Promise`<[`AnyResult`](../README.md#anyresult)\>

##### Parameters

| Name                            | Type                                                     |
| :------------------------------ | :------------------------------------------------------- |
| `__namedParameters`             | `Object`                                                 |
| `__namedParameters.cst`         | `CstNode`                                                |
| `__namedParameters.interpreter` | [`FormulaInterpreter`](../classes/FormulaInterpreter.md) |
| `__namedParameters.lhs`         | [`AnyResult`](../README.md#anyresult)                    |
| `__namedParameters.operator`    | `IToken`                                                 |
| `__namedParameters.rhs`         | `undefined` \| [`AnyResult`](../README.md#anyresult)     |

##### Returns

`Promise`<[`AnyResult`](../README.md#anyresult)\>

#### Defined in

[packages/formula/src/grammar/operator.ts:87](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L87)

---

### <a id="lhstype" name="lhstype"></a> lhsType

• `Readonly` **lhsType**: [`FormulaCheckType`](../README.md#formulachecktype)

#### Defined in

[packages/formula/src/grammar/operator.ts:43](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L43)

---

### <a id="name" name="name"></a> name

• `Readonly` **name**: [`OperatorName`](../README.md#operatorname)

#### Defined in

[packages/formula/src/grammar/operator.ts:36](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L36)

---

### <a id="packageinterpretresult" name="packageinterpretresult"></a> packageInterpretResult

• `Optional` `Readonly` **packageInterpretResult**: (`result`: [`AnyResult`](../README.md#anyresult)) => [`AnyResult`](../README.md#anyresult)

#### Type declaration

▸ (`result`): [`AnyResult`](../README.md#anyresult)

##### Parameters

| Name     | Type                                  |
| :------- | :------------------------------------ |
| `result` | [`AnyResult`](../README.md#anyresult) |

##### Returns

[`AnyResult`](../README.md#anyresult)

#### Defined in

[packages/formula/src/grammar/operator.ts:64](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L64)

---

### <a id="parserhs" name="parserhs"></a> parseRhs

• `Optional` `Readonly` **parseRhs**: (`__namedParameters`: { `operatorTokenCodeFragments`: [`CodeFragment`](../README.md#codefragment)[] ; `operatorTokenImage`: `string` ; `rhsCodeFragments`: [`CodeFragment`](../README.md#codefragment)[] ; `rhsImages`: `string`[] ; `rhsTokenCodeFragments`: [`CodeFragment`](../README.md#codefragment)[] ; `rhsTokenImage`: `string` }) => [`CodeFragmentResult`](CodeFragmentResult.md)

#### Type declaration

▸ (`__namedParameters`): [`CodeFragmentResult`](CodeFragmentResult.md)

##### Parameters

| Name                                           | Type                                          |
| :--------------------------------------------- | :-------------------------------------------- |
| `__namedParameters`                            | `Object`                                      |
| `__namedParameters.operatorTokenCodeFragments` | [`CodeFragment`](../README.md#codefragment)[] |
| `__namedParameters.operatorTokenImage`         | `string`                                      |
| `__namedParameters.rhsCodeFragments`           | [`CodeFragment`](../README.md#codefragment)[] |
| `__namedParameters.rhsImages`                  | `string`[]                                    |
| `__namedParameters.rhsTokenCodeFragments`      | [`CodeFragment`](../README.md#codefragment)[] |
| `__namedParameters.rhsTokenImage`              | `string`                                      |

##### Returns

[`CodeFragmentResult`](CodeFragmentResult.md)

#### Defined in

[packages/formula/src/grammar/operator.ts:72](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L72)

---

### <a id="reverselhsandrhs" name="reverselhsandrhs"></a> reverseLhsAndRhs

• `Optional` `Readonly` **reverseLhsAndRhs**: `boolean`

#### Defined in

[packages/formula/src/grammar/operator.ts:40](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L40)

---

### <a id="rhstype" name="rhstype"></a> rhsType

• `Readonly` **rhsType**: [`FormulaCheckType`](../README.md#formulachecktype)

#### Defined in

[packages/formula/src/grammar/operator.ts:71](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L71)

---

### <a id="skipreturnearlycheck" name="skipreturnearlycheck"></a> skipReturnEarlyCheck

• `Optional` `Readonly` **skipReturnEarlyCheck**: `boolean`

#### Defined in

[packages/formula/src/grammar/operator.ts:37](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L37)

---

### <a id="skipreturnfinalcheck" name="skipreturnfinalcheck"></a> skipReturnFinalCheck

• `Optional` `Readonly` **skipReturnFinalCheck**: `boolean`

#### Defined in

[packages/formula/src/grammar/operator.ts:38](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L38)

---

### <a id="skiprhscstparse" name="skiprhscstparse"></a> skipRhsCstParse

• `Optional` `Readonly` **skipRhsCstParse**: `boolean`

#### Defined in

[packages/formula/src/grammar/operator.ts:39](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L39)

---

### <a id="testcases" name="testcases"></a> testCases

• `Optional` `Readonly` **testCases**: [`TestCaseType`](TestCaseType.md)

#### Defined in

[packages/formula/src/grammar/operator.ts:41](https://github.com/mashcard/mashcard/blob/main/packages/formula/src/grammar/operator.ts#L41)
