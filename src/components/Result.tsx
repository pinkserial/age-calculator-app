import "./Result.css";

const Result = ({
  years,
  months,
  days,
}: {
  years: string;
  months: string;
  days: string;
}) => {
  return (
    <div className="result">
      <p>
        <strong>{years}</strong>years
      </p>
      <p>
        <strong>{months}</strong>months
      </p>
      <p>
        <strong>{days}</strong>days
      </p>
    </div>
  );
};

export default Result;
