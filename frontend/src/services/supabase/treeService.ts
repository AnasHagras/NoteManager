import {
  fetchNodes,
  addNode as addNodeAPI,
  updateNode as updateNodeAPI,
  deleteNode as deleteNodeAPI,
  getParentId as getParentIdAPI,
} from "../../api/supabase/treeAPI";
import { ServiceResponse } from "../../models/api";
import { TreeNode, SupabaseNode, NewSupabaseNode } from "../../models/tree";

// Builds the tree from the flat list of nodes returned by fetchNodes
const buildTree = async (): Promise<TreeNode[]> => {
  const { success, data, error } = await fetchNodes();

  let flatList: SupabaseNode[] = [];

  if (success && data) {
    flatList = data;
  } else if (error) {
    return [];
  }
  const nodeMap: Record<string, TreeNode> = {};
  const tree: TreeNode[] = [];

  flatList.forEach((node) => {
    nodeMap[node.id] = { ...node, children: [] };
  });

  flatList.forEach((node) => {
    if (node.parent_id) {
      const parent = nodeMap[node.parent_id];
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(nodeMap[node.id]);
      }
    } else {
      tree.push(nodeMap[node.id]);
    }
  });

  return tree;
};

// Adds a new node to the database
const addNode = async (newNode: NewSupabaseNode): ServiceResponse => {
  return addNodeAPI(newNode);
  //   return result;
};

// Updates an existing node in the database
const updateNode = async (updatedNode: SupabaseNode): ServiceResponse => {
  return updateNodeAPI(updatedNode);
  //   return result;
};

// Deletes a node by its ID from the database
const deleteNode = async (nodeId: string): ServiceResponse => {
  return deleteNodeAPI(nodeId);
};

// get the parentId of a node
const getParentId = async (nodeId: string): ServiceResponse => {
  return getParentIdAPI(nodeId);
};

export { buildTree, addNode, updateNode, deleteNode, getParentId };
