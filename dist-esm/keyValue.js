/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import ArgumentException from '@tsdotnet/exceptions/dist/ArgumentException';
import type from '@tsdotnet/type';
const VOID0 = void 0, DOT = '.', KEY = 'key', VALUE = 'value', ITEM = 'item', ITEM_1 = ITEM + '[1]', ITEM_VALUE = ITEM + DOT + VALUE, INVALID_KVP_MESSAGE = 'Invalid type.  Must be a KeyValuePair or Tuple of length 2.', CANNOT_BE_UNDEFINED = 'Cannot equal undefined.';
/**
 * Returns true if an object has a key and a value property.
 * @param kvp
 * @returns {kvp is KeyValuePair<TKey, TValue>}
 */
export function isKeyValuePair(kvp) {
    return kvp && KEY in kvp && VALUE in kvp;
}
function assertKey(key, name = ITEM) {
    assertNotUndefined(key, name + DOT + KEY);
    if (key === null)
        throw new ArgumentNullException(name + DOT + KEY);
    return key;
}
function assertTuple(tuple, name = ITEM) {
    if (tuple.length !== 2)
        throw new ArgumentException(name, 'KeyValuePair tuples must be of length 2.');
    assertKey(tuple[0], name);
}
function assertNotUndefined(value, name) {
    if (value === VOID0)
        throw new ArgumentException(name, CANNOT_BE_UNDEFINED);
    return value;
}
/**
 * Processes a key-value pair through a delegate function.
 * @param {KeyValuePairOrTuple<TKey, TValue>} item A KeyValuePair object, or a tuple of key (0) and value (1)
 * @param {(key: TKey, value: TValue) => TResult} to The delegate to produce a result from.
 * @returns {TResult}
 */
export function extractKeyValue(item, to) {
    let key, value;
    if (type.isArrayLike(item)) {
        assertTuple(item);
        key = item[0];
        value = assertNotUndefined(item[1], ITEM_1);
    }
    else if (isKeyValuePair(item)) {
        key = assertKey(item.key);
        value = assertNotUndefined(item.value, ITEM_VALUE);
    }
    else {
        throw new ArgumentException(ITEM, INVALID_KVP_MESSAGE);
    }
    return to(key, value);
}
export default extractKeyValue;
//# sourceMappingURL=keyValue.js.map