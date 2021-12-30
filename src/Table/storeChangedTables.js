import { writable } from 'svelte/store';
const storeChangedTables = writable({});

const storeChangedTablesUpdate = function storeChangedTables(socketIoClient) {
  try {
    socketIoClient.on("pg-change-table", (c) => {
      console.log("pg-change-table", c, changedTables, $changedTables);
      changedTables.set(c);
/*
      changedTables.subscribe((data) => {

        console.log("changedTables", data);
      });
      */
    });
  } catch (error) {
    console.error(error);
  }
}

export{ storeChangedTables, storeChangedTablesUpdate };