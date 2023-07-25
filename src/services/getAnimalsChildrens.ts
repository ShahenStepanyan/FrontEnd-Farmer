import { Animal } from "../types/Animal";
import { axiosService, urlWithQuery } from "../utils";


 
export const getAnimalsChildrens  = (value: {})
: Promise<Array<Animal>> => axiosService.get(urlWithQuery("/get-animals-childrens", value));
  