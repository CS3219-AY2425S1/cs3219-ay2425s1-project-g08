import React from "react";
import Editor from "@monaco-editor/react";

const CollaborativeEditor: React.FC = () => {
    return (
        <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme="vs-light"
        />
    );
};

export default CollaborativeEditor;
