export const match = (param: string) => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(param)
}
