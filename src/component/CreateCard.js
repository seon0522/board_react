import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/create.scss";
import TextArea from "./TextArea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import useFetch from "../hooks/useFetch";

export function CreateCard() {
  const url = `http://localhost:5000/cards`;

  const cards = useFetch(url);
  const navigate = useNavigate();

  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [image, setImage] = useState({
  //   image_file: "",
  //   preview_URL: "img/default_img.png",
  // });

  const canSubmit = useCallback(() => {
    return content !== "" && title !== "";
  }, [title, content]);

  //

  const handleSubmit = useCallback(async () => {
    const date = new Date();
    const today =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log(today);

    await fetch("http://localhost:5000/cards", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: cards.length + 1,
        title: title,
        content: content,
        date: today,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.alert("등록이 완료되었습니다");
        navigate("/");
      })
      .catch(() => {
        // 서버에서 받은 에러 메시지 출력
        toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다😭", {
          position: "top-center",
        });
      });
  }, [canSubmit]);

  return (
    <div className="addBoard-wrapper">
      <div className="addBoard-header">게시물 등록하기</div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            등록하기😃
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            제목과 내용을 모두 입력하세요😭
          </Button>
        )}
      </div>
      <div className="addBoard-body">
        <TextArea
          setTitle={setTitle}
          setContent={setContent}
          title={title}
          content={content}
        />
      </div>
    </div>
  );
}
