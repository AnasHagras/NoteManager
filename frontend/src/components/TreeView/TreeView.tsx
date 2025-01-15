import { useState, useEffect, useCallback, Fragment } from "react";
import FolderNode from "../Node/FolderNode";
import NoteNode from "../Node/NoteNode";
import { TreeNode } from "../../models/tree";
import { useTreeStore } from "../../store";
import TreeViewHeader from "./TreeViewHeader";
import { toast } from "react-toastify";
import { findNodeById, isNodeCollapsed } from "../../utils/TreeUtils";
import { defaultToastOptions } from "../../utils/toastHelper";
import LeftPanelSkeleton from "../Skeletons/LeftPanelSkeleton";
import CAlertModal from "../Alert/Alert";
import { Box } from "@mui/material";
import { buildTree } from "../../services/supabase/treeServices";
import { capitalize } from "../../utils/helper";
import TreeViewFooter from "./TreeViewFooter";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
function TreeView() {
  const {
    tree,
    lastOpenedNoteId,
    collapsedNodeIds,
    setLastOpenedNote,
    removeNode,
    addNode,
    editNode,
    toggleCollapse,
    setTree,
    editingNodeId,
    setEditingNodeId,
    collapseAll,
    expandAll,
    setLastOpenedEditId,
    setCollapsedNodeIds,
  } = useTreeStore((state) => state);

  const { logout } = useAuthStore((state) => state);

  const [loading, setLoading] = useState<boolean>(true);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [nodeToRemove, setNodeToRemove] = useState<TreeNode | null>(null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  const handleModalClose = () => {
    setAlertOpen(false);
  };

  const handleEditNote = (id: string, updatedNode: Partial<TreeNode>) => {
    const node_type = updatedNode.type === "folder" ? "Folder" : "Note";
    editNode(id, updatedNode)
      .then((response) => {
        if (response.success) {
          toast.success(
            `${node_type} updated successfully.`,
            defaultToastOptions
          );
        } else {
          toast.error(`Failed to update ${node_type}.`, defaultToastOptions);
        }
      })
      .catch(() => {
        toast.error(`Failed to update ${node_type}.`, defaultToastOptions);
      });
  };

  const doRemove = (id: string) => {
    const node = findNodeById(tree, id);
    const node_type = capitalize(node?.type || "");
    toast.info(
      `Removing ${node_type} : ${node?.title}...`,
      defaultToastOptions
    );
    removeNode(id).then((response) => {
      if (response.success) {
        toast.success(`${node_type} removed successfully`, defaultToastOptions);
      } else {
        toast.error(`Failed to remove ${node_type}`, defaultToastOptions);
      }
    });
  };

  const handleRemoveNode = (id: string) => {
    const node = findNodeById(tree, id);
    if (
      node?.type === "folder" &&
      node.children &&
      node?.children?.length > 0
    ) {
      setNodeToRemove(node);
      setAlertOpen(true);
    } else {
      doRemove(id);
    }
  };

  const confirmRemoveNode = () => {
    if (nodeToRemove) {
      if (nodeToRemove.id != null) {
        doRemove(nodeToRemove.id);
      }
    }
  };

  const handleAddNewNode = (
    parentId: string | null,
    type: "folder" | "note"
  ) => {
    const newNode: TreeNode = {
      type,
      title: `${type === "folder" ? "New Folder" : "New Note"}`,
      content: type === "note" ? "This is a new note" : "",
      id: "",
    };

    toast.info(`Adding ${type === "folder" ? "Folder" : "Note"}...`, {
      ...defaultToastOptions,
    });

    addNode(parentId, newNode).then((response) => {
      if (response.success) {
        toast.success(
          `${type === "folder" ? "Folder" : "Note"} added successfully`,
          defaultToastOptions
        );
        let newNodeId = null;
        newNodeId = response?.data?.id || null;
        setLastOpenedNote(newNodeId);
        setEditingNodeId(newNodeId);
        if (isNodeCollapsed(collapsedNodeIds, parentId || "")) {
          toggleCollapse(parentId || "");
        }
        if (newNode.type === "note") {
          setLastOpenedEditId(newNodeId);
        }
      } else {
        toast.error(
          `Failed to add ${type === "folder" ? "Folder" : "Note"}`,
          defaultToastOptions
        );
      }
    });
  };

  const handleOnSelect = (id: string) => {
    const node = findNodeById(tree, id) as TreeNode;
    if (node.type === "note") {
      setLastOpenedEditId(id);
    }
    setLastOpenedNote(id);
    toggleCollapse(id);
  };

  const updateTree = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const localStorageTree = localStorage.getItem("tree-storage");

      if (localStorageTree) {
        setLastOpenedNote(JSON.parse(localStorageTree).lastOpenedNoteId);
        setLastOpenedEditId(JSON.parse(localStorageTree).lastOpenedEditId);
        setCollapsedNodeIds(
          new Set(JSON.parse(localStorageTree).collapsedNodeIds)
        );
      }

      buildTree()
        .then((newTree) => {
          setTree(newTree);
        })
        .catch(() => {
          toast.error("Failed to get Notes.", defaultToastOptions);
          setTree([]);
        });

      setLoading(false);
    }, 1000);
  }, [setCollapsedNodeIds, setLastOpenedEditId, setLastOpenedNote, setTree]);

  // const handleViewUp = (id: string) => {
  //   viewUp(id);
  // };

  // const handleViewDown = (id: string) => {
  //   viewDown(id);
  // };

  useEffect(() => {
    updateTree();
  }, [updateTree]);

  const renderTree = (nodes: TreeNode[], level: number = 0) => {
    return (
      <ul>
        {nodes.map((node) => {
          const isSelected = lastOpenedNoteId === node.id;
          const isCollapsed = isNodeCollapsed(collapsedNodeIds, node.id);
          const isEditing = editingNodeId === node.id;

          const commonProps = {
            level,
            node,
            isSelected,
            isCollapsed,
            onSelect: () => handleOnSelect(node.id),
            onRemove: () => handleRemoveNode(node.id),
            onToggleCollapse: () => toggleCollapse(node.id),
            // NOTE: viewUp and viewDown are not implemented yet
            viewUp: () => {},
            viewDown: () => {},
            onAddChild: (type: "folder" | "note") =>
              handleAddNewNode(node.id, type),
            onEdit: (id: string, updatedNode: Partial<TreeNode>) =>
              handleEditNote(id, updatedNode),
            isEditing,
            setEditingNodeId,
          };

          if (node.type === "folder") {
            return (
              <Fragment key={node.id}>
                <FolderNode {...commonProps} />
                {!isCollapsed && node.children && node.children.length > 0 && (
                  <>{renderTree(node.children, level + 1)}</>
                )}
              </Fragment>
            );
          }

          return (
            <Fragment key={node.id}>
              <NoteNode
                {...commonProps}
                isEditing={isEditing}
                setEditingNodeId={setEditingNodeId}
                editTitle={editTitle}
                editContent={editContent}
                onTitleChange={(e) => setEditTitle(e.target.value)}
                onContentChange={(e) => setEditContent(e.target.value)}
                onCancel={() => setEditingNodeId(null)}
              />
              {!isCollapsed && node.children && node.children.length > 0 && (
                <>{renderTree(node.children, level + 1)}</>
              )}
            </Fragment>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TreeViewHeader
        collapsedNodeIds={collapsedNodeIds}
        loading={loading}
        tree={tree}
        onCollapseAll={() => collapseAll()}
        onExpandAll={() => expandAll()}
        onAddFolder={() => handleAddNewNode(null, "folder")}
        onAddNote={() => handleAddNewNode(null, "note")}
      />
      {loading ? (
        <LeftPanelSkeleton></LeftPanelSkeleton>
      ) : tree.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <div>{renderTree(tree)}</div>
          <TreeViewFooter onClick={handleLogOut}></TreeViewFooter>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "80%",
            margin: "auto",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <h4>
            No Items here, click icons above to start adding folders or notes
          </h4>
        </Box>
      )}
      <CAlertModal
        open={alertOpen && nodeToRemove !== null}
        setOpen={setAlertOpen}
        title={`Remove [${nodeToRemove?.title}]`}
        content="This folder contains sub folders or notes. Are you sure you want to remove it?"
        buttonText="Remove"
        onClick={confirmRemoveNode}
        handleClose={() => handleModalClose()}
      />
    </div>
  );
}

export default TreeView;
