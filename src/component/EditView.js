import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TextArea from "./TextArea";

export function EditView() {
  const navigate = useNavigate();
  // URI 파라미터 가져오기
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/cards/${id}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setTitle(result.title);
        setContent(result.content);
      });
  }, []);

  const canSubmit = useCallback(() => {
    return content !== "" && title !== "";
  }, [title, content]);

  const handleSubmit = useCallback(async () => {
    await fetch(`http://localhost:5000/cards/${id}`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: title,
        content: content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("수정이 완료되었습니다");
        navigate("/");
        window.location.href = `/view/${id}`;
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
      <div className="addBoard-header">게시물 수정하기 🖊️</div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            수정하기😃
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
