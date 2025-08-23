import { describe, it, expect } from 'vitest';
import { isKeyValuePair, extractKeyValue } from '../src/keyValue';
import { ArgumentException, ArgumentNullException } from '@tsdotnet/exceptions';

describe('KeyValuePair', () => {
	describe('isKeyValuePair', () => {
		it('returns true if an object has a key and value', () => {
			expect(isKeyValuePair({ key: 'key', value: 'value' })).toBe(true);
			expect(isKeyValuePair({ a: 'a', b: 'b', value: 'value', key: 'key' })).toBe(true);
			expect(isKeyValuePair({ key: null, value: undefined })).toBe(true);
			expect(isKeyValuePair({ key: 0, value: false })).toBe(true);
		});

		it('returns false if an object does not have a key and value', () => {
			expect(isKeyValuePair({})).toBe(false);
			expect(isKeyValuePair({ a: 'a', b: 'b' })).toBe(false);
			expect(isKeyValuePair({ value: 'value' })).toBe(false);
			expect(isKeyValuePair({ key: 'value' })).toBe(false);
		});

		it('returns false for null or undefined', () => {
			expect(isKeyValuePair(null)).toBe(false);
			expect(isKeyValuePair(undefined)).toBe(false);
		});

		it('returns false for primitive types', () => {
			expect(isKeyValuePair('string')).toBe(false);
			expect(isKeyValuePair(42)).toBe(false);
			expect(isKeyValuePair(true)).toBe(false);
		});
	});

	describe('extractKeyValue', () => {
		it('should extract from KeyValuePair object', () => {
			const kvp = { key: 'testKey', value: 'testValue' };
			const result = extractKeyValue(kvp, (key, value) => `${key}:${value}`);
			expect(result).toBe('testKey:testValue');
		});

		it('should extract from tuple array', () => {
			const tuple: [string, number] = ['count', 42];
			const result = extractKeyValue(tuple, (key, value) => ({ k: key, v: value }));
			expect(result).toEqual({ k: 'count', v: 42 });
		});

		it('should handle null key in KeyValuePair object', () => {
			const kvp = { key: null, value: 'testValue' };
			expect(() => extractKeyValue(kvp, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentNullException);
		});

		it('should handle undefined key in KeyValuePair object', () => {
			const kvp = { key: undefined, value: 'testValue' };
			expect(() => extractKeyValue(kvp, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);
		});

		it('should handle undefined value in KeyValuePair object', () => {
			const kvp = { key: 'testKey', value: undefined };
			expect(() => extractKeyValue(kvp, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);
		});

		it('should handle null key in tuple', () => {
			const tuple: [null, string] = [null, 'testValue'];
			expect(() => extractKeyValue(tuple, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentNullException);
		});

		it('should handle undefined key in tuple', () => {
			const tuple: [undefined, string] = [undefined, 'testValue'];
			expect(() => extractKeyValue(tuple, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);
		});

		it('should handle undefined value in tuple', () => {
			const tuple: [string, undefined] = ['testKey', undefined];
			expect(() => extractKeyValue(tuple, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);
		});

		it('should handle tuple with wrong length', () => {
			const shortTuple = ['key'];
			expect(() => extractKeyValue(shortTuple as any, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);

			const longTuple = ['key', 'value', 'extra'];
			expect(() => extractKeyValue(longTuple as any, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);
		});

		it('should handle invalid input types', () => {
			expect(() => extractKeyValue('invalid' as any, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);

			expect(() => extractKeyValue(42 as any, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);

			expect(() => extractKeyValue({} as any, (key, value) => `${key}:${value}`))
				.toThrow(ArgumentException);
		});

		it('should handle null values correctly in KeyValuePair', () => {
			const kvp = { key: 'testKey', value: null };
			const result = extractKeyValue(kvp, (key, value) => ({ key, value }));
			expect(result).toEqual({ key: 'testKey', value: null });
		});

		it('should handle null values correctly in tuple', () => {
			const tuple: [string, null] = ['testKey', null];
			const result = extractKeyValue(tuple, (key, value) => ({ key, value }));
			expect(result).toEqual({ key: 'testKey', value: null });
		});

		it('should work with different key and value types', () => {
			const numericKvp = { key: 123, value: true };
			const result1 = extractKeyValue(numericKvp, (key, value) => key + (value ? 1 : 0));
			expect(result1).toBe(124);

			const numericTuple: [number, boolean] = [456, false];
			const result2 = extractKeyValue(numericTuple, (key, value) => key + (value ? 1 : 0));
			expect(result2).toBe(456);
		});

		it('should work with complex value types', () => {
			const complexKvp = { key: 'config', value: { setting: 'enabled', count: 5 } };
			const result = extractKeyValue(complexKvp, (key, value) => `${key}:${JSON.stringify(value)}`);
			expect(result).toBe('config:{"setting":"enabled","count":5}');
		});
	});
});
