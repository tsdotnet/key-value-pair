/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

export default interface KeyValuePair<TKey, TValue>
{
	key: TKey;
	value: TValue;
// eslint-disable-next-line semi
}

export declare type KeyValuePairOrTuple<TKey, TValue> = KeyValuePair<TKey, TValue> | [TKey, TValue];

export declare type StringKeyValuePair<TValue> = KeyValuePair<string, TValue>;

export declare type StringKeyValuePairOrTuple<TValue> =
	StringKeyValuePair<TValue> | [string, TValue];
