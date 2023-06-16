import { useRef, useState } from "react";
import Result from "./components/Result";
import DateInputs from "./components/DateInputs";
import SubmitBtn from "./components/SubmitBtn";
import SimpleDate from "./types/date";
import "./App.css";
import { DayError, MonthError, YearError } from "./errors";

function checkValiditySimpleDate(simpleDate: SimpleDate): Date {
  const { years, months, days } = simpleDate;
  const date = new Date(`${years}/${months}/${days}`);

  if (
    date.getFullYear() !== parseInt(years) ||
    date.getMonth() !== parseInt(months) - 1 ||
    date.getDate() !== parseInt(days)
  ) {
    throw new DayError("The day is invalid.");
  }

  const currentDate = new Date(Date.now());

  // Check the date is future.
  if (date > currentDate) {
    if (date.getFullYear() !== currentDate.getFullYear()) {
      throw new YearError("The year is future.");
    }

    if (date.getMonth() !== currentDate.getMonth()) {
      throw new MonthError("The month is future.");
    }

    if (date.getDate() !== currentDate.getDate()) {
      throw new DayError("The date is future.");
    }
  }

  return date;
}

function calculateMilliseconds(ms: number): SimpleDate {
  const elapsedDays = Math.floor(ms / (24 * 60 * 60 * 1000));
  const elapsedMonths = Math.floor(elapsedDays / 30);

  return {
    years: Math.floor(elapsedMonths / 12).toString(),
    months: (elapsedMonths % 12).toString(),
    days: (elapsedDays % 30).toString(),
  };
}

const App = () => {
  const [date, setDate] = useState<SimpleDate>({
    years: "",
    months: "",
    days: "",
  });
  const [result, setResult] = useState<SimpleDate>({
    years: "- -",
    months: "- -",
    days: "- -",
  });
  const inputsRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    try {
      const inputDate = checkValiditySimpleDate(date);
      const elapsedTime = Date.now() - inputDate.getTime();
      console.log(inputDate, elapsedTime);
      setResult(calculateMilliseconds(elapsedTime));
    } catch (err) {
      console.error(err);

      if (err instanceof Error && inputsRef.current) {
        let input: HTMLInputElement | null;

        if (err instanceof YearError) {
          input = inputsRef.current?.querySelector<HTMLInputElement>("#year");
        } else if (err instanceof MonthError) {
          input = inputsRef.current?.querySelector<HTMLInputElement>("#month");
        } else {
          input = inputsRef.current?.querySelector<HTMLInputElement>("#day");
        }

        input?.setCustomValidity(err.message);
        input?.reportValidity();
      }
    }
  };

  return (
    <main>
      <form>
        <DateInputs date={date} setDate={setDate} ref={inputsRef} />
        <SubmitBtn onClick={handleClick} />
      </form>
      <Result years={result.years} months={result.months} days={result.days} />
    </main>
  );
};

export default App;
