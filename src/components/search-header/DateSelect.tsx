import CustomCalendar from "../ui/calendar";

interface IDateSelector {
  isOpen: boolean;
  endDate: Date | undefined;
  minDate?: Date | undefined;
  startDate: Date | undefined;
  onEndDateChange: (date: Date | undefined) => void;
  onStartDateChange: (date: Date | undefined) => void;
}

const DateSelector: React.FC<IDateSelector> = ({
  isOpen,
  endDate,
  minDate,
  startDate,
  onEndDateChange,
  onStartDateChange,
}) => {
  if (!isOpen) return;
  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 max-h-96 overflow-y-auto bg-white rounded-2xl min-w-[700px] shadow-lg p-5 md:py-8 px-6 grid gap-x-2 gap-y-3 grid-cols-2">
      <CustomCalendar
        minDate={minDate}
        value={startDate}
        onChange={onStartDateChange}
      />
      <CustomCalendar
        value={endDate}
        minDate={startDate}
        onChange={onEndDateChange}
      />
    </div>
  );
};

export default DateSelector;
