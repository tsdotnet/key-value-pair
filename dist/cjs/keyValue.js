"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeyValuePair = isKeyValuePair;
exports.extractKeyValue = extractKeyValue;
const tslib_1 = require("tslib");
const exceptions_1 = require("@tsdotnet/exceptions");
const type_1 = tslib_1.__importDefault(require("@tsdotnet/type"));
const VOID0 = void 0, DOT = '.', KEY = 'key', VALUE = 'value', ITEM = 'item', ITEM_1 = ITEM + '[1]', ITEM_VALUE = ITEM + DOT + VALUE, INVALID_KVP_MESSAGE = 'Invalid type.  Must be a KeyValuePair or Tuple of length 2.', CANNOT_BE_UNDEFINED = 'Cannot equal undefined.';
function isKeyValuePair(kvp) {
    return kvp != null && typeof kvp === 'object' && KEY in kvp && VALUE in kvp;
}
function assertKey(key, name = ITEM) {
    assertNotUndefined(key, name + DOT + KEY);
    if (key === null)
        throw new exceptions_1.ArgumentNullException(name + DOT + KEY);
    return key;
}
function assertTuple(tuple, name = ITEM) {
    if (tuple.length !== 2)
        throw new exceptions_1.ArgumentException(name, 'KeyValuePair tuples must be of length 2.');
    assertKey(tuple[0], name);
}
function assertNotUndefined(value, name) {
    if (value === VOID0)
        throw new exceptions_1.ArgumentException(name, CANNOT_BE_UNDEFINED);
    return value;
}
function extractKeyValue(item, to) {
    let key, value;
    if (type_1.default.isArrayLike(item)) {
        assertTuple(item);
        key = item[0];
        value = assertNotUndefined(item[1], ITEM_1);
    }
    else if (isKeyValuePair(item)) {
        key = assertKey(item.key);
        value = assertNotUndefined(item.value, ITEM_VALUE);
    }
    else {
        throw new exceptions_1.ArgumentException(ITEM, INVALID_KVP_MESSAGE);
    }
    return to(key, value);
}
exports.default = extractKeyValue;
//# sourceMappingURL=keyValue.js.map