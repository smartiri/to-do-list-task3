import { React, useEffect, useState } from "react";
import "../userList/UserList.css";
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, [reload]);

  useEffect(() => {
    if (id) {
      fetch("https://jsonplaceholder.typicode.com/users/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserDetail(data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div className="card">
      <button type="button" onClick={() => setReload(true)}>
        Reload
      </button>
      {!(userDetail && id) ? (
        <div></div>
      ) : (
        <div
          key={userDetail.id}
          style={{ border: "1px solid #7b4397", padding: "2%" }}
        >
          <p>{userDetail.id}</p>
          <p>{userDetail.name}</p>
          <p>{userDetail.username}</p>
          <p>{userDetail.phone}</p>
          <p>{userDetail.email}</p>
          <p>{userDetail.company.name}</p>
          <button type="button" onClick={() => setUserDetail(null)}>
            Close
          </button>
        </div>
      )}
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.company.name}</p>
            <button
              type="button"
              onClick={() => {
                setId(user.id);
              }}
            >
              Show Details
            </button>
          </div>
        );
      })}
    </div>
  );
}
