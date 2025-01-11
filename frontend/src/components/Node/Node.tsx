import React, { useEffect, useRef, useState } from "react";
import { TreeNode } from "../../models/tree";
import { NodeTitle } from "./Node.styles";
import NodeActions from "./NodeActions"; // Import the new component
import { IconButton, TextField } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material"; // Material UI icons for expand/collapse
import { Folder, Description } from "@mui/icons-material"; // Modern icons for folder and note

interface NodeProps {
  node: TreeNode;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onAddChild: (type: "folder" | "note") => void;
  onEdit: (id: string, newTitle: string) => void; // onEdit now takes the new title as a parameter
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  level: number;
  isEditing: boolean;
  setEditingNodeId: (id: string | null) => void;
  viewUp: () => void;
  viewDown: () => void;
}

const Node: React.FC<NodeProps> = ({
  node,
  isSelected,
  onSelect,
  onRemove,
  onAddChild,
  onEdit,
  isCollapsed,
  onToggleCollapse,
  level = 0,
  isEditing,
  setEditingNodeId,
  viewUp,
  viewDown,
  ...props
}) => {
  const [newTitle, setNewTitle] = useState(node.title); // State to manage the new title
  const textFieldRef = useRef<HTMLInputElement>(null);
  const isFolder = node.type === "folder";

  const handleRename = () => {
    if (isEditing && newTitle !== node.title) {
      onEdit(node.id, newTitle || "");
    }
    setEditingNodeId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "F2") {
      setEditingNodeId(node.id);
    }

    if (e.key === "ArrowUp") {
      viewUp();
    } else if (e.key === "ArrowDown") {
      viewDown();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        ...props,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {level > 0 && <div style={{ width: `${level * 20}px` }} />}
        {node.children && node?.children.length > 0 ? (
          <IconButton
            disableRipple
            onClick={onToggleCollapse}
            style={{
              color: "black",
              width: "10px",
              borderRadius: "0",
              margin: "0",
              padding: "0",
              marginRight: "5px",
              marginLeft: "5px",
              backgroundColor: "transparent",
            }}
          >
            {isCollapsed ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        ) : (
          <div style={{ width: "20px" }} />
        )}
        {isFolder ? (
          <Folder
            style={{
              marginRight: "5px",
            }}
          />
        ) : (
          <Description
            style={{
              marginRight: "5px",
            }}
          />
        )}
        {isEditing ? (
          <TextField
            inputRef={textFieldRef}
            value={newTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            focused={isEditing}
            autoFocus
            variant="standard"
            size="small"
            style={{ width: "auto" }}
          />
        ) : (
          <NodeTitle isSelected={isSelected} onClick={onSelect} tabIndex={-1}>
            {node.title}
          </NodeTitle>
        )}
      </div>

      <NodeActions
        node={node}
        isCollapsed={isCollapsed}
        onToggleCollapse={onToggleCollapse}
        onRemove={onRemove}
        onEdit={() => onRemove()}
        onAddFolder={() => onAddChild("folder")}
        onAddNote={() => onAddChild("note")}
        onRename={() => setEditingNodeId(node.id)}
      />
    </div>
  );
};

export default Node;
