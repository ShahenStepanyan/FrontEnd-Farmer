import { CRUDFunc } from "../utils";
import type { SelectField } from "../types/SelectField";

const selectFieldService = CRUDFunc<SelectField>("/select-fields");

export default selectFieldService;
