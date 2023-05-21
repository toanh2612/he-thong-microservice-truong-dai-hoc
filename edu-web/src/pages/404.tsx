import { Theme } from "@/lib";
import Image from "next/image";

const Page404 = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 30,
        paddingTop: 150,
      }}
    >
      <div
        style={{
          width: "20%",
          position: "relative",
          aspectRatio: "1/1",
        }}
      >
        <Image fill={true} src="/undraw_void_-3-ggu.svg" alt={"NOT_FOUND"} />
      </div>
      <div
        style={{
          fontSize: 50,
          color: Theme.colors.gray900,
        }}
      >
        NOT FOUND
      </div>
    </div>
  );
};

export default Page404;
