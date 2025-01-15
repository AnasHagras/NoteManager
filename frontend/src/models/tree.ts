type TreeNode = {
  readonly id: string;
  type: "folder" | "note";
  title?: string;
  content?: string;
  children?: TreeNode[];
};

type SupabaseNode = {
  readonly id: string;
  parent_id?: string | null;
  type: "folder" | "note";
  title?: string;
  content?: string;
};

type NewSupabaseNode = Omit<SupabaseNode, "id">;

export { type TreeNode, type SupabaseNode, type NewSupabaseNode };
