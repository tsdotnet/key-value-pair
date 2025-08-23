import { ArgumentException, ArgumentNullException } from '@tsdotnet/exceptions';
import type from '@tsdotnet/type';

/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
const VOID0 = void 0, DOT = '.', KEY = 'key', VALUE = 'value', ITEM = 'item', ITEM_1 = ITEM + '[1]', ITEM_VALUE = ITEM + DOT + VALUE, INVALID_KVP_MESSAGE = 'Invalid type.  Must be a KeyValuePair or Tuple of length 2.', CANNOT_BE_UNDEFINED = 'Cannot equal undefined.';
function isKeyValuePair(kvp) {
    return kvp != null && typeof kvp === 'object' && KEY in kvp && VALUE in kvp;
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
function extractKeyValue(item, to) {
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

export { extractKeyValue as default, extractKeyValue, isKeyValuePair };
//# sourceMappingURL=keyValue.js.map
