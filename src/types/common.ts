export type SelectOptionType = {
  code: number;
  name: string;
};

export type SelectOptionWithIdType = {
  id: number;
  name: string;
};

export type FilterOnChangeType<T, A> = (params: T, auxiliaries?: A) => void;

export type AntdFormErrors = Array<{ name: string; errors: [string] }>;
