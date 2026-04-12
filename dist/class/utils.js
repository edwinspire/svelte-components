import { writable } from 'svelte/store';

/**
 * Global store for managing active notifications.
 * Subscribers can listen to changes to update the UI.
 * @type {import('svelte/store').Writable<Array<Object>>}
 */
export let notifications_store = writable([]);

/**
 * Compares two values for equality. If the values are objects, they are compared via JSON.stringify.
 * Useful for deep comparison of simple objects or comparing state changes.
 * 
 * @param {any} value - The first value to compare (current state).
 * @param {any} new_value - The second value to compare (new state).
 * @returns {boolean} True if the stringified values are identical, false otherwise.
 */
export const equalObjs = (value, new_value) => {
	let new_value_str = typeof new_value == 'object' ? JSON.stringify(new_value) : new_value;
	let currect_value_str = typeof value == 'object' ? JSON.stringify(value) : value;
	console.log(value, new_value, new_value_str, currect_value_str);
	return new_value_str == currect_value_str;
};

/**
 * Class responsible for managing application notifications.
 * Provides methods to add and automatically or manually remove notifications from the global store.
 */
export class Notifications {
	/**
	 * Creates an instance of Notifications.
	 */
	constructor() {
		/*
		notifications_store.subscribe((value) => {
			console.log('notifications_store: ', value);
		}); 
		*/
	}

	/**
	 * Adds a new notification to the global store and automatically schedules its removal.
	 * 
	 * @param {Object} new_notify - The notification object to add.
	 * @param {string} [new_notify.id] - Optional ID. One will be generated if not provided.
	 * @param {number} [new_notify.timeout=5000] - Duration in milliseconds before the notification is automatically removed.
	 * @param {string} [new_notify.message] - The message text of the notification (example property).
	 * @param {string} [new_notify.type] - The type of notification, e.g., 'success', 'error', 'warning' (example property).
	 */
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

	/**
	 * Removes a notification from the global notifications store by its ID.
	 * 
	 * @param {string} id - The unique identifier of the notification to be removed.
	 */
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
