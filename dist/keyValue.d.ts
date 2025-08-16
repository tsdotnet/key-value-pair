/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import type { default as KeyValuePair, KeyValuePairOrTuple } from './KeyValuePair.d.ts';
export { KeyValuePair, KeyValuePairOrTuple };
export type { StringKeyValuePair, StringKeyValuePairOrTuple } from './KeyValuePair.d.ts';
/**
 * Returns true if an object has a key and a value property.
 * @param kvp
 * @returns {kvp is KeyValuePair<TKey, TValue>}
 */
export declare function isKeyValuePair<TKey, TValue>(kvp: unknown): kvp is KeyValuePair<TKey, TValue>;
/**
 * Processes a key-value pair through a delegate function.
 * @param {KeyValuePairOrTuple<TKey, TValue>} item A KeyValuePair object, or a tuple of key (0) and value (1)
 * @param {(key: TKey, value: TValue) => TResult} to The delegate to produce a result from.
 * @returns {TResult}
 */
export declare function extractKeyValue<TKey, TValue, TResult>(item: KeyValuePairOrTuple<TKey, TValue>, to: (key: TKey, value: TValue) => TResult): TResult;
export default extractKeyValue;
