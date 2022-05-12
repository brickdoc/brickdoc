# Enumeration: ErrorCode

[common/errors](../modules/common_errors.md).ErrorCode

General Error Code
This values are based on HTTP status code

## Table of contents

### Enumeration members

- [BAD\_USER\_INPUT](common_errors.ErrorCode.md#bad_user_input)
- [CONFLICT](common_errors.ErrorCode.md#conflict)
- [FORBIDDEN](common_errors.ErrorCode.md#forbidden)
- [INTERNAL\_SERVER\_ERROR](common_errors.ErrorCode.md#internal_server_error)
- [NOT\_FOUND](common_errors.ErrorCode.md#not_found)
- [RESOURCE\_EXHAUSTED](common_errors.ErrorCode.md#resource_exhausted)
- [UNAUTHORIZED](common_errors.ErrorCode.md#unauthorized)
- [UNAVAILABLE](common_errors.ErrorCode.md#unavailable)

## Enumeration members

### <a id="bad_user_input" name="bad_user_input"></a> BAD\_USER\_INPUT

• **BAD\_USER\_INPUT** = `400`

#### Defined in

[common/errors/errors.interface.ts:6](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L6)

___

### <a id="conflict" name="conflict"></a> CONFLICT

• **CONFLICT** = `409`

e.g. Resource already exists or read-modify-write conflict

#### Defined in

[common/errors/errors.interface.ts:13](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L13)

___

### <a id="forbidden" name="forbidden"></a> FORBIDDEN

• **FORBIDDEN** = `403`

#### Defined in

[common/errors/errors.interface.ts:8](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L8)

___

### <a id="internal_server_error" name="internal_server_error"></a> INTERNAL\_SERVER\_ERROR

• **INTERNAL\_SERVER\_ERROR** = `500`

#### Defined in

[common/errors/errors.interface.ts:18](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L18)

___

### <a id="not_found" name="not_found"></a> NOT\_FOUND

• **NOT\_FOUND** = `404`

#### Defined in

[common/errors/errors.interface.ts:9](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L9)

___

### <a id="resource_exhausted" name="resource_exhausted"></a> RESOURCE\_EXHAUSTED

• **RESOURCE\_EXHAUSTED** = `429`

Either out of resource quota or reaching rate limiting

#### Defined in

[common/errors/errors.interface.ts:17](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L17)

___

### <a id="unauthorized" name="unauthorized"></a> UNAUTHORIZED

• **UNAUTHORIZED** = `401`

#### Defined in

[common/errors/errors.interface.ts:7](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L7)

___

### <a id="unavailable" name="unavailable"></a> UNAVAILABLE

• **UNAVAILABLE** = `503`

#### Defined in

[common/errors/errors.interface.ts:19](https://github.com/brickdoc/brickdoc/blob/master/apps/server-api/src/common/errors/errors.interface.ts#L19)