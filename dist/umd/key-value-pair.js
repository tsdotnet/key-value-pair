(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/exceptions'), require('@tsdotnet/type')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/exceptions', '@tsdotnet/type'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.keyValuePair = global.tsdotnet.keyValuePair || {}), global.tsdotnet.exceptions, global.tsdotnet.type));
})(this, (function (exports, exceptions, type) { 'use strict';

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
            throw new exceptions.ArgumentNullException(name + DOT + KEY);
        return key;
    }
    function assertTuple(tuple, name = ITEM) {
        if (tuple.length !== 2)
            throw new exceptions.ArgumentException(name, 'KeyValuePair tuples must be of length 2.');
        assertKey(tuple[0], name);
    }
    function assertNotUndefined(value, name) {
        if (value === VOID0)
            throw new exceptions.ArgumentException(name, CANNOT_BE_UNDEFINED);
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
            throw new exceptions.ArgumentException(ITEM, INVALID_KVP_MESSAGE);
        }
        return to(key, value);
    }

    exports.default = extractKeyValue;
    exports.extractKeyValue = extractKeyValue;
    exports.isKeyValuePair = isKeyValuePair;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=key-value-pair.js.map
