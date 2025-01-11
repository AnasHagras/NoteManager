/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTreeStore } from "../store";
import { TreeNode } from "../models/tree";
import { toast } from "react-toastify"; // Import the toast module

interface TreeViewProps {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  addNode: (parentId: string | null, node: TreeNode) => void;
}

function TreeView({
  selectedNodeId,
  setSelectedNodeId,
  addNode,
}: TreeViewProps) {
  const { tree, removeNode, setTree, message, messageType, clearMessages } =
    useTreeStore((state) => state);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to remove a node
  function handleRemoveNode(id: string) {
    removeNode(id);
  }

  // Function to update the tree
  const updateTree = () => {
    const storedTree = localStorage.getItem("tree-storage");

    if (storedTree) {
      const parsedTree = JSON.parse(storedTree).tree;
      setTree(parsedTree);
    } else {
      const defaultTree: TreeNode[] = [
        { id: "1", name: "Root", type: "folder", children: [] },
        { id: "2", name: "Another Root", type: "folder", children: [] },
      ];
      setTree(defaultTree);
    }

    setLoading(false);
  };

  useEffect(() => {
    updateTree();
  }, []);

  useEffect(() => {
    if (message) {
      if (messageType === "success") {
        toast.success(message);
      } else if (messageType === "error") {
        toast.error(message);
      }
      clearMessages();
    }
  }, [message]);

  // Function to add a new node
  function handleAddNewNode(parentId: string | null) {
    const newNode: TreeNode = {
      id: `${Date.now()}`,
      type: "note",
      name: `New Node ${Date.now()}`,
      children: [],
    };
    addNode(parentId, newNode);
  }

  // Recursive function to render the tree nodes
  function renderTree(nodes: TreeNode[]) {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id} style={{ marginBottom: "10px" }}>
            <span
              style={{
                fontWeight: selectedNodeId === node.id ? "bold" : "normal",
                color: selectedNodeId === node.id ? "blue" : "black",
              }}
              onClick={() => setSelectedNodeId(node.id)}
            >
              {node.name}
            </span>
            <button onClick={() => handleRemoveNode(node.id)}>Remove</button>
            <button onClick={() => handleAddNewNode(node.id)}>Add Child</button>

            {node.children && node.children.length > 0 && (
              <div style={{ marginLeft: "20px" }}>
                {renderTree(node.children)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      {loading ? (
        <div>Loading tree...</div>
      ) : (
        <>
          <button onClick={updateTree}>Set New Tree</button>
          {renderTree(tree)}
        </>
      )}
    </div>
  );
}

export default TreeView;
