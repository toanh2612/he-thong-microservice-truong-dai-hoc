import { apiRoutes } from "@/constant/apiRoutes";
import { ACCESS_TOKEN } from "@/constant/auth";
import { useApiCall } from "@/hooks";
import { deleteMethod2, getMethod2, putMethod2 } from "@/services";
import { AddressResponseType } from "@/types/address/AddressResponse";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { SuccessResponse } from "@/types/response/SuccessResponse";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import styles from "../../styles/DetailPageCss";
import Loading from "../loading";
const defaultAddress = {
  id: "",
  name: "",
  description: "",
  isDeleted: false,
  createdDate: "",
  updatedDate: "",
};
export const AddressDetail = () => {
  const router = useRouter();
  const [cookie] = useCookies([ACCESS_TOKEN]);
  const [address, setAddress] = useState(defaultAddress);

  const getAddressDetail = useApiCall<
    SuccessResponse<AddressResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      getMethod2({
        pathName: `${apiRoutes.address}\/${router?.query?.id || ""}`,
        token: cookie.token,
      }),
    handleSuccess(message, data) {
      setAddress(data.result);
    },
    handleError(status, message) {
      toast.error("NOT FOUND!");
      router.push("/404");
    },
  });
  const updateRequest = useApiCall<
    SuccessResponse<AddressResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      putMethod2({
        pathName: `${apiRoutes.address}\/${router?.query?.id || ""}`,
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
  const deleteRequest = useApiCall<
    SuccessResponse<AddressResponseType>,
    ErrorResponse
  >({
    callApi: () =>
      deleteMethod2({
        pathName: `${apiRoutes.address}\/${router?.query?.id || ""}`,
        token: cookie.token,
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

  useEffect(() => {
    if (router.isReady) {
      getAddressDetail.setLetCall(true);
    }
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev: any) => ({
      ...prev,
      [e.target.id]: Buffer.from(e.target.value, "utf-8").toString(),
    }));
  };
  const handleUpdate = () => {
    updateRequest.setLetCall(true);
  };
  const handleDelete = () => {
    deleteRequest.setLetCall(true);
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <>
      <Loading open={getAddressDetail.loading} />
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
                id="id"
                autoComplete="off"
                label="ID"
                value={address.id}
                disabled={true}
              />
              <TextField
                id="name"
                autoComplete="off"
                label="Name"
                value={address.name}
                onChange={handleOnChange}
              />
              <TextField
                id="description"
                autoComplete="off"
                label="Description"
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
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                style={{
                  visibility: "visible",
                  opacity: 1,
                  display: "inherit",
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
