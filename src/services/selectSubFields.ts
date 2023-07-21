import { CRUDFunc } from "../utils";
import type { SelectSubField } from "../types/SelectField";

const selectSubFieldsService = CRUDFunc<SelectSubField>("/select-sub-fields");

export default selectSubFieldsService;
