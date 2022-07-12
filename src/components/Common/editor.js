import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import React from "react";
import { DefaultTemplate } from "../../components/Resumes/DefaultTemplate";

function Editor(props) {
  return (
    <div className="App">
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={
            (props.checked === "default" &&
              DefaultTemplate(props.defaultTemplate)) ||
            (props.selectedEmailTemp && props.selectedEmailTemp) ||
            ""
          }
          onChange={(event, editor) => {
            const data = editor.getData();
            props.setEmailContent(data);
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
