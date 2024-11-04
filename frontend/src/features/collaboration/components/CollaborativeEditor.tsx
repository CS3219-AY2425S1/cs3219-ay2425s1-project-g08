import React, { useEffect, useRef } from "react";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as monaco from "monaco-editor";
import { useUser } from "../../../context/UserContext";
import ClientWebSocket from "../ClientWebSocket";

const CollaborativeEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { roomId, setClientWebSocket } = useUser();
    console.log("roomId", roomId);

    // initialise client websocket
    const clientWebSocket = new ClientWebSocket();

    // set the client websocket in the user context
    setClientWebSocket(clientWebSocket);

    clientWebSocket.sendJoinRoomMessage(roomId);

    useEffect(() => {
        // Create a new Yjs document. Requires null check for yDoc and yText. Will happen if other user does not join the room
        const ydoc = clientWebSocket.getYDoc();
        const yText = clientWebSocket.getYText();

        // Connect to the WebSocket server
        const provider = new WebsocketProvider(
            "ws://localhost:1234",
            roomId,
            ydoc
        );

        // Initialize the Monaco editor
        const editor = monaco.editor.create(editorRef.current!, {
            language: "javascript",
            automaticLayout: true,
        });

        // Bind the Yjs document to the Monaco editor
        new MonacoBinding(yText, editor.getModel()!, new Set([editor]));

        return () => {
            editor.dispose(); // Clean up editor on unmount
            provider.destroy(); // Close the WebSocket connection
        };
    }, []);

    return <div ref={editorRef} style={{ height: "100vh", width: "100%" }} />;
};

export default CollaborativeEditor;
