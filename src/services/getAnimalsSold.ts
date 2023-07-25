import { Animal } from "../types/Animal";
import { axiosService, urlWithQuery } from "../utils";


 
export const getAnimalsSold  = (  
  ): Promise<Array<Animal>> => axiosService.get(urlWithQuery("/get-animals-sold"));
  