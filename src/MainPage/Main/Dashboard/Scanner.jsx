import React from "react";
import DWT from "../../../DynamsoftSDK";

function Scanner() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <DWT
            features={[
              "scan",
              "camera",
              "load",
              "save",
              "upload",
              "barcode",
              "uploader",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Scanner;
