export interface Compose<TParameters extends any[], TReturnType> {
  (): (...args: TParameters) => TReturnType;
  <TReturnType2, TParameters2 extends any[], TExtra extends any[]>(
    enhancer: (
      func: (...args: TParameters) => TReturnType,
      ...extra: TExtra
    ) => (...args: TParameters2) => TReturnType2,
    ...extra: TExtra
  ): Compose<TParameters2, TReturnType2>;
}

export function compose<TParameters extends any[], TReturnType>(
  func: (...args: TParameters) => TReturnType
): Compose<TParameters, TReturnType> {
  return <Compose<TParameters, TReturnType>>(
    (<TReturnType2, TParameters2 extends any[], TExtra extends any[]>(
      enhancer?: (
        func: (...args: TParameters) => TReturnType,
        ...extra: TExtra
      ) => (...args: TParameters2) => TReturnType2,
      ...extra: TExtra
    ) => (enhancer ? compose(enhancer(func, ...extra)) : func))
  );
}
