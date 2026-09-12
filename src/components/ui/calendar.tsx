import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ICustCalendar {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  minDate: Date | undefined;
}

const CustomCalendar: React.FC<ICustCalendar> = ({
  value,
  onChange,
  minDate,
}) => {
  const initialDate = value ? new Date(value) : new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState(value || undefined);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const day = index - firstDay + 1;

      if (day < 1 || day > daysInMonth) {
        return null;
      }

      return new Date(year, month, day);
    });
  }, [year, month]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isBeforeMinDate = (date: Date) => {
    if (!date || !minDate) return false;

    const current = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const minimum = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate(),
    );

    return current < minimum;
  };

  const isSameDate = (date1: Date, date2: Date) => {
    if (!date1 || !date2) return false;

    const a = new Date(date1);
    const b = new Date(date2);

    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const handleDateClick = (date: Date) => {
    if (!date || isBeforeMinDate(date)) return;

    const dateValue = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    setSelectedDate(dateValue);
    onChange?.(dateValue);
  };

  return (
    <div className="w-full bg-white py-2">
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <h2 className="text-sm font-semibold text-[#202124]">
          {MONTHS[month]} {year}
        </h2>

        <button
          type="button"
          onClick={goToNextMonth}
          className="absolute right-0 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Previous month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Calendar */}
      <div className="mt-6">
        {/* Week days */}
        <div className="grid grid-cols-7">
          {WEEK_DAYS.map((day, index) => (
            <div
              key={`${day}-${index}`}
              className="flex text-xs h-8 items-center justify-center font-semibold text-[#6B6B6B]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="mt-3 grid grid-cols-7">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="h-[69px]" />;
            }

            const disabled = isBeforeMinDate(date);
            const selected = isSameDate(date, selectedDate as Date);

            return (
              <div
                key={date.toISOString()}
                className="flex h-[69px] items-start justify-center font-semibold"
              >
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDateClick(date)}
                  className={`
                    flex h-10 w-16 items-center justify-center rounded-full ease transition-all border-transparent border-2 hover:border-[#222]
                    ${
                      disabled
                        ? "cursor-default text-[#D1D1D1]"
                        : "cursor-pointer text-[#222222] hover:text-white hover:bg-[#222]"
                    }
                    ${selected ? "font-bold bg-[#222] text-white" : "font-semibold"}
                  `}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
