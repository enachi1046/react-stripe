import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';

export default class TextEditor extends Component{
render(){
    return(
        <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        />
    );
}
}