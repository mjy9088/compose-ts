class ComposeInternal<TParameters extends any[], TReturnType> {
  private readonly func: (...args: TParameters) => TReturnType;

  constructor(func: (...args: TParameters) => TReturnType) {
    this.func = func;
  }

  public build(): (...args: TParameters) => TReturnType {
    return this.func;
  }

  public enhance<TReturnType2, TParameters2 extends any[], TExtra extends any[]>(
    enhancer: (
      func: (...args: TParameters) => TReturnType,
      ...extra: TExtra
    ) => (...args: TParameters2) => TReturnType2,
    ...extra: TExtra
  ): ComposeInternal<TParameters2, TReturnType2> {
    return new ComposeInternal(enhancer(this.func, ...extra));
  }
}

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
  const internal = new ComposeInternal(func);
  return (<TReturnType2, TParameters2 extends any[], TExtra extends any[]>(
    func?: (
      func: (...args: TParameters) => TReturnType,
      ...extra: TExtra
    ) => (...args: TParameters2) => TReturnType2,
    ...extra: TExtra
  ) =>
    func
      ? compose(internal.enhance(func, ...extra).build())
      : internal.build()) as Compose<TParameters, TReturnType>;
}
