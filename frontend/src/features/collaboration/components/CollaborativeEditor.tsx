import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as monaco from "monaco-editor";
import { useUser } from "../../../context/UserContext";

const CollaborativeEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const { roomId } = useUser();

    useEffect(() => {
        // Create a new Yjs document
        const ydoc = new Y.Doc();
        const yText = ydoc.getText("monaco");

        const wsOpts = {
            // Specify a query-string that will be url-encoded and attached to the `serverUrl`
            // I.e. params = { auth: "bearer" } will be transformed to "?auth=bearer"
            params: { roomId: roomId }, // Object<string,string>
        };

        // Connect to the WebSocket server
        const provider = new WebsocketProvider(
            "ws://localhost:1234",
            roomId, // ensure that only matched users are able to type together (setting roomId to be empty if it is undefined could lead to bugs)
            ydoc,
            wsOpts
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
