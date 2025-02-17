import React, { useEffect, useState } from "react";
import { TreeNode } from "../../models/tree";
import { CircularProgress } from "@mui/material";
import { useTreeStore } from "../../store";
import { findNodeById } from "../../utils/TreeUtils";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import {
  EditorContainer,
  EditorBox,
  ButtonGroup,
  StyledTextField,
  Placeholder,
  LoadingContainer,
  EmptyMessageContainer,
  TitleTypography,
  SaveButton,
  CancelButton,
} from "./EditorView.styles";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../utils/toastHelper";

const EditorView: React.FC = () => {
  const { tree, lastOpenedEditId, editNode, lastOpenedNoteId } = useTreeStore(
    (state) => state
  );
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [node, setNode] = useState<TreeNode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(
    findNodeById(tree, lastOpenedNoteId || "")?.type === "note" &&
      node?.id !== findNodeById(tree, lastOpenedNoteId || "")?.id
      ? true
      : false
  );

  useEffect(() => {
    if (!lastOpenedEditId) {
      setNode(undefined);
      return;
    }
    const nodeHere = findNodeById(tree, lastOpenedNoteId || "");
    if (nodeHere?.type !== "note" && node) {
      return;
    }
    const newNode = findNodeById(tree, lastOpenedEditId || "");
    if (newNode?.id !== node?.id) {
      setLoading(true);
    }
    setTimeout(() => {
      const nodeHere = findNodeById(tree, lastOpenedEditId || "");
      if (nodeHere?.type !== "note") {
        return;
      }
      setEditTitle(nodeHere?.title || "");
      setEditContent(nodeHere?.content || "");
      setNode(nodeHere || undefined);
      setLoading(false);
    }, 500);
  }, [lastOpenedEditId, lastOpenedNoteId, node, node?.id, tree]);

  const handleSave = () => {
    if (node) {
      toast.info("Saving changes...", defaultToastOptions);
      editNode(node.id, {
        ...node,
        title: editTitle,
        content: editContent,
      })
        .then((response) => {
          if (response.success) {
            toast.success("Note updated successfully.", defaultToastOptions);
          } else {
            toast.error("Failed to update Note.", defaultToastOptions);
          }
        })
        .catch(() => {
          toast.error("Failed to update Note.", defaultToastOptions);
        });
    }
  };

  const onCancel = () => {
    setEditTitle(node?.title || "");
    setEditContent(node?.content || "");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <EditorContainer>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : node ? (
        <>
          {node.type === "note" ? (
            <>
              <BreadCrumb nodeId={node.id} />
              <EditorBox>
                <TitleTypography variant="h6">Edit Note</TitleTypography>
                <StyledTextField
                  label="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  fullWidth
                />
                <StyledTextField
                  label="Content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  multiline
                  fullWidth
                  rows={6}
                />
                <ButtonGroup>
                  <SaveButton variant="contained" onClick={handleSave}>
                    Save
                  </SaveButton>
                  <CancelButton variant="outlined" onClick={onCancel}>
                    Cancel
                  </CancelButton>
                </ButtonGroup>
              </EditorBox>
            </>
          ) : (
            <Placeholder>Select a note to start editing</Placeholder>
          )}
        </>
      ) : (
        <EmptyMessageContainer>
          <h3>Select A note to start editing</h3>
        </EmptyMessageContainer>
      )}
    </EditorContainer>
  );
};

export default EditorView;
