// Skeletons.tsx
import React from "react";
import { Skeleton } from "@mui/material";
import { SkeletonWrapper } from "./LeftPanelSkeleton.styles";

const LeftPanelSkeleton: React.FC = () => {
  return (
    <SkeletonWrapper>
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} sx={{ marginLeft: "50px" }} />
      <Skeleton variant="text" height={50} sx={{ marginLeft: "50px" }} />
      <Skeleton variant="text" height={50} sx={{ marginLeft: "50px" }} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} sx={{ marginLeft: "50px" }} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} sx={{ marginLeft: "50px" }} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
    </SkeletonWrapper>
  );
};

export default LeftPanelSkeleton;
