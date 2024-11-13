import Editor from "@monaco-editor/react";

type ReadonlyReactEditorProps = {
  content: string
}

// Not sure if this will work if i use a stream of yjs to build code history
const ReadonlyReactEditor: React.FC<ReadonlyReactEditorProps> = ( {content} ) => {
  console.log(content);
  return (
    <>
      <Editor 
        height="90vh" 
        defaultLanguage="javascript" 
        defaultValue={content} 
        options={
          {readOnly: true}
        }
      />;
    </>
  )
}

export default ReadonlyReactEditor; 