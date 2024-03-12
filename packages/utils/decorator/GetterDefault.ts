const serialKey = 'serialize';

/**
 * Returns a default value for a decorated property if no original value exists (falsy).
 * @param { defaultValue } - the defaultValue to apply to a class property.
 * Usage:
 * class MyClass {
 *   @GetterDefault({ defaultValue: [] })
 *   myprop: Array<any>
 * }
 *
 * -- Somewhere else, make sure that Object.defineProperty is used to set the [serialKey] so that any subsequent gets
 * called for the property does the return checks. This is done to avoid initialisation requirements with TypeORM: (no property initialiser).
 */
export const GetterDefault: ({
	defaultValue,
}: {
	defaultValue: string | number | boolean | Array<any>;
}) => PropertyDecorator = ({ defaultValue }) => {
	return function (target, propertyKey) {
		if (typeof propertyKey === 'string') {
			const newSym = Symbol(propertyKey);
			return {
				get: function (this: any) {
					const defaultVal = this[serialKey] && !this[newSym] && defaultValue;
					return defaultVal || this[newSym];
				},
				set: function (this: any, value: any) {
					this[newSym] = value;
				},
				enumerable: true,
				configurable: true,
				writeable: true,
			};
		}
	};
};
