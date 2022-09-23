import React, { useMemo, useState } from 'react';
import calendarize from 'calendarize';
import getWeekdays from './getWeekdays';
import getDateLabel from './getDateLabel';
import Chevron from './Chevron';
import { isSameDay } from 'date-fns';

import {
  Container,
  BlankCell,
  TitleRow,
  Title,
  NavigationButton,
  TitleCell,
  DateCell,
  CalendarRow,
  NavigationRow,
  CalendarGrid,
} from './styled';

type Props = {
  className?: string;
  locale: string;
  value: Date;
  onChange: (date: Date) => void;
};

const Calendar = ({ className, value = new Date(), locale = 'en-US', onChange }: Props) => {
  const [visibleDate, setVisibleDate] = useState(value);

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
      }),
    [locale],
  );
  // @ts-ignore - weekInfo is a newer property
  const weekInfo = useMemo(() => new Intl.Locale(locale).weekInfo || {}, [locale]);

  const month = monthFormatter.format(visibleDate);
  const calendar = calendarize(visibleDate, weekInfo.firstDay || 0);
  const weekdays = getWeekdays(locale, weekInfo.firstDay || 0);

  const handleNextMonth = () => {
    setVisibleDate(new Date(visibleDate.setMonth(visibleDate.getMonth() + 1)));
  };

  const handlePreviousMonth = () => {
    setVisibleDate(new Date(visibleDate.setMonth(visibleDate.getMonth() - 1)));
  };

  return (
    <Container className={className}>
      <TitleRow aria-label="Calendar Navigation">
        <Title>{month}</Title>
        <NavigationRow>
          <NavigationButton
            type="button"
            aria-label={`Previous month`}
            onClick={handlePreviousMonth}
          >
            <Chevron />
          </NavigationButton>
          <NavigationButton type="button" aria-label={`Next month`} onClick={handleNextMonth}>
            <Chevron />
          </NavigationButton>
        </NavigationRow>
      </TitleRow>
      <CalendarGrid aria-label="Calendar Dates">
        <CalendarRow>
          {weekdays.map((weekday) => (
            <TitleCell key={weekday} title={weekday}>
              {weekday[0]}
            </TitleCell>
          ))}
        </CalendarRow>
        {calendar.map((week, i) => (
          <CalendarRow key={i}>
            {week.map((day, j) =>
              day !== 0 ? (
                <DateCell
                  type="button"
                  aria-pressed={isSameDay(
                    value,
                    new Date(visibleDate.getFullYear(), visibleDate.getMonth(), day),
                  )}
                  aria-label={getDateLabel(
                    new Date(value.getFullYear(), value.getMonth(), day),
                    locale,
                  )}
                  key={j}
                  onClick={() =>
                    onChange(new Date(visibleDate.getFullYear(), visibleDate.getMonth(), day))
                  }
                >
                  {day}
                </DateCell>
              ) : (
                <BlankCell key={`empty-cell-${j}`} />
              ),
            )}
          </CalendarRow>
        ))}
      </CalendarGrid>
    </Container>
  );
};

export default Calendar;
