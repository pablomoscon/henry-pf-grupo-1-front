export const protectedPaths: { [key: string]: string[] } = {
  "/dashadmin": ["admin"], // ejemplo ruta protegida solo para rol admin
  "/profile": ["user", "admin"],
  "/dashcaretaker": ["caretaker", "admin"],
  "/reserve": ["user", "admin"],
  "/edit-profile": ["user", "admin"],
  // aca van mas rutas protegidas
};
