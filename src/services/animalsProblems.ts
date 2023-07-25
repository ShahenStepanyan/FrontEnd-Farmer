
import { Problem } from "../types/Problem";
import { CRUDFunc } from "../utils";


const animalProblemsService = CRUDFunc<Problem>("/animalproblems");

export default animalProblemsService;
