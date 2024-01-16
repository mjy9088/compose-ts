# compose-ts

Change `e(d(c(b(a(x)))))` to `compose(x)(a)(b)(c)(d)(e)()`

## Usage

```typescript
import { compose } from 'compose-ts';

type Func<TParameters extends any[], TReturnType>
  = (...args: TParameters) => TReturnType;

const addEnhancer = <TParameters extends any[]>
  (func: Func<TParameters, number>, num = 1) =>
    (...args: TParameters) => func(...args) + num;
const multiplyEnhancer = <TParameters extends any[]>
  (func: Func<TParameters, number>, num = 2) =>
    (...args: TParameters) => func(...args) * num;
const parseIntEnhancer = (func: Func<[number], number>) =>
  (arg: string) => func(parseInt(arg));

const I = (result: number) => result;
const enhanced = compose(I) // start compose!
                (addEnhancer) // apply addEnhancer
                (multiplyEnhancer) // apply multiplyEnhancer
                (addEnhancer, 5) // apply addEnhancer with argument 5
                (parseIntEnhancer) // ... and so on
                (); // end compose!
console.log(enhanced("42")); // 91 (= (42 + 1) * 2 + 5)
```
