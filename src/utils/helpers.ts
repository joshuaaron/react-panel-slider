/** pass returned value to next function to use */
export const pipe = (...fns: Function[]) => (x: any) =>
	fns.reduce((v, fn) => fn(v), x);

/** typecheck function */
export const isFunction = <T extends Function>(value: any): value is T =>
	typeof value === 'function';

/** Retrieve the values of object from a list of keys */
export const pluck = <T, K extends keyof T>(o: T) => (keys: K[]) => keys.map(k => o[k]);