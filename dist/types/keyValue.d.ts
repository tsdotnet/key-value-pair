/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import type { default as KeyValuePair, KeyValuePairOrTuple } from './KeyValuePair.js';
export { KeyValuePair, KeyValuePairOrTuple };
export type { StringKeyValuePair, StringKeyValuePairOrTuple } from './KeyValuePair.js';
export declare function isKeyValuePair<TKey, TValue>(kvp: unknown): kvp is KeyValuePair<TKey, TValue>;
export declare function extractKeyValue<TKey, TValue, TResult>(item: KeyValuePairOrTuple<TKey, TValue>, to: (key: TKey, value: TValue) => TResult): TResult;
export default extractKeyValue;
