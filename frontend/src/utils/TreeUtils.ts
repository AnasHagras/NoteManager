import { TreeNode, NewSupabaseNode, SupabaseNode } from "../models/tree";

// Convert TreeNode to SupabaseNode For Creating a New Node
export const convertTreeNodeToNewSupabaseNode = (
  parentId: string | null,
  treeNode: TreeNode
): NewSupabaseNode => {
  return {
    parent_id: parentId,
    type: treeNode.type,
    title: treeNode.title,
    content: treeNode.content,
  };
};

export const convertSupabaseNodeToTreeNode = (
  supabaseNode: Partial<SupabaseNode>
): TreeNode => {
  // console.log("supabaseNode", supabaseNode);
  return {
    id: supabaseNode.id!,
    type: supabaseNode.type!,
    title: supabaseNode.title,
    content: supabaseNode.content,
    children: [],
  };
};

export const convertTreeNodeToSupabaseNode = (
  treeNode: Partial<TreeNode>
): SupabaseNode => {
  return {
    id: treeNode.id!,
    type: treeNode.type!,
    title: treeNode.title,
    content: treeNode.content,
  };
};

// get the parentId of a node from the tree
export const getParentId = (
  tree: TreeNode[],
  nodeId: string
): string | null => {
  let parentId: string | null = null;

  const findParent = (nodes: TreeNode[]): void => {
    nodes.forEach((node) => {
      if (node.children) {
        if (node.children.some((child) => child.id === nodeId)) {
          parentId = node.id || null;
        } else {
          findParent(node.children);
        }
      }
    });
  };

  findParent(tree);

  return parentId;
};

export const findNodeById = (tree: TreeNode[], id: string): TreeNode | null => {
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

export const isCollapsedAll = (
  tree: TreeNode[],
  collapsedNodeIds: Set<string>
): boolean => {
  for (const node of tree) {
    if (!collapsedNodeIds.has(node.id)) {
      return false;
    }
    if (node.children) {
      return isCollapsedAll(node.children, collapsedNodeIds);
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

export const getAllNodeIds = (node: TreeNode): string[] => {
  const ids = [node.id];
  if (node.children) {
    node.children.forEach((child) => {
      ids.push(...getAllNodeIds(child));
    });
  }
  return ids;
};

export const isNodeCollapsed = (collapsedNodeIds: Set<string>, id: string) =>
  collapsedNodeIds.has(id) || false;
