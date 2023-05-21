import { DefaultLayout } from "@/components";
import { Theme } from "@/lib";
import Image from "next/image";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

const Page403 = () => {
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
        <Image
          // layout="fill"
          fill={true}
          src="/undraw_access_denied_re_awnf.svg"
          alt={"Forbidden"}
        />
      </div>
      <div
        style={{
          fontSize: 50,
          color: Theme.colors.gray900,
        }}
      >
        Forbidden
      </div>
    </div>
  );
};

Page403.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Page403;
