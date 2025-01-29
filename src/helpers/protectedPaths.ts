export const protectedPaths: { [key: string]: string[] } = {
  "/dashadmin": ["admin"], // ejemplo ruta protegida solo para rol admin
  "/dashuser": ["user"],
  "/reserve": ["user"],
  "/edit-profile": ["user"],
  // aca van mas rutas protegidas
};
