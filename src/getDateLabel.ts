import { isSameDay } from 'date-fns';

// Based on the implementation described in
// https://www.24a11y.com/2018/a-new-day-making-a-better-calendar/#:~:text=Labels%20for%20calendar%20dates%20should%20include%20the%20entire%20date%20in%20a%20human%20readable%20format
const getDateLabel = (date: Date, locale: string) => {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  });
  const parts: { [k: string]: string | number } = formatter.formatToParts(date).reduce(
    (acc, part) => ({
      ...acc,
      [part.type]: part.value,
    }),
    {},
  );
  return `${date.getDate()}, ${parts.weekday} ${parts.month} ${parts.year}${
    isSameDay(date, today) ? ', Today' : ''
  }`;
};

export default getDateLabel;
