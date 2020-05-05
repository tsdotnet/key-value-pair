/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import KeyValuePair, {KeyValuePairOrTuple} from './KeyValuePair';
import ArgumentNullException from '@tsdotnet/exceptions/dist/ArgumentNullException';
import ArgumentException from '@tsdotnet/exceptions/dist/ArgumentException';
import type from '@tsdotnet/compare/dist/type';

const
	VOID0: undefined            = void 0,
	DOT: string                 = '.',
	KEY: string                 = 'key',
	VALUE: string               = 'value',
	ITEM: string                = 'item',
	ITEM_1: string              = ITEM + '[1]',
	ITEM_VALUE: string          = ITEM + DOT + VALUE,
	INVALID_KVP_MESSAGE: string = 'Invalid type.  Must be a KeyValuePair or Tuple of length 2.',
	CANNOT_BE_UNDEFINED: string = 'Cannot equal undefined.';

/**
 * Returns true if an object has a key and a value property.
 * @param kvp
 * @returns {kvp is KeyValuePair<TKey, TValue>}
 */
export function isKeyValuePair<TKey, TValue> (kvp: any): kvp is KeyValuePair<TKey, TValue>
{
	return kvp && KEY in kvp && VALUE in kvp;
}

function assertKey<TKey> (key: TKey, name: string = ITEM): TKey | never
{
	assertNotUndefined(key, name + DOT + KEY);
	if(key===null) throw new ArgumentNullException(name + DOT + KEY);
	return key;
}

function assertTuple (tuple: ArrayLike<any>, name: string = ITEM): void | never
{
	if(tuple.length!==2) throw new ArgumentException(name, 'KeyValuePair tuples must be of length 2.');
	assertKey(tuple[0], name);
}

function assertNotUndefined<T> (value: T, name: string): T | never
{
	if(value===VOID0) throw new ArgumentException(name, CANNOT_BE_UNDEFINED);
	return value;
}

/**
 * Processes a key-value pair through a delegate function.
 * @param {KeyValuePairOrTuple<TKey, TValue>} item A KeyValuePair object, or a tuple of key (0) and value (1)
 * @param {(key: TKey, value: TValue) => TResult} to The delegate to produce a result from.
 * @returns {TResult}
 */
export function extractKeyValue<TKey, TValue, TResult> (
	item: KeyValuePairOrTuple<TKey, TValue>,
	to: (key: TKey, value: TValue) => TResult
): TResult
{
	let key: TKey, value: TValue;
	if(type.isArrayLike(item))
	{
		assertTuple(item);
		key = item[0];
		value = assertNotUndefined(item[1], ITEM_1);
	}
	else if(isKeyValuePair<TKey, TValue>(item))
	{
		key = assertKey(item.key);
		value = assertNotUndefined(item.value, ITEM_VALUE);
	}
	else
	{
		throw new ArgumentException(ITEM, INVALID_KVP_MESSAGE);
	}

	return to(key, value);
}

export default extractKeyValue;
