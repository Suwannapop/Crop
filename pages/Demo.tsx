import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "./Modal";
import useModal from "./useModal";
//import "./Demo.css";

// this line for the default image
// cropData is the image after crop
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo: React.FC = () => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const { ref, onOpen, onClose } = useModal();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
    onOpen();
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
    onClose();
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        {/* <button>Use default img</button> */}
        <br />
        <br />
        <Modal title={"Photo"} ref={ref} onClose={onClose}>
          <div>
            <Cropper
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
          </div>
          <div style={{ float: "right" }}>
            <button  onClick={getCropData}>
              Crop Image
            </button>
            <button  onClick={onClose}>Cancel</button>
          </div>


        </Modal>
      </div>
      <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            {/* <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button> */}
          </h1>
          {cropData == "#" ? null : (
            <img style={{ width: "100%" }} src={cropData} alt="cropped" />
          )}
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </>
  );
};

export default Demo;
