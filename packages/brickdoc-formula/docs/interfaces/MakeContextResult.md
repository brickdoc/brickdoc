# Interface: MakeContextResult

## Hierarchy

- `Omit`<[`FunctionContext`](FunctionContext.md), ``"meta"``\>

  ↳ **`MakeContextResult`**

## Table of contents

### Properties

- [formulaContext](MakeContextResult.md#formulacontext)
- [interpretContext](MakeContextResult.md#interpretcontext)

### Methods

- [buildMeta](MakeContextResult.md#buildmeta)
- [fetchUUID](MakeContextResult.md#fetchuuid)

## Properties

### <a id="formulacontext" name="formulacontext"></a> formulaContext

• `Readonly` **formulaContext**: [`ContextInterface`](ContextInterface.md)

#### Inherited from

Omit.formulaContext

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:540](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L540)

___

### <a id="interpretcontext" name="interpretcontext"></a> interpretContext

• `Readonly` **interpretContext**: [`InterpretContext`](InterpretContext.md)

#### Inherited from

Omit.interpretContext

#### Defined in

[packages/brickdoc-formula/src/types/index.ts:545](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/types/index.ts#L545)

## Methods

### <a id="buildmeta" name="buildmeta"></a> buildMeta

▸ **buildMeta**(`args`): [`VariableMetadata`](VariableMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`BaseTestCase`](BaseTestCase.md)<{}\> |

#### Returns

[`VariableMetadata`](VariableMetadata.md)

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:180](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L180)

___

### <a id="fetchuuid" name="fetchuuid"></a> fetchUUID

▸ **fetchUUID**(`uuid`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuid` | [`MockedUUIDV4`](../README.md#mockeduuidv4) |

#### Returns

`string`

#### Defined in

[packages/brickdoc-formula/src/tests/testType.ts:181](https://github.com/brickdoc/brickdoc/blob/main/packages/brickdoc-formula/src/tests/testType.ts#L181)