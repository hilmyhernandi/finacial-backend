import { Role, RoleInput } from "../interfaces/user.interface.js";

export const normalizeRole = (role?: RoleInput): Role => {
  if (!role) return "EMPLOYED";

  const r = role.toUpperCase();

  if (r === "OWNER" || r === "EMPLOYED") {
    return r;
  }

  throw new Error("Invalid role");
};
