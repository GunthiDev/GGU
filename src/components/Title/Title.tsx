import "./Title.scss";

const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="title-container">
      <h2>{title}</h2>
      <hr className="inner" />
    </div>
  );
};

export default Title;
