import { LoginLayout } from "@/components/layout/LoginLayout";
import { innerRoutes } from "@/constant/apiRoutes";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(innerRoutes.login);
  }, []);
  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <LoginLayout>
        <div
          style={{
            margin: "auto",
            justifyContent: "center",
            alignContent: "center",
            width: "50vw",
            height: "50vh",
            position: "relative",
          }}
        >
          {/* <Image
            src="/undraw_hello_re_3evm.svg"
            alt="HOME"
            fill={true}
            color="#FFFFF"
          />
          <Button variant="contained">Login</Button> */}
        </div>
      </LoginLayout>
    </div>
  );
}
