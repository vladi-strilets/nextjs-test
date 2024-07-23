import Axios from "axios";
import { makeUseAxios } from "axios-hooks";

const POKE_API_BASE_URL = "https://pokeapi.co/api";
const POKE_API_VERSION = "v2";

const axios = Axios.create({
  baseURL: `${POKE_API_BASE_URL}/${POKE_API_VERSION}`,
});

// TODO: add interceptors to catch unhandledRejection and unexpected errors (like no internet connection)
// axios.interceptors.request

export const usePokeApi = makeUseAxios({
  axios,
  cache: false,
  defaultOptions: {
    useCache: false,
    ssr: false,
  },
});
