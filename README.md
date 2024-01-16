# compose-ts

`compose-ts` is a TypeScript library that simplifies function composition, transforming nested calls into a manageable sequence.

## Installation

Install via npm or yarn:

```shell
npm install compose-ts
# or
yarn add compose-ts
```

## Usage

Import `compose` from `compose-ts` and use it to chain functions together.

### Basic Example

```typescript
import { compose } from 'compose-ts';

const add = (n: number, num = 1) => n + num;
const multiply = (n: number, num = 2) => n * num;
const toString = (n: number) => n.toString();

const num = compose(42)(add)(multiply)(add, 5)(toString)();
// Equivalent: const num = toString(add(multiply(add(42)), 5));

console.log(num); // "91"
```

### Advanced Example with Function Enhancers

```typescript
import { compose } from 'compose-ts';

type Func<TParameters extends any[], TReturnType> =
  (...args: TParameters) => TReturnType;

const add =
  <TParameters extends any[]>(func: Func<TParameters, number>, num = 1) =>
    (...args: TParameters) => func(...args) + num;

const multiply =
  <TParameters extends any[]>(func: Func<TParameters, number>, num = 2) =>
    (...args: TParameters) => func(...args) * num;

const parseInt =
  (func: Func<[number], number>) =>
    (arg: string) => func(parseInt(arg));

const I = (result: number) => result;

const enhanced = compose(I)(add)(multiply)(add, 5)(parseInt)();
// Equivalent: const enhanced = parseInt(add(multiply(add(I)), 5));

console.log(enhanced("42")); // 91
```

## Features

- Transforms complex nested function calls into linear sequences.
- Enhances readability and maintainability of TypeScript code.
- Supports function enhancers for advanced composition.

## Versioning

Follows [Semantic Versioning 2.0.0](https://semver.org/).

## Contributing

Contributions are welcome. Feel free to submit pull requests or open issues.

## License

Licensed under the [MIT License](LICENSE).
