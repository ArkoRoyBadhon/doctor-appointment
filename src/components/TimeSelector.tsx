import React, { useState } from "react";
interface PropsType {
  onChange: (data: string[]) => void;
}
const filterTimes = [
  "12:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];
const TimeSelector: React.FC<PropsType> = ({ onChange }) => {
  const [fromTime, setFromTime] = useState<string[]>([...filterTimes]);
  const [toTime, setToTime] = useState<string[]>([...filterTimes]);
  const [isDisable, setIsdisable] = useState<boolean>(false);

  const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([
    "",
    "",
  ]);

  const handleChangeFromTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!isDisable) {
      setIsdisable(true);
    }

    // all available times
    const allTimes = [...filterTimes];
    const timeLength = allTimes.length;

    const indx = allTimes.indexOf(value);

    if (indx === timeLength - 1) {
      setToTime([allTimes[0]]);
      setSelectedTimeRange([value, allTimes[0]]);
      onChange([value, allTimes[0]]);
    } else {
      const newToTime = [...allTimes].slice(indx + 1, timeLength);
      setSelectedTimeRange([value, newToTime[0]]);
      onChange([value, newToTime[0]]);
      setToTime(newToTime);
    }
  };

  const handleChangeToTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const prevSelectedTimes = [...selectedTimeRange];
    prevSelectedTimes[1] = value;
    setSelectedTimeRange(prevSelectedTimes);
    onChange(prevSelectedTimes);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-[10px]  rounded-[8px]">
      <div className="w-full flex gap-[10px] justify-between items-center">
        <select
          value={selectedTimeRange[0]}
          className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          onChange={(e) => handleChangeFromTime(e)}
        >
          <option value="" disabled={isDisable}>
            Select
          </option>
          {fromTime.map((from, i) => (
            <option key={i + "fromopt"} value={from}>
              {from}
            </option>
          ))}
        </select>

        <p className="text-secondaryTxt font-[500]">To</p>
        <select
          value={selectedTimeRange[1]}
          onChange={(e) => handleChangeToTime(e)}
          className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        >
          <option value="" disabled={isDisable}>
            Select
          </option>
          {toTime.map((from, i) => (
            <option key={i + "fromopt"} value={from}>
              {from}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeSelector;
