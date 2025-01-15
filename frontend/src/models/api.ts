import { SupabaseNode } from "./tree";
type ServiceResponse = Promise<{
  success: boolean;
  data?: Partial<SupabaseNode>;
  error?: string;
}>;

export { type ServiceResponse };
