import React from "react";
import { MainLayout } from "../components/MainLayout";
import PostLayout from "../components/PostLayout";
const Index = () => {
  return (
    <MainLayout variant="large">
      <PostLayout />
    </MainLayout>
  );
};

export default Index;
