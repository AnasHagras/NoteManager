import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TreeNode } from "../models/tree";

type TreeState = {
  tree: TreeNode[];
  message: string | null;
  messageType: string | null;
  lastOpenedNoteId: string | null; // Added lastOpenedNoteId state
  clearMessages: () => void;
  addNode: (parentId: string | null, node: TreeNode) => void;
  removeNode: (id: string) => void;
  setTree: (newTree: TreeNode[]) => void;
  editNode: (id: string, newTitle?: string, newContent?: string) => void;
  setLastOpenedNote: (id: string | null) => void; // Method to update lastOpenedNoteId
};

const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : { tree: [], lastOpenedNoteId: null }; // Include lastOpenedNoteId
  },
  setItem: (name: string, value: { state: TreeState }) => {
    const { tree, lastOpenedNoteId } = value.state;
    localStorage.setItem(name, JSON.stringify({ tree, lastOpenedNoteId }));
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
      lastOpenedNoteId: null, // Initialize lastOpenedNoteId
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
        }));
      },
      clearMessages: () => {
        set(() => ({ message: null, messageType: null }));
      },
      editNode: (id: string, newTitle?: string, newContent?: string) =>
        set((state) => {
          const updateNode = (nodes: TreeNode[]): TreeNode[] =>
            nodes.map((node) =>
              node.id === id
                ? {
                    ...node,
                    title: newTitle ?? node.title,
                    content: newContent ?? node.content,
                  }
                : { ...node, children: updateNode(node.children || []) }
            );

          return {
            tree: updateNode(state.tree),
            message: "Node updated successfully!",
            messageType: "success",
          };
        }),
      setLastOpenedNote: (id: string | null) => {
        set(() => ({
          lastOpenedNoteId: id, // Update the last opened note
        }));
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
