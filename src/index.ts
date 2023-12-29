class ComposeInternal<TReturn, TArgs extends any[]> {
  private readonly func: (...args: TArgs) => TReturn;

  constructor(func: (...args: TArgs) => TReturn) {
    this.func = func;
  }

  public build(): (...args: TArgs) => TReturn {
    return this.func;
  }

  public enhance<TReturn2, TArgs2 extends any[], TExtra extends any[]>(
    enhancer: (
      func: (...args: TArgs) => TReturn,
      ...extra: TExtra
    ) => (...args: TArgs2) => TReturn2,
    ...extra: TExtra
  ): ComposeInternal<TReturn2, TArgs2> {
    return new ComposeInternal(enhancer(this.func, ...extra));
  }
}

export interface Compose<TReturn, TArgs extends any[]> {
  (): (...args: TArgs) => TReturn;
  <TReturn2, TArgs2 extends any[], TExtra extends any[]>(
    enhancer: (
      func: (...args: TArgs) => TReturn,
      ...extra: TExtra
    ) => (...args: TArgs2) => TReturn2,
    ...extra: TExtra
  ): Compose<TReturn2, TArgs2>;
}

export function compose<TReturn, TArgs extends any[]>(
  func: (...args: TArgs) => TReturn
): Compose<TReturn, TArgs> {
  const internal = new ComposeInternal(func);
  return (<TReturn2, TArgs2 extends any[], TExtra extends any[]>(
    func?: (
      func: (...args: TArgs) => TReturn,
      ...extra: TExtra
    ) => (...args: TArgs2) => TReturn2,
    ...extra: TExtra
  ) =>
    func
      ? compose(internal.enhance(func, ...extra).build())
      : internal.build()) as Compose<TReturn, TArgs>;
}
