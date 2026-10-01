const skuFormatter = new Intl.NumberFormat('ru-RU')

export const formatSku = (count: number) => `${skuFormatter.format(count)} SKU`
