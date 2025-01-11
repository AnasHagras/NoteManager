import { TreeNode } from "../models/tree";

const findNodeById = (tree: TreeNode[], id: string): TreeNode | null => {
  for (const node of tree) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const foundChild = findNodeById(node.children, id);
      if (foundChild) {
        return foundChild;
      }
    }
  }
  return null;
};

export { findNodeById };

export const getPathToNode = (tree: TreeNode[], id: string): TreeNode[] => {
  const findPath = (
    nodes: TreeNode[],
    targetId: string,
    path: TreeNode[]
  ): TreeNode[] | null => {
    for (const node of nodes) {
      const newPath = [...path, node];
      if (node.id === targetId) {
        return newPath;
      }
      if (node.children) {
        const childPath = findPath(node.children, targetId, newPath);
        if (childPath) {
          return childPath;
        }
      }
    }
    return null;
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
        return node;
      }
      if (node.id === id) {
        found = true;
      }
      if (node.children) {
        const nextNode = findNext(node.children);
        if (nextNode) {
          return nextNode;
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
        return prevNode;
      }
      prevNode = node;
      if (node.children) {
        const prev = findPrev(node.children, node);
        if (prev) {
          return prev;
        }
      }
    }
    return null;
  };
  return findPrev(tree);
};
