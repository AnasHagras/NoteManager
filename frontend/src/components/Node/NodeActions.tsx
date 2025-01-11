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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For menu anchor position
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set anchor to the button clicked
    setIsMenuOpen(true); // Open the menu
  };

  const closeMenu = () => {
    setAnchorEl(null); // Close the menu
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
    closeMenu(); // Close the menu after performing the action
  };

  return (
    <>
      {/* Show three dots menu that triggers the dropdown */}
      <IconButton onClick={openMenu} disableRipple>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      {/* Menu for actions */}
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
              position: "fixed", // Ensure it doesn’t shift relative to other elements
              top: "10px", // Adjust the vertical position based on your design
              left: "50%", // Horizontal positioning
              transform: "translateX(-50%)", // Center the menu
            },
          },
        }}
        TransitionProps={{
          timeout: 200,
        }}
      >
        {/* Render actions based on node type */}
        {node.type === "folder" ? (
          <>
            <MenuItem
              disableRipple
              onClick={() => handleAction("rename")}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px", // Consistent padding to prevent shifting
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light gray background on hover
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
                padding: "8px 16px", // Consistent padding to prevent shifting
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light gray background on hover
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
                padding: "8px 16px", // Consistent padding to prevent shifting
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light gray background on hover
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
                padding: "8px 16px", // Consistent padding to prevent shifting
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light gray background on hover
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
                padding: "8px 16px", // Consistent padding to prevent shifting
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light gray background on hover
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
                padding: "8px 16px", // Consistent padding to prevent shifting
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Light gray background on hover
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
