import {EventEmitter} from "events";
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
//      console.log(event);
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.error(error);
      }
  //    console.log("Websocket", data);

      if (
        data &&
        data.topic == "pgNotify" &&
        data.message.channel == "onchange-table"
      ) {
    //    console.log("storeChangedTables Set");
        try {
          storeChangedTables.set(JSON.parse(data.message.payload));
        } catch (error) {
          console.error(error);
          storeChangedTables.set({});
        }
      }
    };

    return this.websocket;
  }
}


export { storeChangedTables,  WebSocketClient };