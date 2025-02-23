export async function fetchUsers() {
  const res = await fetch("./api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
