import Image from "next/image";

export const renderPaws = (count: number): React.ReactNode => {
  return (
    <div className="flex justify-center mt-2 space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Image
          key={i}
          src={i < count ? "/icoPaws.png" : "/icoPawsBorder.png"}
          alt="Cat paw"
          width={20}
          height={20}
        />
      ))}
    </div>
  );
};
