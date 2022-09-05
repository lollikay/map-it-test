export const createResource = (resource) => {
  let status = "PENDING";
  let result;
  const promiseFn = typeof resource === "function" ? resource : () => resource;

  return {
    read: () => {
      switch(status) {
        case "PENDING":
          throw promiseFn()
            .then(value => {
              status = "SUCCESS";
              result = value;
            })
            .catch(error => {
              status = "ERROR";
              result = error;
            });
        case "ERROR":
          throw result;
        case "SUCCESS":
          return result;
      }
    }
  };
}