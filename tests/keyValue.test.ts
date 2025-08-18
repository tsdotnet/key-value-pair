import { describe, it, expect } from 'vitest';
import {isKeyValuePair} from '../src/keyValue';

describe('KeyValuePair', () => {
	it('returns true if an object has a key and value.', () => {
		expect(isKeyValuePair({key: 'key', value: 'value'})).toBe(true);
		expect(isKeyValuePair({a: 'a', b: 'b', value: 'value', key: 'key'})).toBe(true);
	});
	it('returns false if an object does not have a key and value.', () => {
		expect(isKeyValuePair({})).toBe(false);
		expect(isKeyValuePair({a: 'a', b: 'b'})).toBe(false);
		expect(isKeyValuePair({value: 'value'})).toBe(false);
		expect(isKeyValuePair({key: 'value'})).toBe(false);
	});
});
