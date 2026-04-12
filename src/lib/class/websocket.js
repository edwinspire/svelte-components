import { EventEmitter } from 'events'
import { writable } from 'svelte/store'

/**
 * Global store that holds the data received from PostgreSQL notifications via WebSocket.
 * Components can subscribe to this store to react to database table changes.
 * @type {import('svelte/store').Writable<Object>}
 */
const storeChangedTables = writable({})

/**
 * WebSocketClient class responsible for establishing a connection to the server's WebSocket endpoint.
 * It listens for 'pgNotify' events to update the `storeChangedTables` store.
 * Inherits from EventEmitter to potentially allow event-driven architecture.
 */
class WebSocketClient extends EventEmitter {
  /**
   * Initializes the WebSocket client.
   */
  constructor() {
    super()
    /** 
     * The WebSocket instance.
     * @type {WebSocket} 
     */
    this.websocket
  }

  /**
   * Establishes the WebSocket connection using the current global window.location.
   * Automatically handles reconnection on close and updates `storeChangedTables` upon receiving a table change notification.
   * 
   * @returns {WebSocket} The active WebSocket connection instance.
   */
  connect() {
    let url_wwebsocket = 'ws://' + window.location.host + '/websocket'

    if (window.location.protocol.includes('https')) {
      url_wwebsocket = 'wss://' + window.location.host + '/websocket'
    }

    console.log('Trying to open a WebSocket connection...', url_wwebsocket)
    this.websocket = new WebSocket(url_wwebsocket)
    this.websocket.onopen = (event) => {
      console.log('Connection opened')
    }
    this.websocket.onclose = (event) => {
      console.log('Connection closed')
      setTimeout(this.connect(), 2000)
    }
    this.websocket.onmessage = (event) => {
      //      console.log(event);
      let data = {}
      try {
        data = JSON.parse(event.data)
      } catch (error) {
        console.error(error)
      }
      //    console.log("Websocket", data);

      if (
        data &&
        data.topic == 'pgNotify' &&
        data.message.channel == 'onchange-table'
      ) {
        //    console.log("storeChangedTables Set");
        try {
          storeChangedTables.set(JSON.parse(data.message.payload))
        } catch (error) {
          console.error(error)
          storeChangedTables.set({})
        }
      }
    }

    return this.websocket
  }
}

export { storeChangedTables, WebSocketClient }
