import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor'
import React, { useEffect } from 'react'

const ReadonlyEditor: React.FC = () => {
  useEffect(() => {
    const ydocument = new Y.Doc()
    const type = ydocument.getText('monaco')
    
    // Preload content, replace this with the actual content you want to display
    type.insert(0, "const example = 'Hello, Yjs with Monaco in read-only mode!';")

    const editor = monaco.editor.create(document.getElementById('monaco-editor') as HTMLElement, {
      value: type.toString(),
      // language: 'javascript',
      readOnly: true,
      theme: 'vs-light',
    })

    new MonacoBinding(type, editor.getModel() as monaco.editor.ITextModel, new Set([editor]), null)

    return () => editor.dispose()
  }, [])

  return (
    <div id="monaco-editor" className="h-full w-full" />
  )
}

export default ReadonlyEditor;
