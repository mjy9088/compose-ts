# compose-ts

```
((y → z), (x → y), …, (o → p), ((a, b, …, n) → o)) → ((a, b, …, n) → z)
```

Performs right-to-left function composition.

## Usage

```typescript
import { compose } from 'compose-ts';

type Func<TParameters extends any[], TReturnType> = (...args: TParameters) => TReturnType;

const logEnhancer = <TParameters extends any[], TReturnType>(func: Func<TParameters, TReturnType>, format?: (args: TParameters, returnValue: TReturnType) => string) => (...args: TParameters) => {
  const returnValue = func(...args);
  console.log((format ?? ((args, returnValue) => `function called with parameter [${args.join(', ')}], returned ${returnValue}`))(args, returnValue));
  return returnValue;
};
const addEnhancer = <TParameters extends any[]>(func: Func<TParameters, number>, num = 1) => (...args: TParameters) => func(...args) + num;
const multiplyEnhancer = <TParameters extends any[]>(func: Func<TParameters, number>, num = 1) => (...args: TParameters) => func(...args) * num;
const toUpperEnhancer = <TParameters extends any[]>(func: Func<TParameters, string>) => (...args: TParameters) => func(...args).toUpperCase();

const func1 = (world: string) => `Hello ${world}!`;
const func2 = () => 42;
const func3 = (a: number, b: number) => a + b;

const func1Enhanced1 = compose(func1)(toUpperEnhancer)();
const func1Enhanced2 = compose(func1)(logEnhancer)(toUpperEnhancer)(logEnhancer)();
```
