const EventEmitter = require("events");
const sioc = require("socket.io-client");
import { writable } from "svelte/store";
const storeChangedTables = writable({});

class WebSocketClient extends EventEmitter {
  constructor() {
    super();
    this.websocket;
  }

  connect() {
    let url_wwebsocket = "ws://" + window.location.host + "/websocket";

    if (window.location.protocol.includes("https")) {
      url_wwebsocket = "wss://" + window.location.host + "/websocket";
    }

    console.log("Trying to open a WebSocket connection...", url_wwebsocket);
    this.websocket = new WebSocket(url_wwebsocket);
    this.websocket.onopen = (event) => {
      console.log("Connection opened");
    };
    this.websocket.onclose = (event) => {
      console.log("Connection closed");
      setTimeout(this.connect(), 2000);
    };
    this.websocket.onmessage = (event) => {
      
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.error(error);
      }
      console.log("Websocket", data);

      if (
        data &&
        data.topic == "pgNotify" &&
        data.message.channel == "onchange-table"
      ) {
        console.log("storeChangedTables Set");
        try {
          storeChangedTables.set(data);
        } catch (error) {
          console.error(error);
          storeChangedTables.set({});
        }
      }
    };

    return this.websocket;
  }
}

class socketIoClient extends EventEmitter {
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
      try {
        storeChangedTables.set(JSON.parse(c));
      } catch (error) {
        console.error(error);
        storeChangedTables.set({});
      }
    });
    return this.socketio;
  }
}
export { storeChangedTables, socketIoClient, WebSocketClient };
