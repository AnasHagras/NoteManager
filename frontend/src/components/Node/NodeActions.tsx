import React, { useState, MouseEvent } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete"; // Icon for Remove
import AddFolderIcon from "@mui/icons-material/CreateNewFolder"; // Icon for Add Folder
import AddNoteIcon from "@mui/icons-material/NoteAdd"; // Icon for Add Note
import RenameIcon from "@mui/icons-material/DriveFileRenameOutline"; // Icon for Rename
import { TreeNode } from "../../models/tree";

interface NodeActionsProps {
  node: TreeNode;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onRemove: () => void;
  onEdit: () => void;
  onRename: () => void;
  onAddFolder: () => void;
  onAddNote: () => void;
}

const NodeActions: React.FC<NodeActionsProps> = ({
  node,
  onToggleCollapse,
  onRemove,
  onEdit,
  onAddFolder,
  onAddNote,
  onRename,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleAction = (action: string) => {
    if (action === "edit") {
      onEdit();
    } else if (action === "remove") {
      onRemove();
    } else if (action === "toggleCollapse") {
      onToggleCollapse?.();
    } else if (action === "rename") {
      onRename();
    } else if (action === "addFolder") {
      onAddFolder();
    } else if (action === "addNote") {
      onAddNote();
    }
    closeMenu();
  };

  return (
    <>
      <IconButton onClick={openMenu} disableRipple>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "node-actions-menu",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "8px",
              boxShadow: 2,
              minWidth: 180,
              position: "fixed",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
            },
          },
        }}
        TransitionProps={{
          timeout: 200,
        }}
      >
        {node.type === "folder" ? (
          <>
            <MenuItem
              disableRipple
              onClick={() => handleAction("rename")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <RenameIcon sx={{ marginRight: 1 }} />
              Rename Folder
            </MenuItem>
            <MenuItem
              disableRipple
              onClick={() => handleAction("addFolder")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <AddFolderIcon sx={{ marginRight: 1 }} />
              Add Folder
            </MenuItem>
            <MenuItem
              disableRipple
              onClick={() => handleAction("addNote")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <AddNoteIcon sx={{ marginRight: 1 }} />
              Add Note
            </MenuItem>
            <MenuItem
              disableRipple
              onClick={() => handleAction("remove")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <DeleteIcon sx={{ marginRight: 1 }} />
              Delete Folder
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              disableRipple
              onClick={() => handleAction("rename")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <RenameIcon sx={{ marginRight: 1 }} />
              Rename Note
            </MenuItem>
            <MenuItem
              disableRipple
              onClick={() => handleAction("remove")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <DeleteIcon sx={{ marginRight: 1 }} />
              Remove Note
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default NodeActions;
