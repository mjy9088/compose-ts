export interface Compose<T> {
  (): T;
  <TReturnType, TExtra extends any[]>(
    func: (value: T, ...extra: TExtra) => TReturnType,
    ...extra: TExtra
  ): Compose<TReturnType>;
}

export function compose<T>(value: T): Compose<T> {
  return <Compose<T>>(
    (<TReturnType, TParameters extends any[], TExtra extends any[]>(
      func?: (
        value: T,
        ...extra: TExtra
      ) => (...args: TParameters) => TReturnType,
      ...extra: TExtra
    ) => (func ? compose(func(value, ...extra)) : value))
  );
}
