import Node from "./Node";
import { TreeNode } from "../../models/tree";

interface FolderNodeProps {
  node: TreeNode;
  isSelected: boolean;
  isCollapsed: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onAddChild: (type: "folder" | "note") => void;
  onEdit: (id: string, updatedNode: Partial<TreeNode>) => void;
  onToggleCollapse?: () => void;
  level?: number;
  isEditing: boolean;
  setEditingNodeId: (id: string | null) => void;
  viewUp: () => void;
  viewDown: () => void;
}

const FolderNode: React.FC<FolderNodeProps> = ({
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
}) => {
  return (
    <Node
      setEditingNodeId={setEditingNodeId}
      isEditing={isEditing}
      level={level}
      onToggleCollapse={onToggleCollapse}
      node={node}
      isSelected={isSelected}
      onSelect={onSelect}
      onRemove={onRemove}
      onAddChild={onAddChild}
      onEdit={onEdit}
      isCollapsed={isCollapsed}
      viewUp={viewUp}
      viewDown={viewDown}
    />
  );
};

export default FolderNode;
