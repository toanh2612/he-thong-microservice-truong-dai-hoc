import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { postMethod2 } from "@/services";
import styles from "@/styles/DetailPageCss";
import { AddressRequestType } from "@/types/address/AddressRequest";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const defaultAddress: AddressRequestType = {
  name: "",
  description: "",
};
export const AddressCreate = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [address, setAddress] = useState(defaultAddress);

  const createRequest = useApiCall<
    SuccessResponse<AddressRequestType>,
    ErrorResponse
  >({
    callApi: () =>
      postMethod2({
        pathName: `${apiRoutes.address}`,
        token: cookie.token,
        request: address,
      }),
    handleSuccess(message, data) {
      toast.success("Success");
      router.back();
    },
    handleError(status, message) {
      toast.error(message);
      router.back();
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev: any) => ({
      ...prev,
      [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
    }));
  };
  const handleCreate = () => {
    createRequest.setLetCall(true);
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <>
      <div>
        <div style={styles.divParent}>
          <div
            style={styles.divSquare}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div style={styles.divTextField}>
              <TextField
                id="name"
                label="Name"
                autoComplete="off"
                value={address.name}
                onChange={handleOnChange}
              />
              <TextField
                id="description"
                label="Description"
                autoComplete="off"
                value={address.description}
                onChange={handleOnChange}
              />
            </div>

            <div style={styles.divButtons}>
              <Button variant="outlined" color="warning" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
