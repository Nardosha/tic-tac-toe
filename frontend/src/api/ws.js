import SockJS from "sockjs-client/dist/sockjs"

const SOCKET_SERVER = 'http://localhost:3000'

export class WS {
    static instance;
    connection = null; // WebSocket | null
    isWSReady = false; // boolean

    listenerRegistry = {
        close: [],
        message: []
    }

    constructor() {
        this.connect()
    }


    static getInstance() {
        if (!WS.instance) {
            WS.instance = new WS()
        }

        return WS.instance
    }


    connect() {
        if (!this.connection) {
            const tempWS = new SockJS(SOCKET_SERVER)

            tempWS.onclose = event => {
                this.listenerRegistry.close.forEach(listener => listener(event))
            }

            tempWS.onmessage = event => {
                this.listenerRegistry.message.forEach(listener => listener(event))
            }

            this.waitSocketIsReady(tempWS)
        }
    }

    waitSocketIsReady(tempWS) {
        setTimeout(() => {
            if (tempWS.readyState === 1) {
            this.connection = tempWS
            this.isWSReady = true
            } else {
                this. waitSocketIsReady(tempWS)
            }
        }, 50)
    }

    subscribeClose(currentCandler) {
        this.listenerRegistry.close = [...this.listenerRegistry.close, currentCandler]

        return () => {
            this.listenerRegistry.close = this.listenerRegistry.close.filter( handler => handler !== currentCandler)
        }
    }
    
    subscribeMessage(currentCandler) {
        this.listenerRegistry.message = [...this.listenerRegistry.message, currentCandler]

        return () => {
            this.listenerRegistry.message = this.listenerRegistry.message.filter( handler => handler !== currentCandler)

        }
    }
    
    
    send(message) {
         if (this.connection) {
             this.connection.send(message)
         }
    }

    close() {
         if (this.connection) {
             this.connection.close();
             this.connection = null;
             this.isWSReady = false;
         }
    }
}