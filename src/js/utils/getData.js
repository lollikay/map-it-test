import {createResource} from "./createResource";
import {makeRequest} from "./makeRequest";

export const getData = (url) => {
  return createResource(makeRequest({url}));
}