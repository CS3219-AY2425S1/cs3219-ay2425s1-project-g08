import Editor from "@monaco-editor/react";

// Not sure if this will work if i use a stream of yjs to build code history
const ReadonlyReactEditor = () => {
  return (
    <>
      <Editor 
        height="90vh" 
        defaultLanguage="javascript" 
        defaultValue="// some comment" 
        options={
          {readOnly: true}
        }
      />;
    </>
  )
}

export default ReadonlyReactEditor; 