<a name="banner"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/key-value-pair@master/assets/banner.svg" alt="@tsdotnet/key-value-pair: Pairs, or tuples. One shape for key and value."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/key-value-pair.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/key-value-pair)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/key-value-pair/blob/master/LICENSE)

One shape for key and value pairs, accepted as an object or a two item tuple.

## Install

```sh
npm install @tsdotnet/key-value-pair
```

## Usage

```ts
import { extractKeyValue, type KeyValuePairOrTuple } from '@tsdotnet/key-value-pair';

const join = (pair: KeyValuePairOrTuple<string, number>) =>
	extractKeyValue(pair, (k, v) => k + '=' + v);

join({ key: 'a', value: 1 }); // 'a=1'
join(['a', 1]);              // 'a=1'
```

It throws an `ArgumentException` when the input is neither form, or when the key or value is `undefined`. `isKeyValuePair` checks an unknown value.

## Use it from

ESM (`import { extractKeyValue } from '@tsdotnet/key-value-pair';`) or CommonJS (`const { extractKeyValue } = require('@tsdotnet/key-value-pair');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/key-value-pair@1/dist/umd/key-value-pair.min.js"></script>
<script>
  const { extractKeyValue } = tsdotnet.keyValuePair;
</script>
```

</details>

## Docs

[tsdotnet.github.io/key-value-pair](https://tsdotnet.github.io/key-value-pair/)
