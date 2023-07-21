import { CRUDFunc } from "../utils";
import type { AnimalSubTypes } from "../types/AnimalSubTypes";

const animalSubTypeService = CRUDFunc<AnimalSubTypes>("/animalsubtype");

export default animalSubTypeService;
