export interface Compose<T> {
  (): T;
  <TReturnType, TExtra extends any[]>(
    func: (value: T, ...extra: TExtra) => TReturnType,
    ...extra: TExtra
  ): Compose<TReturnType>;
}

export function compose<T>(value: T): Compose<T> {
  return (<TReturnType, TExtra extends any[]>(
    func?: (value: T, ...extra: TExtra) => TReturnType,
    ...extra: TExtra
  ): T | Compose<TReturnType> =>
    func ? compose(func(value, ...extra)) : value) as Compose<T>;
}
