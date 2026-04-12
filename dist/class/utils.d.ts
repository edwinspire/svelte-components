/**
 * Global store for managing active notifications.
 * Subscribers can listen to changes to update the UI.
 * @type {import('svelte/store').Writable<Array<Object>>}
 */
export let notifications_store: import("svelte/store").Writable<Array<any>>;
export function equalObjs(value: any, new_value: any): boolean;
/**
 * Class responsible for managing application notifications.
 * Provides methods to add and automatically or manually remove notifications from the global store.
 */
export class Notifications {
    /**
     * Adds a new notification to the global store and automatically schedules its removal.
     *
     * @param {Object} new_notify - The notification object to add.
     * @param {string} [new_notify.id] - Optional ID. One will be generated if not provided.
     * @param {number} [new_notify.timeout=5000] - Duration in milliseconds before the notification is automatically removed.
     * @param {string} [new_notify.message] - The message text of the notification (example property).
     * @param {string} [new_notify.type] - The type of notification, e.g., 'success', 'error', 'warning' (example property).
     */
    push(new_notify: {
        id?: string;
        timeout?: number;
        message?: string;
        type?: string;
    }): void;
    /**
     * Removes a notification from the global notifications store by its ID.
     *
     * @param {string} id - The unique identifier of the notification to be removed.
     */
    removeNotify(id: string): void;
}
