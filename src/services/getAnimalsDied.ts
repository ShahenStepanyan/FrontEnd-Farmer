
import { Animal } from "../types/Animal";
import { axiosService, urlWithQuery } from "../utils";


 
export const getAnimalsDied  = ()
  : Promise<Array<Animal>> => axiosService.get(urlWithQuery("/get-animals-died"));
  