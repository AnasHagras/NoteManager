import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TreeNode } from "../models/tree";
import { findNextNode, findNodeById, findPrevNode } from "../utils/helper";

type TreeState = {
  tree: TreeNode[];
  message: string | null;
  messageType: string | null;
  lastOpenedNoteId: string | null;
  editingNodeId: string | null;
  lastOpenedEditId: string | null;
  setLastOpenedEditId: (id: string | null) => void;
  setEditingNodeId: (id: string | null) => void;
  clearMessages: () => void;
  addNode: (parentId: string | null, node: TreeNode) => void;
  removeNode: (id: string) => void;
  setTree: (newTree: TreeNode[]) => void;
  editNode: (
    id: string,
    newTitle?: string,
    newContent?: string,
    isCollapsed?: boolean
  ) => void;
  setLastOpenedNote: (id: string | null) => void;
  toggleCollapse: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  viewUp: (id: string) => void;
  viewDown: (id: string) => void;
};

const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item
      ? JSON.parse(item)
      : { tree: [], lastOpenedNoteId: null, lastOpenedEditId: null };
  },
  setItem: (name: string, value: { state: TreeState }) => {
    const { tree, lastOpenedNoteId, lastOpenedEditId } = value.state;
    localStorage.setItem(
      name,
      JSON.stringify({ tree, lastOpenedNoteId, lastOpenedEditId })
    );
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useTreeStore = create<TreeState>()(
  persist(
    (set) => ({
      tree: [],
      message: null,
      messageType: null,
      lastOpenedNoteId: null,
      lastOpenedEditId: null,
      editingNodeId: null,
      addNode: (parentId, node) =>
        set((state) => {
          const addChild = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((n) =>
              n.id === parentId
                ? { ...n, children: [...(n.children || []), node] }
                : { ...n, children: addChild(n.children || []) }
            );
          };
          const nodeTypeMessage =
            node.type === "folder"
              ? "Folder added successfully!"
              : "Note added successfully!";
          const updatedTree = parentId
            ? {
                tree: addChild(state.tree),
                message: nodeTypeMessage,
                messageType: "success",
              }
            : {
                tree: [...state.tree, node],
                message: nodeTypeMessage,
                messageType: "success",
              };

          return updatedTree;
        }),
      removeNode: (id) =>
        set((state) => {
          const removeChild = (nodes: TreeNode[]): TreeNode[] =>
            nodes
              .filter((n) => n.id !== id)
              .map((n) => ({ ...n, children: removeChild(n.children || []) }));
          const nodeMessage =
            findNodeById(state.tree, id)?.type === "folder" ? "Folder" : "Note";
          const updatedTree = {
            tree: removeChild(state.tree),
            message: nodeMessage + " removed successfully!",
            messageType: "success",
          } as TreeState;

          return updatedTree;
        }),
      setTree: (newTree) => {
        set(() => ({
          tree: newTree,
        }));
      },
      clearMessages: () => {
        set(() => ({ message: null, messageType: null }));
      },
      editNode: (
        id: string,
        newTitle?: string,
        newContent?: string,
        isCollapsed?: boolean
      ) =>
        set((state) => {
          const updateNode = (nodes: TreeNode[]): TreeNode[] =>
            nodes.map((node) =>
              node.id === id
                ? {
                    ...node,
                    title: newTitle ?? node.title,
                    content: newContent ?? node.content,
                    isCollapsed: isCollapsed ?? node.isCollapsed,
                  }
                : { ...node, children: updateNode(node.children || []) }
            );
          const node = findNodeById(state.tree, id);
          const nodeType = node?.type;
          if (newTitle?.trim() === "") {
            return {
              message: "title cannot be empty!",
              messageType: "error",
            };
          }
          if (
            newTitle === node?.title &&
            newContent === node?.content &&
            isCollapsed === node?.isCollapsed
          ) {
            return {
              message: "no changes made!",
              messageType: "error",
            };
          }
          const nodeMessage = nodeType === "folder" ? "Folder" : "Note";
          return {
            tree: updateNode(state.tree),
            message: nodeMessage + " updated successfully!",
            messageType: "success",
          };
        }),
      setLastOpenedNote: (id: string | null) => {
        set(() => ({
          lastOpenedNoteId: id,
        }));
      },
      toggleCollapse: (id: string) =>
        set((state) => {
          const toggleCollapseForNode = (nodes: TreeNode[]): TreeNode[] =>
            nodes.map((node) =>
              node.id === id
                ? {
                    ...node,
                    isCollapsed:
                      node.isCollapsed === undefined ? true : !node.isCollapsed, // Toggle collapse state
                  }
                : {
                    ...node,
                    children: toggleCollapseForNode(node.children || []),
                  }
            );

          return {
            tree: toggleCollapseForNode(state.tree),
          };
        }),
      setEditingNodeId: (id) => {
        set(() => ({
          editingNodeId: id,
        }));
      },
      expandAll: () =>
        set((state) => {
          const expandAllNodes = (nodes: TreeNode[]): TreeNode[] =>
            nodes.map((node) => ({
              ...node,
              isCollapsed: false,
              children: node.children ? expandAllNodes(node.children) : [],
            }));

          return {
            tree: expandAllNodes(state.tree),
          };
        }),
      collapseAll: () =>
        set((state) => {
          const collapseAllNodes = (nodes: TreeNode[]): TreeNode[] =>
            nodes.map((node) => ({
              ...node,
              isCollapsed: true,
              children: node.children ? collapseAllNodes(node.children) : [],
            }));

          return {
            tree: collapseAllNodes(state.tree),
          };
        }),
      setLastOpenedEditId: (id) => {
        set(() => ({
          lastOpenedEditId: id,
        }));
      },
      viewUp: (id: string) =>
        set((state) => {
          const prevNode = findPrevNode(state.tree, id);
          console.log("prev", prevNode);
          return {
            lastOpenedEditId: prevNode?.id,
            lastOpenedNoteId: prevNode?.id,
          };
        }),
      viewDown: (id: string) =>
        set((state) => {
          const nextNode = findNextNode(state.tree, id);
          console.log("nextNode", nextNode);
          state.editNode(
            nextNode?.id || " ",
            nextNode?.title,
            nextNode?.content,
            false
          );
          return {
            lastOpenedEditId: nextNode?.id,
            lastOpenedNoteId: nextNode?.id,
          };
        }),
    }),

    {
      name: "tree-storage",
      storage: localStorageAdapter,
    }
  )
);
