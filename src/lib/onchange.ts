'use strict';

export default function(object: any, onChange:Function){
	const handler = {
		get(target, property, receiver) {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty(target, property, descriptor) {
			let define = Reflect.defineProperty(target, property, descriptor);
			onChange(target, property);
			return define;
		},
		deleteProperty(target, property) {
			onChange(target, property, "deleted");
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(object, handler);
};
