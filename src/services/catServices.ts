import { ICat, CatRegister } from "@/interfaces/ICat";

export const getCats = async (): Promise<ICat[]> => {
  const res = await fetch("http://localhost:3000/cats", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as ICat[];
};

export const getCatsId = async (id: string): Promise<ICat | undefined> => {
  const cats = await getCats();
  return cats.find((cat) => cat.id === id);
};

export const getCatsUser = async (id: string): Promise<ICat[]> => {
  const res = await fetch(`http://localhost:3000/users/cats/${id}`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      return [];
    });
  return res as ICat[];
};

export const catRegister = async (data: CatRegister) => {
  const res = await fetch("http://localhost:3000/cats", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
  return res.json();
};
