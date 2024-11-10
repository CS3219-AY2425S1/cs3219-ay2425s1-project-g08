export class RoomServer {
    private socket: WebSocket;

    constructor(url: string) {
        this.socket = new WebSocket(`wss://localhost:1234/${url}`);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    }

    private onOpen() {
        console.log('WebSocket connection established');
    }

    private onMessage(event: MessageEvent) {
        console.log('Received message:', event.data);
    }

    public onAnUserLeft() {
        console.log('An user left the room');
    }

    private onClose() {
        console.log('WebSocket connection closed');
    }

    private onError(event: Event) {
        console.error('WebSocket error:', event);
    }

    public start() {
        console.log(`WebSocket server is running on ${this.socket.url}`);
    }
}

export default RoomServer;