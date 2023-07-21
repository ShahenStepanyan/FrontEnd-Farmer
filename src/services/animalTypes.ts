import { CRUDFunc } from "../utils";
import type { AnimalTypes } from "../types/AnimalTypes";

const animalTypeService = CRUDFunc<AnimalTypes>("/animal-types");

export default animalTypeService;



// export const getUsers = (
//   query?: Partial<UserModel>
// ): Promise<Array<UserModel>> => axiosService.get(urlWithQuery("/users", query));