type TreeNode = {
  id: string;
  type: "folder" | "note";
  name: string;
  children?: TreeNode[];
};

export { type TreeNode };
