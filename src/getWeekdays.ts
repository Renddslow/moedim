const getWeekdays = (locale, offset) => {
  const commonYearStartingOnSunday = new Date(2023, 0, 1);
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    weekdays.push(commonYearStartingOnSunday.toLocaleDateString(locale, { weekday: 'long' }));
    commonYearStartingOnSunday.setDate(commonYearStartingOnSunday.getDate() + 1);
  }
  // shift the weekdays by the offset
  return weekdays.slice(offset).concat(weekdays.slice(0, offset));
};

export default getWeekdays;
