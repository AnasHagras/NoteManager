import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TreeNode } from "../models/tree";

type TreeState = {
  tree: TreeNode[];
  message: string | null;
  messageType: string | null;
  clearMessages: () => void;
  addNode: (parentId: string | null, node: TreeNode) => void;
  removeNode: (id: string) => void;
  setTree: (newTree: TreeNode[]) => void;
};

const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item)["tree"] : { tree: [] };
  },
  setItem: (name: string, value: { state: TreeState }) => {
    const { tree } = value.state;
    localStorage.setItem(name, JSON.stringify({ tree }));
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
      addNode: (parentId, node) =>
        set((state) => {
          const addChild = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((n) =>
              n.id === parentId
                ? { ...n, children: [...(n.children || []), node] }
                : { ...n, children: addChild(n.children || []) }
            );
          };

          const parentNode = parentId
            ? findNodeById(state.tree, parentId)
            : null;

          if (parentNode) {
            const isFolder = node.type === "folder";
            if (isFolder && parentNode.type === "note") {
              return {
                tree: state.tree,
                message: "Folders cannot be added under notes.",
                messageType: "error",
              };
            }
            if (node.type === "note" && parentNode.type === "note") {
              return {
                tree: state.tree,
                message: "Notes cannot be added under other notes.",
                messageType: "error",
              };
            }
          }

          const updatedTree = parentId
            ? {
                tree: addChild(state.tree),
                message: "Node added successfully!",
                messageType: "success",
              }
            : {
                tree: [...state.tree, node],
                message: "Node added successfully!",
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

          const updatedTree = {
            tree: removeChild(state.tree),
            message: "Node removed successfully!",
            messageType: "success",
          } as TreeState;

          return updatedTree;
        }),
      setTree: (newTree) => {
        set(() => ({
          tree: newTree,
          message: "Tree updated successfully!",
          messageType: "success",
        }));
      },
      clearMessages: () => {
        set(() => ({ message: null, messageType: null }));
      },
    }),
    {
      name: "tree-storage",
      storage: localStorageAdapter,
    }
  )
);

const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};
