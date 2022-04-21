import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          time={props.time}
        />
      ) : (
        <Empty onClick={props.onAdd} />
      )}
      {/* {props.time ? `Appointment at ${props.time}` : "No Appointments"} */}
    </article>
  );
}
