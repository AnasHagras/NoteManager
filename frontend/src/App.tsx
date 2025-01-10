// src/App.tsx
import React, { useState } from "react";
import TreeView from "./components/TreeView";
import { useTreeStore } from "./store";

const App: React.FC = () => {
  const { addNode } = useTreeStore((state) => state);
  const [newNodeName, setNewNodeName] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeType, setNodeType] = useState<"folder" | "note">("note");

  const handleAddNode = () => {
    if (newNodeName.trim()) {
      const newNode = {
        id: `${Date.now()}`,
        type: nodeType,
        name: newNodeName,
        children: [],
      };
      addNode(selectedNodeId, newNode);
      setNewNodeName("");
    }
  };

  return (
    <div>
      <h1>Tree View</h1>

      <TreeView
        selectedNodeId={selectedNodeId}
        setSelectedNodeId={setSelectedNodeId}
        addNode={addNode}
      />

      <hr />

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
        <button onClick={handleAddNode}>Add Node</button>
      </div>

      <p>Selected Node: {selectedNodeId ? selectedNodeId : "None"}</p>
    </div>
  );
};

export default App;
