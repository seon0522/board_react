import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/card.scss";

export const Card = (props) => {
  let default_img = require("../img/default_img.png");
  const navigate = useNavigate();
  const [card, setCard] = useState(props.card);

  // const handleImgError = (e) => {
  //   e.target.src = default_img;
  // };

  return (
    <div
      className="card-wrapper"
      onClick={() => {
        navigate(`/view/${card.id}`, {
          state: { title: card.title, content: card.content, date: card.date },
        });
      }}
    >
      <div className="card-body-img">
        <img src={default_img} />
      </div>
      <div className="card-body-text">
        <div className="card-body-text-title">{card.title}</div>
        <div className="card-body-text-content">{card.content}</div>
      </div>

      <div className="card-footer">
        {/* <div className="username">{username}</div> */}
        <div className="date">{card.date}</div>
      </div>
    </div>
  );
};
