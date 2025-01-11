import React from "react";
import { IconButton } from "@mui/material";
import { ExpandMore, ExpandLess, NoteAdd, Folder } from "@mui/icons-material";
import { HeaderWrapper, AddButtonWrapper } from "./TreeViewHeader.styles";
import { TreeNode } from "../../models/tree";
import { isCollapsedAll } from "../../utils/helper";

interface TreeViewHeaderProps {
  onAddFolder: () => void;
  onAddNote: () => void;
  tree: TreeNode[];
  onExpandAll: () => void;
  onCollapseAll: () => void;
  loading: boolean;
}

const TreeViewHeader: React.FC<TreeViewHeaderProps> = ({
  onAddFolder,
  onAddNote,
  tree,
  onExpandAll,
  onCollapseAll,
  loading,
}) => {
  const allCollapsed = isCollapsedAll(tree);

  return (
    <HeaderWrapper>
      <h2>Explorer</h2>
      {!loading && (
        <AddButtonWrapper>
          <IconButton
            disableRipple
            onClick={onAddFolder}
            aria-label="Add Folder"
            title="Add Folder"
          >
            <Folder />
          </IconButton>
          <IconButton
            disableRipple
            onClick={onAddNote}
            aria-label="Add Note"
            title="Add Note"
          >
            <NoteAdd />
          </IconButton>
          <IconButton
            disableRipple
            onClick={allCollapsed ? onExpandAll : onCollapseAll}
            aria-label={allCollapsed ? "Expand All" : "Collapse All"}
            title={allCollapsed ? "Expand All" : "Collapse All"}
          >
            {allCollapsed ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </AddButtonWrapper>
      )}
    </HeaderWrapper>
  );
};

export default TreeViewHeader;
