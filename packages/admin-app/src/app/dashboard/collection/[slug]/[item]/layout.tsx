export default function Layout({
  children,
  tags,
  properties,
}: Readonly<{
  children: React.ReactNode;
  tags: React.ReactNode;
  properties: React.ReactNode;
}>) {
  return (
    <div className="relative size-full p-[2vw] flex flex-row justify-center">
      <div className="relative flex-none w-[300px] h-full">{properties}</div>
      <div className="relative flex-1 min-h-0 h-full px-[2vw] flex flex-col items-center">
        <section className="relative bg-white rounded-lg w-full h-full container">
          {children}
        </section>
      </div>
      <div className="relative flex-none w-[200px] h-full">{tags}</div>
    </div>
  );
}
