import NavBar from "../navbar";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div style={{ padding: "10px 20px" }}>{children}</div>
    </>
  );
};
