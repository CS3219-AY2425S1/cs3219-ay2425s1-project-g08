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
    question: Question | undefined,
    setSaveHistoryCallback: React.Dispatch<React.SetStateAction<() => Promise<void>>>
}

const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({ question, setSaveHistoryCallback }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const providerRef = useRef<WebsocketProvider | null>(null);
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
        console.log("Sending save history request to backend");
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
        setSaveHistoryCallback(() => saveEditorHistory);
    }, [setSaveHistoryCallback]);

    useEffect(() => {
        if (!editorRef.current) return;

        const editor = monaco.editor.create(editorRef.current, {
            language: "javascript",
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
        });

        monacoEditorRef.current = editor;

        return () => {
            editor.dispose();
        };
    }, []);

    useEffect(() => {
        if (!roomId || !monacoEditorRef.current) {
            return;
        }

        const ydoc = new Y.Doc();
        const yText = ydoc.getText("monaco");

        const wsOpts = {
            params: { roomId }
        };

        const wsUrl = new URL(`${apiConfig.collaborationWebSocketUrl}`, window.location.origin);
        wsUrl.protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        
        // Connect to the WebSocket server
        const provider = new WebsocketProvider(
            wsUrl.toString(),
            roomId,
            ydoc,
            wsOpts
        );

        providerRef.current = provider;

        new MonacoBinding(yText, monacoEditorRef.current.getModel()!, new Set([monacoEditorRef.current]));

        return () => {
            provider.destroy();
        };
    }, [roomId]); 

    return <div ref={editorRef} style={{ height: "100vh", width: "100%" }} />;
};

export default CollaborativeEditor;
