import iconArrow from "/images/icon-arrow.svg";
import "./SubmitBtn.css";

const SubmitBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="input__btn__item">
      <button type="button" onClick={onClick}>
        <img src={iconArrow} alt="arrow icon" />
      </button>
    </div>
  );
};

export default SubmitBtn;
