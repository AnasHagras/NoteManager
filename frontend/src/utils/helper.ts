import { TreeNode } from "../models/tree";

// Helper function to find a node by ID
const findNodeById = (tree: TreeNode[], id: string): TreeNode | null => {
  for (const node of tree) {
    if (node.id === id) {
      return node; // Found the node
    }
    if (node.children) {
      const foundChild = findNodeById(node.children, id); // Recursively search in children
      if (foundChild) {
        return foundChild; // Return if found in children
      }
    }
  }
  return null; // Node not found
};

export { findNodeById };

/**
 * Helper function to get the breadcrumb path to a node by ID.
 * @param tree - The tree structure to search in.
 * @param id - The ID of the target node.
 * @returns An array of nodes representing the path to the target node.
 */
export const getPathToNode = (tree: TreeNode[], id: string): TreeNode[] => {
  const findPath = (
    nodes: TreeNode[],
    targetId: string,
    path: TreeNode[]
  ): TreeNode[] | null => {
    for (const node of nodes) {
      const newPath = [...path, node]; // Add the current node to the path
      if (node.id === targetId) {
        return newPath; // Return the path if we found the node
      }
      if (node.children) {
        const childPath = findPath(node.children, targetId, newPath); // Search in children
        if (childPath) {
          return childPath; // Return if a path is found
        }
      }
    }
    return null; // Return null if no path is found
  };

  return findPath(tree, id, []) || [];
};

export const isCollapsedAll = (tree: TreeNode[]): boolean => {
  for (const node of tree) {
    if (!node.isCollapsed) {
      return false;
    }
    if (node.children) {
      if (!isCollapsedAll(node.children)) {
        return false;
      }
    }
  }
  return true;
};

export const findNextNode = (tree: TreeNode[], id: string): TreeNode | null => {
  let found = false;
  const findNext = (nodes: TreeNode[]): TreeNode | null => {
    for (const node of nodes) {
      if (found) {
        return node; // Return the next node once the current node is found
      }
      if (node.id === id) {
        found = true; // Mark the node as found
      }
      if (node.children) {
        const nextNode = findNext(node.children); // Recursively search in children
        if (nextNode) {
          return nextNode; // Return the found next node from children
        }
      }
    }
    return null;
  };
  return findNext(tree);
};

export const findPrevNode = (tree: TreeNode[], id: string): TreeNode | null => {
  let prevNode: TreeNode | null = null;
  const findPrev = (
    nodes: TreeNode[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parentNode: TreeNode | null = null
  ): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) {
        return prevNode; // Return the previous node when the target node is found
      }
      prevNode = node; // Track the last node as the previous node
      if (node.children) {
        const prev = findPrev(node.children, node); // Recurse into children and pass the current node as the parent
        if (prev) {
          return prev;
        }
      }
    }
    return null;
  };
  return findPrev(tree);
};
