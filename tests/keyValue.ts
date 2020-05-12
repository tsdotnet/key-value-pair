import {expect} from 'chai';
import {isKeyValuePair} from '../src/keyValue';

describe('KeyValuePair', () => {
	it('returns true if an object has a key and value.', () => {
		expect(isKeyValuePair({key: 'key', value: 'value'})).to.be.true;
		expect(isKeyValuePair({a: 'a', b: 'b', value: 'value', key: 'key'})).to.be.true;
	});
	it('returns false if an object does not have a key and value.', () => {
		expect(isKeyValuePair({})).to.be.false;
		expect(isKeyValuePair({a: 'a', b: 'b'})).to.be.false;
		expect(isKeyValuePair({value: 'value'})).to.be.false;
		expect(isKeyValuePair({key: 'value'})).to.be.false;
	});
});
