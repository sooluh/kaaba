export const find = <T extends { title: string }>(data: T[], keyword: string) => {
  const pattern = new RegExp(keyword, 'i')

  return data.filter((item) => pattern.test(item.title))
}
