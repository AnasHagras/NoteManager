import { supabase } from "./supabase";
import { NewSupabaseNode, SupabaseNode } from "../../models/tree";
import { ServiceResponse } from "../../models/api";

/**
 * Fetches all tree nodes from the database.
 * @returns {Promise<SupabaseNode[]>} List of tree nodes or an empty array if there's an error.
 */
const fetchNodes = async (): Promise<{
  success: boolean;
  data?: SupabaseNode[];
  error?: string;
}> => {
  const { data, error } = await supabase
    .from("nodes")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching tree:", error);
    return { success: false, error: error.message }; // Return the error if failure
  }

  return { success: true, data }; // Return the data if success
};

const getNode = async (nodeId: string): Promise<ServiceResponse> => {
  const { data, error } = await supabase
    .from("nodes")
    .select("*")
    .eq("id", nodeId)
    .single();

  if (error) {
    console.error("Error fetching node:", error);
    return { success: false, error: error.message }; // Return the error if failure
  }

  return { success: true, data }; // Return the data if success
};

/**
 * Adds a new tree node to the database.
 * @param {SupabaseNode} newNode - The node data to be added.
 * @returns {ServiceResponse}
 * An object indicating the success status, and either the added node data or an error message.
 */
const addNode = async (newNode: NewSupabaseNode): ServiceResponse => {
  const { data, error } = await supabase
    .from("nodes")
    .insert([newNode])
    .select()
    .single();

  if (error) {
    console.error("Error adding new node:", error);
    return { success: false, error: error.message }; // Return the error if failure
  } else {
    // console.log("New node added:", data);
    return { success: true, data };
  }
};

/**
 * Updates an existing tree node in the database.
 * @param {SupabaseNode} updatedNode - The node data to be updated.
 * @returns {ServiceResponse}
 * An object indicating the success status, and either the updated node data or an error message.
 */
const updateNode = async (updatedNode: SupabaseNode): ServiceResponse => {
  const { data, error } = await supabase
    .from("nodes")
    .update(updatedNode)
    .match({ id: updatedNode.id })
    .select()
    .single();

  if (error) {
    console.error("Error updating node:", error);
    return { success: false, error: error.message }; // Return the error if failure
  } else {
    // console.log("Node updated:", data);
    return { success: true, data }; // Return the data if success
  }
};

/**
 * Deletes a tree node from the database by its ID.
 * @param {string} nodeId - The ID of the node to be deleted.
 * @returns {Promise<{ success: boolean; data?: { id: string }; error?: string }>}
 * An object indicating the success status, and either the deleted node ID or an error message.
 */
const deleteNode = async (nodeId: string): ServiceResponse => {
  const { data, error } = await supabase
    .from("nodes")
    .delete()
    .match({ id: nodeId })
    .select()
    .single();

  if (error) {
    console.error("Error deleting node:", error);
    return { success: false, error: error.message }; // Return the error if failure
  } else {
    // console.log("Node deleted:", data);
    return { success: true, data }; // Return the data (deleted ID) if success
  }
};

// get the parentId of a node from database
const getParentId = async (nodeId: string): ServiceResponse => {
  const { data, error } = await supabase
    .from("nodes")
    .select("parent_id")
    .eq("id", nodeId)
    .single();

  if (error) {
    console.error("Error fetching parent ID:", error);
    return { success: false, error: error.message }; // Return the error if failure
  }

  return { success: true, data: data?.parent_id }; // Return the data if success
};

export { fetchNodes, addNode, updateNode, deleteNode, getParentId, getNode };
