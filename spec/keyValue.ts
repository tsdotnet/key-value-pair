import {isKeyValuePair} from '../src/keyValue';

describe('KeyValuePair', () => {
	it('returns true if an object has a key and value.', () => {
		expect(isKeyValuePair({key: 'key', value: 'value'})).toBeTrue();
		expect(isKeyValuePair({a: 'a', b: 'b', value: 'value', key: 'key'})).toBeTrue();
	});
	it('returns false if an object does not have a key and value.', () => {
		expect(isKeyValuePair({})).toBeFalse();
		expect(isKeyValuePair({a: 'a', b: 'b'})).toBeFalse();
		expect(isKeyValuePair({value: 'value'})).toBeFalse();
		expect(isKeyValuePair({key: 'value'})).toBeFalse();
	});
});
