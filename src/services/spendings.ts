// import { SpendingEventsType , UserModel} from "../types/SpendingEventsType";

// import { axiosService, urlWithQuery } from "../utils";

// export const  getSpendings = (): Promise<Array<UserModel>> => axiosService.get(urlWithQuery("/spendings"));
// export const createSpendings = (data: SpendingEventsType): Promise<Array<UserModel>> => axiosService.post(urlWithQuery("/spendings", data));

// export default getSpendings;

import { CRUDFunc } from "../utils";
import type { SpendingEventsType} from "../types/SpendingEventsType";

const spendingsService = CRUDFunc<SpendingEventsType>("/spendings");

export default spendingsService;






