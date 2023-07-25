import { CRUDFunc } from "../utils";
import type { AnimalTypes } from "../types/AnimalTypes";

const animalTypeService = CRUDFunc<AnimalTypes>("/animal-types");

export default animalTypeService;
