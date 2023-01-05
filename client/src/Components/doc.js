import "./styles.css";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import React from "react";


export default function docu() {
  const docs = [
    { uri: require("./public/Capture.PNG") }
    
  ];
 
  return (
    <>
      <DocViewer className="container"
        pluginRenderers={DocViewerRenderers}
        documents={docs}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false
          }
        }}
        style={{ height: 500 }}
      />  
   </>
  );
}

