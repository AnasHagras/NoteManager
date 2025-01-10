import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TreeNode } from "../models/tree";

type TreeState = {
  tree: TreeNode[];
  addNode: (parentId: string | null, node: TreeNode) => void;
  removeNode: (id: string) => void;
  setTree: (newTree: TreeNode[]) => void;
};

const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    console.log(
      "Loaded tree from localStorage:",
      item ? JSON.parse(item)["tree"] : "Still No"
    );
    return item ? JSON.parse(item)["tree"] : { tree: [] };
  },
  setItem: (name: string, value: { state: TreeState }) => {
    const treeState = value.state;
    console.log("Saving tree to localStorage:", treeState);
    localStorage.setItem(name, JSON.stringify(treeState));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useTreeStore = create<TreeState>()(
  persist(
    (set) => ({
      tree: [],
      addNode: (parentId, node) =>
        set((state) => {
          console.log("Adding node:", node);
          const addChild = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((n) =>
              n.id === parentId
                ? {
                    ...n,
                    children: [...(n.children || []), node],
                  }
                : {
                    ...n,
                    children: addChild(n.children || []),
                  }
            );
          };

          const isFolder = node.type === "folder";
          const parentNode = parentId
            ? findNodeById(state.tree, parentId)
            : null;

          if (parentNode) {
            if (isFolder && parentNode.type === "note") {
              console.error("Folders cannot be added under notes.");
              return { tree: state.tree };
            }
            if (node.type === "note" && parentNode.type === "note") {
              console.error("Notes cannot be added under other notes.");
              return { tree: state.tree };
            }
          }

          const updatedTree = parentId
            ? { tree: addChild(state.tree) }
            : { tree: [...state.tree, node] };

          console.log("Updated tree:", updatedTree.tree);
          return updatedTree;
        }),
      removeNode: (id) =>
        set((state) => {
          const removeChild = (nodes: TreeNode[]): TreeNode[] =>
            nodes
              .filter((n) => n.id !== id)
              .map((n) => ({ ...n, children: removeChild(n.children || []) }));

          const updatedTree = { tree: removeChild(state.tree) };

          console.log("Updated tree after removal:", updatedTree.tree);
          return updatedTree;
        }),
      setTree: (newTree) => {
        set(() => {
          const updatedTree = { tree: newTree };
          console.log("Updated tree after setting:", updatedTree.tree);
          return updatedTree;
        });
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
