/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTreeStore } from "../store";
import { TreeNode } from "../models/tree";
import { toast } from "react-toastify"; // Import the toast module

function TreeView() {
  const {
    tree,
    lastOpenedNoteId,
    setLastOpenedNote,
    removeNode,
    setTree,
    message,
    messageType,
    clearMessages,
    editNode,
    addNode,
  } = useTreeStore((state) => state);

  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [newNodeName, setNewNodeName] = useState("");
  const [nodeType, setNodeType] = useState<"folder" | "note">("note");

  // Function to remove a node
  function handleRemoveNode(id: string) {
    removeNode(id);
  }

  // Function to add a new node
  function handleAddNewNode(parentId: string | null) {
    if (newNodeName.trim()) {
      const newNode: TreeNode = {
        id: `${Date.now()}`,
        type: nodeType,
        title: newNodeName,
        content: `This is the content of note ${Date.now()}.`, // Add content
        children: [],
      };
      addNode(parentId, newNode);
      setNewNodeName("");
    }
  }

  // Function to start editing a node
  function startEditing(node: TreeNode) {
    setEditTitle(node.title || "");
    setEditContent(node.content || "");
    setIsEditing(true);
  }

  // Function to save the edited node
  function saveEdit(node: TreeNode) {
    if (node.type === "note") {
      // Edit both title and content for nodes of type "note"
      if (editTitle.trim() !== "" && editContent.trim() !== "") {
        editNode(node.id, editTitle, editContent); // Edit the node in the store
        setIsEditing(false);
        setEditTitle("");
        setEditContent("");
      } else {
        toast.error("Both title and content cannot be empty");
      }
    } else {
      // Edit only title for other types (e.g., "folder")
      if (editTitle.trim() !== "") {
        editNode(node.id, editTitle); // Edit only the title in the store
        setIsEditing(false);
        setEditTitle("");
      } else {
        toast.error("Node title cannot be empty");
      }
    }
  }

  // Recursive function to render the tree nodes
  function renderTree(nodes: TreeNode[]) {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.id} style={{ marginBottom: "10px" }}>
            <span
              style={{
                fontWeight: lastOpenedNoteId === node.id ? "bold" : "normal",
                color: lastOpenedNoteId === node.id ? "blue" : "black",
              }}
              onClick={() => setLastOpenedNote(node.id)}
            >
              {isEditing && lastOpenedNoteId === node.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title"
                  />
                  {node.type === "note" && (
                    <div>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Edit content"
                      />
                    </div>
                  )}
                  <button onClick={() => saveEdit(node)}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              ) : node.type === "note" ? (
                <div>
                  <strong>{node.title}</strong>
                  <p>{node.content}</p>
                </div>
              ) : (
                node.title
              )}
            </span>
            <button onClick={() => handleRemoveNode(node.id)}>Remove</button>
            <button onClick={() => handleAddNewNode(node.id)}>Add Child</button>
            <button onClick={() => startEditing(node)}>Edit</button>

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

  const updateTree = () => {
    const storedTree = localStorage.getItem("tree-storage");

    if (storedTree) {
      const parsedTree = JSON.parse(storedTree).tree;
      setTree(parsedTree);
      setLastOpenedNote(JSON.parse(storedTree).lastOpenedNoteId);
    } else {
      const defaultTree: TreeNode[] = [
        { id: "1", title: "Root", type: "folder", children: [] },
        { id: "2", title: "Another Root", type: "folder", children: [] },
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

  const selectedNode = tree.find((node) => node.id === lastOpenedNoteId);

  return (
    <div>
      {loading ? (
        <div>Loading tree...</div>
      ) : (
        <>
          <div>
            <input
              type="text"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              placeholder="Enter node name"
            />
            <select
              value={nodeType}
              onChange={(e) => setNodeType(e.target.value as "folder" | "note")}
            >
              <option value="folder">Folder</option>
              <option value="note">Note</option>
            </select>
            <button onClick={() => handleAddNewNode(selectedNode?.id || null)}>
              Add Node
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>{renderTree(tree)}</div>
            {selectedNode && selectedNode.type === "note" && (
              <div
                style={{
                  marginLeft: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  width: "300px",
                }}
              >
                <h3>{selectedNode.title}</h3>
                <p>{selectedNode.content}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TreeView;
