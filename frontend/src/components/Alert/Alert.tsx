/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  AlertModalContainer,
  AlertModalTitle,
  AlertModalContent,
  AlertModalButton,
  CDialog,
} from "./Alert.styles";

interface CAlertModalProps {
  title: string;
  content: string;
  buttonText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setSelectedUser?: (user: null) => void;
  onClick?: () => void;
  handleClose?: () => void;
  closeOnEscape?: boolean;
  shouldRefresh?: boolean;
}

const CAlertModal: React.FC<CAlertModalProps> = ({
  title,
  content,
  buttonText,
  open,
  setOpen,
  onClick,
  handleClose,
  closeOnEscape = false,
}) => {
  const handleButtonClick = (reason?: string) => {
    if (onClick) {
      onClick();
    }

    if (
      (reason === "backdropClick" && closeOnEscape) ||
      reason !== "backdropClick"
    ) {
      setOpen(false);
    }

    if (handleClose) {
      // console.log("handleClose");
      handleClose();
    }
  };

  const handleDialogClose = (_event: unknown, _reason?: string) => {
    setOpen(false);
  };

  return (
    <CDialog open={open} onClose={handleDialogClose}>
      <AlertModalContainer>
        <AlertModalTitle>{title}</AlertModalTitle>
        <AlertModalContent>{content}</AlertModalContent>
        <AlertModalButton onClick={(e) => handleButtonClick()}>
          {buttonText}
        </AlertModalButton>
      </AlertModalContainer>
    </CDialog>
  );
};

export default CAlertModal;
