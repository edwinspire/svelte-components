import { writable } from 'svelte/store';

export let notifications_store = writable([]);

export const equalObjs = (value, new_value) => {
	let new_value_str = typeof new_value == 'object' ? JSON.stringify(new_value) : new_value;
	let currect_value_str = typeof value == 'object' ? JSON.stringify(value) : value;
	console.log(value, new_value, new_value_str, currect_value_str);
	return new_value_str == currect_value_str;
};

export class Notifications {
	constructor() {
		/*
		notifications_store.subscribe((value) => {
			console.log('notifications_store: ', value);
		}); 
		*/
	}

	push(new_notify) {
		//	console.log(notifications_store);
		new_notify.id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

		//notifications_store.set(['Hola mundo']);
		notifications_store.update((u) => {
			//			console.log('>>', u.length);
			u.push(new_notify);
			setTimeout(() => {
				this.removeNotify(new_notify.id);
			}, new_notify.timeout || 5000);
			return u;
		});
	}

	removeNotify(id) {
		notifications_store.update((u) => {
			const index = u.findIndex((obj) => obj.id === id);
			if (index !== -1) {
				u.splice(index, 1);
				//	console.log(`Objeto con ID ${id} eliminado. Lista actualizada:`, u);
			}
			return u;
		});
	}
}
