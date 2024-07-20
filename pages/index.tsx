"use client";
import React, { useState } from "react";
import Demo from "./Demo";
import useModal from "./useModal";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const Home = () => <Demo />;

export default function FirstPost() {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState<any>();
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

  const { ref, onOpen, onClose } = useModal();
  return (
    <>
      <Home />
    </>

    // <>
    //   <h1>Uplodae Photo</h1>
    //   <input type="file" onChange={onChange} />
    //   {image && (
    //     <Cropper
    //       style={{ height: 400, width: "100%" }}
    //       zoomTo={0.5}
    //       initialAspectRatio={1}
    //       preview=".img-preview"
    //       src={image}
    //       viewMode={1}
    //       minCropBoxHeight={10}
    //       minCropBoxWidth={10}
    //       background={false}
    //       responsive={true}
    //       autoCropArea={1}
    //       checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
    //       onInitialized={(instance) => {
    //         setCropper(instance);
    //       }}
    //       guides={true}
    //     />
    //   )}

    //   <div>
    //     <Modal ref={ref} onClose={onClose}>
    //       <Cropper
    //         style={{ height: 400, width: "100%" }}
    //         zoomTo={0.5}
    //         initialAspectRatio={1}
    //         preview=".img-preview"
    //         src={image}
    //         viewMode={1}
    //         minCropBoxHeight={10}
    //         minCropBoxWidth={10}
    //         background={false}
    //         responsive={true}
    //         autoCropArea={1}
    //         checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
    //         onInitialized={(instance) => {
    //           setCropper(instance);
    //         }}
    //         guides={true}
    //       />
    //     </Modal>
    //   </div>
    // </>
  );
}
