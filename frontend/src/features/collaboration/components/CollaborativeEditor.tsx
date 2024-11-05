import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as monaco from "monaco-editor";
import { useUser } from "../../../context/UserContext";
import apiConfig from "../../../config/config.ts";
import { Question } from "../../questions";
import { formatISOstringFormat } from "../../../util/dateTime";

type AttemptForm = {
    attemptDateTime: string,
    content: string,
    userId: string,
    title: string,
    description: string,
    categories: string[],
    complexity: string
}

type CollaborativeEditorProps = {
    question: Question | undefined
}

const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({ question }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const { user, roomId } = useUser();
    const questionRef = useRef(question);
    const now = new Date();

    useEffect(() => {
        questionRef.current = question;
    }, [question]);

    const saveEditorHistory = async () => {
        if (!user || !questionRef.current || !monacoEditorRef.current) {
            console.log("No user or question found or editor!");
            return;
        }
        const questionItem = questionRef.current;
        const body: AttemptForm = {
            attemptDateTime: formatISOstringFormat(now),
            content: monacoEditorRef.current.getValue(),
            userId: user.id,
            title: questionItem.title,
            description: questionItem.description,
            categories: questionItem.categories,
            complexity: questionItem.complexity
        }
        try {
            const response = await fetch(
            `${apiConfig.historyServiceUrl}/attempt`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": `${apiConfig.historyServiceUrl}`,
                },
                body: JSON.stringify(body)
            }
            );
            const data = await response.json();
            console.log(`Response received from history service: ${data}`);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

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

        monacoEditorRef.current = editor;

        // Bind the Yjs document to the Monaco editor
        new MonacoBinding(yText, editor.getModel()!, new Set([editor]));

        return () => {
            saveEditorHistory();
            editor.dispose(); // Clean up editor on unmount
            provider.destroy(); // Close the WebSocket connection
        };
    }, []);

    return <div ref={editorRef} style={{ height: "100vh", width: "100%" }} />;
};

export default CollaborativeEditor;
