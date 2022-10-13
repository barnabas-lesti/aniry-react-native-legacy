export type AppStackScreenOptions<T> = {
  name: keyof T;
  Component: (props?: any) => JSX.Element;
};
