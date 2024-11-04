class ClientWebSocket {
    private socket: WebSocket;
    private userId!: string;
    private ydoc!: any;
    private ytext!: any;
    public otherUserLeft: boolean = false;

    constructor() {
        this.socket = new WebSocket("ws://localhost:1234");

        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
    }

    private onOpen(event: Event) {
        console.log("WebSocket connection opened:", event);
        // Add any additional logic for when the connection opens
    }

    private onMessage(event: MessageEvent) {
        console.log("WebSocket message received:", event.data);
        // Add any additional logic for when a message is received
        // Receive the unique ID from the server
        const message = JSON.parse(event.data);

        console.log("Message type:", message.type);

        switch (message.type) {
            case "USER_ID":
                this.userId = message.uniqueId;
                console.log("User ID received:", this.userId);
                break;
            case "room-full":
                console.log(
                    "Both users have joined the room, generating YDoc..."
                );
                this.createYDocMessage(message.roomId); // Create YDoc for the room, once both users have joined
                break;
            case "generatedYdoc":
                console.log("YDoc generated:", message.ydoc);
                this.ydoc = message.ydoc;
                this.ytext = message.ytext;
                break;
            case "other-user-left-room":
                this.otherUserLeft = true;
                console.log("Other user has left the room:", message.userId);
                break;
            default:
                console.warn("Unknown message type:", message.type);
                break;
        }
    }

    private readBlobAsText(blob: Blob): any {
        let file = new Blob([blob], { type: "application/json" });
        const parsedData = null;
        file.text()
            .then((value) => {
                const parsedData = JSON.parse(value);
                console.log(parsedData);
            })
            .catch((error) => {
                console.log("Unable to parse data" + error);
            });
        return parsedData;
    }

    private onClose(event: CloseEvent) {
        console.log("WebSocket connection closed:", event);
        // Add any additional logic for when the connection closes
    }

    private addUserIdToMessage(data: any): string {
        const extendedData = { ...data, userId: this.userId }; // add user ID to the data
        return extendedData;
    }

    private addTypeToMessage(data: any, type: string): string {
        const extendedData = { ...data, type: type }; // add type to the data
        return extendedData;
    }

    public sendJoinRoomMessage(roomId: string) {
        console.log(`Sending join room message for room ID: ${roomId}...`);
        const message = this.addUserIdToMessage(
            this.addTypeToMessage({ roomId: roomId }, "join-room")
        );
        this.sendMessage(JSON.stringify(message));
    }

    private createYDocMessage(roomId: string) {
        const message = this.addUserIdToMessage(
            this.addTypeToMessage({ roomId: roomId }, "create-ydoc")
        );
        this.sendMessage(JSON.stringify(message));
    }

    public getYDoc() {
        return this.ydoc;
    }

    public getYText() {
        return this.ytext;
    }

    public sendLeaveRoomMessage(roomId: string) {
        const message = this.addUserIdToMessage(
            this.addTypeToMessage({ roomId: roomId }, "leave-room")
        );
        this.sendMessage(JSON.stringify(message));
    }

    public sendMessage(message: string) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error(
                "WebSocket is not open. Ready state:",
                this.socket.readyState
            );
        }
    }
}

export default ClientWebSocket;
