import { CRUDFunc } from "../utils";
import type { Weight } from "../types/Weight";

const weightsService = CRUDFunc<Weight>("/weights");

export default weightsService;
