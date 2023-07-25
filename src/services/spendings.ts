
import { CRUDFunc } from "../utils";
import type { SpendingEventsType} from "../types/SpendingEventsType";

const spendingsService = CRUDFunc<SpendingEventsType>("/spendings");

export default spendingsService;






