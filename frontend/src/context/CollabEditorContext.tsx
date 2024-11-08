import { useContext, createContext, ReactNode } from "react";
import * as monaco from "monaco-editor";
import { WebsocketProvider } from "y-websocket";

interface CollabEditorContextProps {
    updateClientWebSocket: (clientWebSocket: WebsocketProvider) => void;
    getClientWebSocket: () => WebsocketProvider;
    updateClientEditor: (clientEditor: monaco.editor.IStandaloneCodeEditor) => void;
    getClientEditor: () => monaco.editor.IStandaloneCodeEditor;
}

const CollabEditorContext = createContext<CollabEditorContextProps | undefined>(undefined);

export const CollabEditorContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const updateClientWebSocket = (clientWebSocket: WebsocketProvider) => {
        try {
            localStorage.setItem("clientWebSocket", JSON.stringify(clientWebSocket));
        } catch (error) {
            console.log("Failed to update clientWebSocket", error);
        }  
    }

    const getClientWebSocket = () => {
        const clientWebSocketString = localStorage.getItem("clientWebSocket");
        const clientWebSocket = clientWebSocketString ? JSON.parse(clientWebSocketString) : null;
        if (clientWebSocket) {
            try {
                return clientWebSocket;
            } catch (error) {
                console.log("Failed to parse clientWebSocket", error);
                return null;
            }
        } else {
            return null;
        }
    }

    const updateClientEditor = (clientEditor: monaco.editor.IStandaloneCodeEditor) => {
        try {
            localStorage.setItem("clientEditor", JSON.stringify(clientEditor));
        } catch (error) {
            console.log("Failed to update clientEditor", error);
        }  
    }

    const getClientEditor = () => {
        const clientEditorString = localStorage.getItem("clientEditor");
        const clientEditor = clientEditorString ? JSON.parse(clientEditorString) : null;
        if (clientEditor) {
            try {
                return clientEditor;
            } catch (error) {
                console.log("Failed to parse clientEditor", error);
                return null;
            }
        } else {
            return null;
        }
    }

    return (
        <CollabEditorContext.Provider value={{ updateClientWebSocket, getClientWebSocket, updateClientEditor, getClientEditor }}>
            {children}
        </CollabEditorContext.Provider>
    );
};

export const useCollabEditorContext = () => {
    const context = useContext(CollabEditorContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};