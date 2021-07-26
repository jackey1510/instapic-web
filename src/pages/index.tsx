import React from "react";
import { MainLayout } from "../components/MainLayout";

const Index = () => {
  //   const fileUploadHandler = async (event: any) => {
  //     console.log(event.target.files);
  //     // if (event) compressImage(event?.target?.files[0]);
  //   };
  return (
    <MainLayout variant="large">
      {/* <input type="file" onChange={fileUploadHandler}></input> */}
    </MainLayout>
  );
};

export default Index;
