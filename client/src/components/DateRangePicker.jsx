import { useState } from "react";
import DatePicker from "./DatePicker";

const DateRangePicker = ({ onChange, initialStart, initialEnd }) => {
  const [range, setRange] = useState({
    start: initialStart,
    end: initialEnd,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nextRange = {
      ...range,
      [name]: value,
    };
    setRange(nextRange);
    if (onChange) {
      onChange(nextRange.start, nextRange.end);
    }
  };

  return (
    <div className="md:inline flex gap-x-4 gap-y-3 flex-col xs:flex-row">
      <div className="inline md:me-4 xs:w-1/2">
        <DatePicker
          label="Desde"
          onChange={handleChange}
          value={range.start}
          max={range.end}
          name="start"
        />
      </div>
      <div className="inline xs:w-1/2">
        <DatePicker
          label="Hasta"
          onChange={handleChange}
          value={range.end}
          min={range.start}
          name="end"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
