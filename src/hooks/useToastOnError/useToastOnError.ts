import useNotification from "antd/es/notification/useNotification";
import { useEffect } from "react";

export default function useToastOnError(
  error: string | null,
  toastText: string,
) {
  const [notificationApi, notificationHolder] = useNotification();

  useEffect(() => {
    if (error) {
      notificationApi.error({
        message: toastText,
        placement: "bottomRight",
        duration: 3,
      });
    }
  }, [error, notificationApi, toastText]);

  return notificationHolder;
}
