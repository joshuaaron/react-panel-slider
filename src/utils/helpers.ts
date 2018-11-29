export const pipe = (...fns: Function[]) => (x: any) =>
	fns.reduce((v, fn) => fn(v), x);

export const isFunction = <T extends Function>(value: any): value is T =>
	typeof value === 'function';
