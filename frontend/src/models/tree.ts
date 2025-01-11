type TreeNode = {
  id: string;
  type: "folder" | "note";
  title?: string;
  content?: string;
  children?: TreeNode[];
  isCollapsed?: boolean | undefined;
};

export { type TreeNode };
