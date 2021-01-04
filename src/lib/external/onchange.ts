'use strict';

export default function(object: any, onChange:Function){
	const handler = {
		get(target: object, property: string | number | symbol, receiver: any) {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty(target: object, property: string | number | symbol, descriptor: PropertyDescriptor) {
			let define = Reflect.defineProperty(target, property, descriptor);
			onChange(target, property);
			return define;
		},
		deleteProperty(target: object, property: string | number | symbol) {
			onChange(target, property, "deleted");
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(object, handler);
};
