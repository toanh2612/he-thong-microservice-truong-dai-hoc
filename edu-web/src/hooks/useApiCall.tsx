import { setIsLoggedIn } from "@/redux/authentication";
// import { setLoading as setLoadingRedux } from '@/redux/share-store'
import { CommonResponseType } from "@/types";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
export const useApiCall = <T, E>({
  callApi,
  handleError,
  handleSuccess,
}: // preventLoadingGlobal,
{
  callApi: () => Promise<AxiosResponse<any, any>>;
  handleError?: (status: number, message: string) => void;
  handleSuccess?: (message: string, data: T) => void;
  // preventLoadingGlobal?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<E>();
  const [letCall, setLetCall] = useState<boolean>(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const [, , removeCookie] = useCookies(["token"]);

  const getData = async () => {
    try {
      const response = await callApi();
      const { status, statusText, data } = response;

      if (status == 200 || status == 201) {
        setData(response.data);

        setError(undefined);
        if (handleSuccess) {
          handleSuccess(statusText, data);
        }
      }
    } catch (e: any) {
      const { status, statusText, data } = e;
      if (status === 400) {
        setData(undefined);
        setError(data);
      }
      if (handleError) {
        if (status === 500) {
          handleError(status, statusText);
        } else {
          handleError(status, data.error.message);
        }
      }
      if (status === 401) {
        removeCookie("token");
        dispatch(setIsLoggedIn(false));
      }
      if (status === 403) {
        router.push("/403");
      }
    } finally {
      setLoading(false);
      setLetCall(false);
      // if (!preventLoadingGlobal) {
      //   dispatch(setLoading(false));
      // }
    }
  };

  useEffect(() => {
    if (letCall) {
      setLoading(true);
      getData();
      // if (!preventLoadingGlobal) dispatch(setLoadingRedux(true));
    }
  }, [letCall]);

  const handleReset = () => {
    setLoading(false);
    setData(undefined);
    setError(undefined);
    setLetCall(false);
  };

  return {
    handleReset,
    setLetCall,
    loading,
    data,
    error,
  };
};
