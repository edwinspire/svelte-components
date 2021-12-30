const EventEmitter = require("events");
const sioc = require("socket.io-client");
import { writable } from "svelte/store";
const storeChangedTables = writable({});

export class socketIoClient extends EventEmitter {
  constructor() {
    super();
    this.socketio = {};
  }

  connect() {
    let url_wwebsocket = window.location.protocol + "//" + window.location.host;
    console.log(url_wwebsocket);
    this.socketio = sioc.io(url_wwebsocket);
    this.socketio.on("connect", function (c) {
      console.log("connected", c);
    });

    this.socketio.on("pg-change-table", (c) => {
      console.log("pg-change-table", c, storeChangedTables);
      storeChangedTables.set(c);
      /*
        changedTables.subscribe((data) => {
  
          console.log("changedTables", data);
        });
        */
    });
    return this.socketio;
  }
}
