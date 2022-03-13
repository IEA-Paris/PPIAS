const process = function () {
  let years = [2002, 2003, 1998, 2020, 2004, 2012, 2015, 2016, 2021]
  const targetYears = []

  years = years.sort((a, b) => a > b)
  let start = years[0] - 1
  // if end is set, we look for a new start
  let end = false
  // Since the first item is already in start, we slice the array to remove it
  years.slice(1).forEach((year, index) => {
    if (!end) {
      // is it a consecutive year
      if (year - years[index - 1] > 1) {
        end = years[index - 1] + 1
        if (index === years.length) {
          targetYears.push([start, end])
        }
      }
    } else {
      targetYears.push([start, end])
      start = year - 1
      end = false
    }
  })
}
process()
