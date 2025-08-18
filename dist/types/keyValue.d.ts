/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import type { default as KeyValuePair, KeyValuePairOrTuple } from './KeyValuePair.d.ts';
export { KeyValuePair, KeyValuePairOrTuple };
export type { StringKeyValuePair, StringKeyValuePairOrTuple } from './KeyValuePair.d.ts';
export declare function isKeyValuePair<TKey, TValue>(kvp: unknown): kvp is KeyValuePair<TKey, TValue>;
export declare function extractKeyValue<TKey, TValue, TResult>(item: KeyValuePairOrTuple<TKey, TValue>, to: (key: TKey, value: TValue) => TResult): TResult;
export default extractKeyValue;
