import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "./Modal";
import useModal from "./useModal";
//
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [cropData, setCropData] = useState<string | null>(null);
  const [cropper, setCropper] = useState<any>(null);
  const { ref, onOpen, onClose } = useModal();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        onOpen();
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (cropper) {
      try {
        const canvas = cropper.getCroppedCanvas();
        if (canvas) {
          setCropData(canvas.toDataURL());
        }
      } catch (error) {
        console.error("Error getting cropped data:", error);
      }
    } else {
      console.error("Cropper instance is not initialized.");
    }
    onClose();
  };

  const handleCropMove = () => {
    if (cropper) {
      try {
        const canvas = cropper.getCroppedCanvas();
        if (canvas) {
          setCropData(canvas.toDataURL());
        }
      } catch (error) {
        console.error("Error updating cropped data:", error);
      }
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
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
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              cropmove={handleCropMove}
              guides={true}
            />
          </div>
          <div style={{ float: "right" }}>
            <button onClick={getCropData}>Crop Image</button>
            <button onClick={onClose}>Cancel</button>
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
          </h1>
          {cropData && <img style={{ width: "100%" }} src={cropData} alt="cropped" />}
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </>
  );
};

export default Demo;
