import { SupabaseNode } from "./tree";
type TreeResponse = Promise<{
  success: boolean;
  data?: Partial<SupabaseNode>;
  error?: string;
}>;

export { type TreeResponse as ServiceResponse };
