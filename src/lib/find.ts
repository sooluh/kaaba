export const find = (data: any[], keyword: string) => {
  const pattern = new RegExp(keyword, 'i')

  return data.filter((item) => pattern.test(item.title))
}
