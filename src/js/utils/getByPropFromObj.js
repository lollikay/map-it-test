export const getByPropFromObj = (o, prop) => {
  return (res => (JSON.stringify(o, (key, value) => (key === prop && res.push(value), value)), res))([]);
}

