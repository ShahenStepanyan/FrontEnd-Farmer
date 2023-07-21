import { axiosService } from "../utils";

export default {
  subscriptionChange: (token: string, isSubscribed?: boolean) =>
    axiosService.post("/notifications/subscription-change", {
      token,
      isSubscribed,
    }),
  seen: (notificationId: string) =>
    axiosService.patch(`/notifications/seen/${notificationId}`),
};
