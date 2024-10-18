import React from "react";
import "../modal/Modal.css";

export default function Modal({ user, handleClose }) {
  console.log(user);
  return (
    <div id="modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" onClick={() => handleClose()}>
            &times;
          </span>
          <h2 id="modal_title">User Nr. {user.id}</h2>
        </div>
        <div class="modal-body">
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.phone}</p>
          <p>{user.email}</p>
          <p>{user.company.name}</p>
        </div>
      </div>
    </div>
  );
}
