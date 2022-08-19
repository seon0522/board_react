import useFetch from "../hooks/useFetch";
import { Card } from "./Card";
import "../css/list.scss";

export function CardList() {
  const url = `http://localhost:5000/cards`;

  const cards = useFetch(url);
  return (
    <div className="boardList-wrapper">
      <div className="boardList-header">전체 게시물</div>
      <div className="boardList-body">
        {cards
          .slice(0)
          .reverse()
          .map((card) => {
            return <Card key={card.id} card={card} />;
          })}
      </div>
    </div>
  );
}
