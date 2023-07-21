import { axiosService, CRUDFunc } from "../utils";
import type { Animal } from "../types/Animal";

const animalsService = {
  ...CRUDFunc<Animal>("/animals"),
  deregister: (
    _id: string,
    value: any
  ) => axiosService.patch(`/animals/${_id}`, { ...value , removed: "true"}),
};

export default animalsService;
