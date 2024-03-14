export const days: number[] = Array.from(Array(31)).map((_, index) => index + 1)

export const months: { number: number; name: string }[] = [
  { number: 1, name: 'January' },
  { number: 2, name: 'February' },
  { number: 3, name: 'March' },
  { number: 4, name: 'April' },
  { number: 5, name: 'May' },
  { number: 6, name: 'June' },
  { number: 7, name: 'July' },
  { number: 8, name: 'August' },
  { number: 9, name: 'September' },
  { number: 10, name: 'October' },
  { number: 11, name: 'November' },
  { number: 12, name: 'December' }
]

export const years = (startCountYear: number = 100): number[] => {
  const endtYear: number = new Date().getFullYear()
  const startYear: number = endtYear - startCountYear
  const years: number[] = Array(endtYear - startYear + 1).fill(0)
  return years.map((_, index) => startYear + index)
}
