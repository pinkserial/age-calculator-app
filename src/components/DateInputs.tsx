import { forwardRef } from "react";
import SimpleDate from "../types/date";
import "./DateInputs.css";

const DateInputs = forwardRef<
  HTMLInputElement,
  { date: SimpleDate; setDate: (d: SimpleDate) => void }
>(({ date, setDate }, ref) => {
  return (
    <div className="input__date__items" ref={ref}>
      <DateInput
        id="day"
        pattern="^(0[1-9]|1\d|2\d|3[0-1])$"
        value={date.days}
        placeHolder="DD"
        onChange={(e) => {
          setDate({ ...date, days: e.target.value });
        }}
      />
      <DateInput
        id="month"
        pattern="^(0[1-9]|1[0-2])$"
        value={date.months}
        placeHolder="MM"
        onChange={(e) => setDate({ ...date, months: e.target.value })}
      />
      <DateInput
        id="year"
        pattern="^(1\d{3}|20([0-1]\d|2[0-3]))$"
        value={date.years}
        placeHolder="YYYY"
        onChange={(e) => setDate({ ...date, years: e.target.value })}
      />
    </div>
  );
});

const DateInput = ({
  id,
  pattern,
  value,
  placeHolder,
  onChange,
}: {
  id: string;
  pattern: string;
  value: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="input__date__item">
      <label htmlFor={id}>{id.toUpperCase()}</label>
      <input
        id={id}
        name={id}
        type="text"
        inputMode="numeric"
        placeholder={placeHolder}
        pattern={pattern}
        value={value}
        onChange={(e) => {
          if (!e.target.checkValidity()) {
            e.target.setCustomValidity("");
            e.target.reportValidity();
          }
          onChange(e);
        }}
        required
      />
      <p className={`${id}__error`}></p>
    </div>
  );
};

export default DateInputs;
