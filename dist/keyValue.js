"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKeyValue = exports.isKeyValuePair = void 0;
const tslib_1 = require("tslib");
const ArgumentException_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/exceptions/dist/ArgumentException"));
const ArgumentNullException_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/exceptions/dist/ArgumentNullException"));
const type_1 = (0, tslib_1.__importDefault)(require("@tsdotnet/type"));
const VOID0 = void 0, DOT = '.', KEY = 'key', VALUE = 'value', ITEM = 'item', ITEM_1 = ITEM + '[1]', ITEM_VALUE = ITEM + DOT + VALUE, INVALID_KVP_MESSAGE = 'Invalid type.  Must be a KeyValuePair or Tuple of length 2.', CANNOT_BE_UNDEFINED = 'Cannot equal undefined.';
/**
 * Returns true if an object has a key and a value property.
 * @param kvp
 * @returns {kvp is KeyValuePair<TKey, TValue>}
 */
function isKeyValuePair(kvp) {
    return kvp != null && KEY in kvp && VALUE in kvp;
}
exports.isKeyValuePair = isKeyValuePair;
function assertKey(key, name = ITEM) {
    assertNotUndefined(key, name + DOT + KEY);
    if (key === null)
        throw new ArgumentNullException_1.default(name + DOT + KEY);
    return key;
}
function assertTuple(tuple, name = ITEM) {
    if (tuple.length !== 2)
        throw new ArgumentException_1.default(name, 'KeyValuePair tuples must be of length 2.');
    assertKey(tuple[0], name);
}
function assertNotUndefined(value, name) {
    if (value === VOID0)
        throw new ArgumentException_1.default(name, CANNOT_BE_UNDEFINED);
    return value;
}
/**
 * Processes a key-value pair through a delegate function.
 * @param {KeyValuePairOrTuple<TKey, TValue>} item A KeyValuePair object, or a tuple of key (0) and value (1)
 * @param {(key: TKey, value: TValue) => TResult} to The delegate to produce a result from.
 * @returns {TResult}
 */
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
        throw new ArgumentException_1.default(ITEM, INVALID_KVP_MESSAGE);
    }
    return to(key, value);
}
exports.extractKeyValue = extractKeyValue;
exports.default = extractKeyValue;
//# sourceMappingURL=keyValue.js.map