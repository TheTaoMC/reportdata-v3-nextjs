// utils/roleUtils.ts
import { useAuth } from "@/context/AuthContext";

export function useRoleGuard(allowedRoles: string[]) {
  const { role } = useAuth();

  return !!role && allowedRoles.includes(role);
}