import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as monaco from "monaco-editor";
import { useUser } from "../../../context/UserContext";
import apiConfig from "../../../config/config.ts";

const CollaborativeEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { roomId } = useUser();

    const COLLAB_WEBSOCKET_URL: string = apiConfig.collaborationWebSocketUrl;

    useEffect(() => {
        // Create a new Yjs document
        const ydoc = new Y.Doc();
        const yText = ydoc.getText("monaco");

        // Connect to the WebSocket server
        const provider = new WebsocketProvider(
            COLLAB_WEBSOCKET_URL,
            roomId, // ensure that only mathced users are able to type together (setting roomId to be empty if it is undefined could lead to bugs)
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
