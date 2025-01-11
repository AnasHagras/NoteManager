type TreeNode = {
  id: string;
  type: "folder" | "note";
  title?: string;
  content?: string;
  children?: TreeNode[];
};

export { type TreeNode };
