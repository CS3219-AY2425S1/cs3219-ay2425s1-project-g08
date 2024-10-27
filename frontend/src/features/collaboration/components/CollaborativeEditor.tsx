// src/CollaborativeEditor.tsx
import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as monaco from "monaco-editor";

interface CollaborativeEditorProps {
    roomID: string;
}

const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
    roomID,
}) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Create a new Yjs document
        const ydoc = new Y.Doc();
        const yText = ydoc.getText("monaco");

        // Connect to the WebSocket server
        const provider = new WebsocketProvider(
            "ws://localhost:8080",
            roomID, // ensure that only mathced users are able to type together
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
