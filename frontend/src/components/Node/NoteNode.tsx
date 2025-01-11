import Node from "./Node";
import { TreeNode } from "../../models/tree";

interface NoteNodeProps {
  node: TreeNode;
  isSelected: boolean;
  isCollapsed: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onAddChild: (type: "folder" | "note") => void;
  onEdit: (id: string, newTitle: string) => void;
  editTitle: string;
  editContent: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave?: () => void;
  onCancel: () => void;
  level?: number;
  isEditing: boolean;
  setEditingNodeId: (id: string | null) => void;
  viewUp: () => void;
  viewDown: () => void;
}

const NoteNode: React.FC<NoteNodeProps> = ({
  node,
  isSelected,
  isCollapsed,
  onSelect,
  onRemove,
  onAddChild,
  onEdit,
  level = 0,
  isEditing,
  setEditingNodeId,
  viewUp,
  viewDown,
}) => {
  return (
    <div>
      <Node
        level={level}
        node={node}
        isSelected={isSelected}
        onSelect={onSelect}
        onRemove={onRemove}
        onAddChild={onAddChild}
        onEdit={onEdit}
        isCollapsed={isCollapsed}
        isEditing={isEditing}
        setEditingNodeId={setEditingNodeId}
        viewUp={viewUp}
        viewDown={viewDown}
      />
    </div>
  );
};

export default NoteNode;
