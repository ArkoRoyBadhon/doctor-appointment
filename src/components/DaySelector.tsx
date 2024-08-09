import React, { useState } from "react";

interface Props {
  onChange: (data: string[]) => void;
}

const DaySelector: React.FC<Props> = ({ onChange }) => {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // State to track selected days
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Handler for when a checkbox is toggled
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    let values = [];
    if (checked) {
      values = [...selectedDays, value];
      setSelectedDays(values);
    } else {
      values = selectedDays.filter((day) => day !== value);
      setSelectedDays(values);
    }
    onChange(values);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {daysOfWeek.map((day, index) => (
        <label key={index} className="flex items-center">
          <input
            type="checkbox"
            name="daysOfWeek"
            value={day}
            checked={selectedDays.includes(day)}
            onChange={handleCheckboxChange}
            className="form-checkbox rounded text-primary-600 focus:ring-primary-600"
          />
          <span className="ml-2 text-sm text-gray-900">{day}</span>
        </label>
      ))}
    </div>
  );
};

export default DaySelector;
