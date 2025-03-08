export let notifications_store: import("svelte/store").Writable<any[]>;
export function equalObjs(value: any, new_value: any): boolean;
export class Notifications {
    push(new_notify: any): void;
    removeNotify(id: any): void;
}
