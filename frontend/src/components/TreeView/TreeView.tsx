import { useState, useEffect, useCallback } from "react";
import FolderNode from "../Node/FolderNode";
import NoteNode from "../Node/NoteNode";
import { TreeNode } from "../../models/tree";
import { useTreeStore } from "../../store";
import TreeViewHeader from "./TreeViewHeader";
import { toast } from "react-toastify";
import { findNodeById } from "../../utils/helper";
import { defaultToastOptions } from "../../utils/toastHelper";
import LeftPanelSkeleton from "../Skeletons/LeftPanelSkeleton";
import CAlertModal from "../Alert/Alert";

function TreeView() {
  const {
    tree,
    lastOpenedNoteId,
    setLastOpenedNote,
    removeNode,
    addNode,
    editNode,
    toggleCollapse,
    setTree,
    message,
    clearMessages,
    messageType,
    editingNodeId,
    setEditingNodeId,
    collapseAll,
    expandAll,
    setLastOpenedEditId,
    viewUp,
    viewDown,
  } = useTreeStore((state) => state);

  const [loading, setLoading] = useState<boolean>(true);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [nodeToRemove, setNodeToRemove] = useState<TreeNode | null>(null);

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
      removeNode(id);
    }
  };

  const confirmRemoveNode = () => {
    if (nodeToRemove) {
      removeNode(nodeToRemove.id);
    }
    setAlertOpen(false);
    setNodeToRemove(null);
  };

  const handleAddNewNode = (
    parentId: string | null,
    type: "folder" | "note"
  ) => {
    const newNode: TreeNode = {
      id: `${Date.now()}`,
      type,
      title: `${type === "folder" ? "New Folder" : "New Note"}`,
      content: type === "note" ? "This is a new note" : "",
      children: [],
    };
    addNode(parentId, newNode);
    setLastOpenedNote(newNode.id);
    setEditingNodeId(newNode.id);
    const parent_node = findNodeById(tree as TreeNode[], parentId as string);
    if (parent_node?.isCollapsed) {
      toggleCollapse(parentId as string);
    }
    if (newNode.type === "note") {
      setLastOpenedEditId(newNode.id);
    }
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
    setTimeout(() => {
      const storedTree = localStorage.getItem("tree-storage");

      if (storedTree) {
        const parsedTree = JSON.parse(storedTree).tree;
        setTree(parsedTree);
        setLastOpenedNote(JSON.parse(storedTree).lastOpenedNoteId);
        setLastOpenedEditId(JSON.parse(storedTree).lastOpenedEditId);
      } else {
        const defaultTree: TreeNode[] = [];
        setTree(defaultTree);
      }
      setLoading(false);
    }, 1000);
  }, [setLastOpenedEditId, setLastOpenedNote, setTree]);

  const handleViewUp = (id: string) => {
    viewUp(id);
  };

  const handleViewDown = (id: string) => {
    viewDown(id);
  };

  useEffect(() => {
    updateTree();
  }, [updateTree]);

  useEffect(() => {
    if (message) {
      if (messageType === "success") {
        toast.success(message, defaultToastOptions);
      } else if (messageType === "error") {
        toast.error(message, defaultToastOptions);
      }
      clearMessages();
    }
  }, [clearMessages, message, messageType]);

  const renderTree = (nodes: TreeNode[], level: number = 0) => {
    return (
      <ul>
        {nodes.map((node) => {
          const isSelected = lastOpenedNoteId === node.id;
          const isCollapsed = node.isCollapsed || false;
          const isEditing = editingNodeId === node.id;

          const commonProps = {
            level,
            key: node.id,
            node,
            isSelected,
            isCollapsed,
            onSelect: () => handleOnSelect(node.id),
            onRemove: () => handleRemoveNode(node.id),
            onToggleCollapse: () => toggleCollapse(node.id),
            viewUp: () => handleViewUp(node.id),
            viewDown: () => handleViewDown(node.id),
            onAddChild: (type: "folder" | "note") =>
              handleAddNewNode(node.id, type),
            onEdit: (id: string, newTitle: string) =>
              editNode(id, newTitle, node.content),
            isEditing,
            setEditingNodeId,
          };

          if (node.type === "folder") {
            return (
              <>
                <FolderNode {...commonProps} />
                {!isCollapsed && node.children && node.children.length > 0 && (
                  <>{renderTree(node.children, level + 1)}</>
                )}
              </>
            );
          }

          return (
            <>
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
            </>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <TreeViewHeader
        loading={loading}
        tree={tree}
        onCollapseAll={() => collapseAll()}
        onExpandAll={() => expandAll()}
        onAddFolder={() => handleAddNewNode(null, "folder")}
        onAddNote={() => handleAddNewNode(null, "note")}
      />
      {loading ? (
        <LeftPanelSkeleton></LeftPanelSkeleton>
      ) : (
        <div>{renderTree(tree)}</div>
      )}
      <CAlertModal
        open={alertOpen}
        setOpen={setAlertOpen}
        title={`Remove [${nodeToRemove?.title}]`}
        content="This folder contains sub folders or notes. Are you sure you want to remove it?"
        buttonText="Remove"
        onClick={confirmRemoveNode}
        handleClose={() => setAlertOpen(false)}
      />
    </div>
  );
}

export default TreeView;
