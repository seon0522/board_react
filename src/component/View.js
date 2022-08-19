import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../css/view.scss";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
export function View() {
  let default_img = require("../img/default_img.png");
  const { id } = useParams();
  // const { title, content, date } = useLocation().state;
  const [view, SetView] = useState({});
  // const url = `http://localhost:5000/cards?id=${id}`;
  const [show, setShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/cards/${id}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => SetView(result))
      .then(() => setIsLoaded(true));
  }, []);

  function del() {
    fetch(`http://localhost:5000/cards/${id}`, {
      method: `DELETE`,
    }).then((res) => {
      if (res.ok) {
        alert("게시물이 삭제되었습니다");
        window.location.href = "/";
      }
    });

    if (id === 0) return null;
  }

  // const view = useFetch(url);

  return (
    <React.Fragment>
      {/* {isLoaded &&  (*/}
      <div className="board-wrapper">
        <div className="board-header">
          <div className="board-header-date">{view.date}</div>
        </div>
        <hr />
        <div className="board-body">
          <div className="board-image">
            <img src={default_img} />
          </div>
          <div className="board-title-content">
            <div className="board-title">{view.title}</div>
            <div className="board-content">{view.content}</div>
          </div>
        </div>
        <hr />
        {
          <div className="edit-delete-button">
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteForeverOutlinedIcon />}
              className="delete-button"
              onClick={() => {
                setShow(true);
              }}
            >
              삭제
            </Button>
            <Button
              variant="outlined"
              endIcon={<BuildOutlinedIcon />}
              onClick={() => {
                navigate(`/edit_view/${id}`);
              }}
            >
              수정
            </Button>
          </div>
        }
        <div className="board-footer"></div>
      </div>
      {/* } */}
      {/*modal*/}
      <Dialog open={show}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setShow(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className="modal">
            <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
            <div className="modal-button">
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  setShow(false);
                  del();
                }}
              >
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShow(false);
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
