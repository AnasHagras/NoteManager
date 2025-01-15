import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TreeNode } from "../models/tree";

import {
  addNode,
  deleteNode,
  updateNode,
} from "../services/supabase/treeServices";

import {
  convertSupabaseNodeToTreeNode,
  convertTreeNodeToNewSupabaseNode,
  convertTreeNodeToSupabaseNode,
  getAllNodeIds,
} from "../utils/TreeUtils";

import { ServiceResponse } from "../models/api";

type TreeState = {
  tree: TreeNode[];
  collapsedNodeIds: Set<string>;
  lastOpenedNoteId: string | null;
  editingNodeId: string | null;
  lastOpenedEditId: string | null;
  setLastOpenedEditId: (id: string | null) => void;
  setEditingNodeId: (id: string | null) => void;
  addNode: (parentId: string | null, node: TreeNode) => ServiceResponse;
  removeNode: (id: string) => ServiceResponse;
  setTree: (newTree: TreeNode[]) => void;
  editNode: (id: string, updatedNode: Partial<TreeNode>) => ServiceResponse;
  setLastOpenedNote: (id: string | null) => void;
  toggleCollapse: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  setCollapsedNode: (id: string, isCollapsed: boolean) => void;
  setCollapsedNodeIds: (ids: Set<string>) => void;
  clearData: () => void;
};

const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item
      ? JSON.parse(item)
      : {
          collapsedNodeIds: [],
          lastOpenedNoteId: null,
          lastOpenedEditId: null,
        };
  },
  setItem: (name: string, value: { state: TreeState }) => {
    const { collapsedNodeIds, lastOpenedNoteId, lastOpenedEditId } =
      value.state;
    localStorage.setItem(
      name,
      JSON.stringify({
        collapsedNodeIds: Array.from(collapsedNodeIds),
        lastOpenedNoteId,
        lastOpenedEditId,
      })
    );
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useTreeStore = create<TreeState>()(
  persist(
    (set, get) => ({
      tree: [],
      message: null,
      messageType: null,
      lastOpenedNoteId: null,
      lastOpenedEditId: null,
      editingNodeId: null,
      collapsedNodeIds: new Set<string>(),
      addNode: async (parentId, node) => {
        const state = get();
        const supabaseNode = convertTreeNodeToNewSupabaseNode(parentId, node);

        const result = await addNode(supabaseNode);
        let retrieved_node: TreeNode;
        if (result.success) {
          retrieved_node = convertSupabaseNodeToTreeNode(result.data || {});
        } else {
          // console.error("Error adding new node:", result.error);
          return result;
        }

        const addChild = (nodes: TreeNode[]): TreeNode[] => {
          return nodes.map((n) =>
            n.id === parentId
              ? { ...n, children: [...(n.children || []), retrieved_node] }
              : { ...n, children: addChild(n.children || []) }
          );
        };

        const updatedTree = parentId
          ? {
              tree: addChild(state.tree),
            }
          : {
              tree: [...state.tree, retrieved_node],
            };

        set(updatedTree);
        return result;
      },

      removeNode: async (id) => {
        const state = get();

        const result = await deleteNode(id);
        if (result.success) {
          // console.log("Node removed:", result.data);
        } else {
          // console.error("Error removing node:", result.error);
          return result;
        }

        const removeChild = (nodes: TreeNode[]): TreeNode[] =>
          nodes
            .filter((n) => n.id !== id)
            .map((n) => ({
              ...n,
              children: removeChild(n.children || []),
            }));

        const updatedTree = {
          tree: removeChild(state.tree),
          lastOpenedNoteId:
            state.lastOpenedNoteId === id ? null : state.lastOpenedNoteId,
          lastOpenedEditId:
            state.lastOpenedEditId === id ? null : state.lastOpenedEditId,
        } as TreeState;

        set(updatedTree);
        return result;
      },
      editNode: async (id, updatedNode) => {
        const state = get();

        const supabaseNode = convertTreeNodeToSupabaseNode(updatedNode);
        const result = await updateNode(supabaseNode);

        if (result.success) {
          // console.log("Node updated:", result.data);
        } else {
          // console.error("Error updating node:", result.error);
          return result;
        }

        const updateChild = (nodes: TreeNode[]): TreeNode[] =>
          nodes.map((n) =>
            n.id === id
              ? { ...n, ...updatedNode }
              : { ...n, children: updateChild(n.children || []) }
          );

        const updatedTree = {
          tree: updateChild(state.tree),
        } as TreeState;

        set(updatedTree);
        return result;
      },
      setTree: (newTree) => {
        set(() => ({
          tree: newTree,
        }));
      },

      setLastOpenedNote: (id: string | null) => {
        set(() => ({
          lastOpenedNoteId: id,
        }));
      },
      toggleCollapse: (id: string) =>
        set((state) => {
          const isCollapsed = state.collapsedNodeIds.has(id);
          const updatedCollapsedNodeIds = new Set(state.collapsedNodeIds);
          if (isCollapsed) {
            updatedCollapsedNodeIds.delete(id);
          } else {
            updatedCollapsedNodeIds.add(id);
          }

          return {
            collapsedNodeIds: updatedCollapsedNodeIds,
          };
        }),
      setEditingNodeId: (id) => {
        set(() => ({
          editingNodeId: id,
        }));
      },
      expandAll: () =>
        set(() => {
          return {
            collapsedNodeIds: new Set(), // Clear all collapsed nodes
          };
        }),

      collapseAll: () =>
        set((state) => {
          const allNodeIds = new Set(
            state.tree.flatMap((node) => getAllNodeIds(node)) // Helper function to get all node IDs
          );
          console.log("object", allNodeIds);
          return {
            collapsedNodeIds: allNodeIds,
          };
        }),
      setLastOpenedEditId: (id) => {
        set(() => ({
          lastOpenedEditId: id,
        }));
      },
      setCollapsedNode: (id, isCollapsed) => {
        set((state) => {
          const updatedSet = new Set(state.collapsedNodeIds);
          if (isCollapsed) {
            updatedSet.add(id);
          } else {
            updatedSet.delete(id);
          }
          return { collapsedNodeIds: updatedSet };
        });
      },
      setCollapsedNodeIds: (ids) => {
        set(() => ({
          collapsedNodeIds: ids,
        }));
      },
      clearData: () => {
        set(() => ({
          tree: [],
          collapsedNodeIds: new Set<string>(),
          lastOpenedNoteId: null,
          lastOpenedEditId: null,
        }));
      },
    }),

    {
      name: "tree-storage",
      storage: localStorageAdapter,
    }
  )
);
