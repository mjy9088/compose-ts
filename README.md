# compose-ts

Change `e(d(c(b(a(x)))))` to `compose(x)(a)(b)(c)(d)(e)()`

## Usage

```typescript
import { compose } from 'compose-ts';

const add = (n: number, num = 1) => n + num;
const multiply = (n: number, num = 2) => n * num;
const toString = (n: number) => n.toString();

const num = compose(42) // start compose!
            (add) // add 1
            (multiply) // multiply 2
            (add, 5) // add 5
            (toString) // ... and so on
            (); // end compose!
console.log(num); // 91 (= ((42 + 1) * 2 + 5).toString())

// ----------------------------------------------------------------

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
