import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";

import useVisualMode from "components/hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const STATUS = "STATUS";
const ERROR = "ERROR";
const EDIT = "EDIT";
const CREATE = "CREATE";

// (
//   <Show
//     student={props.interview.student}
//     interviewer={props.interview.interviewer}
//     onEdit={props.onEdit}
//     onDelete={props.onDelete}
//     time={props.time}
//   />
// );
// (
//   <Empty onClick={props.onAdd} />
// )



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log('index.js props', props);
  // console.log('props.interviewers', props.interviewers);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(STATUS);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }
  function deleet(id) {
    // const interview = null;
    transition(STATUS);
    props.deleteInterview(props.id);
    transition(EMPTY);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {console.log('props from index', props)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}

          onSave={save} />
      }
      {mode === CONFIRM && <Confirm onConfirm={deleet} onCancel={() => transition(SHOW)} />}
      {mode === STATUS && <Status />}
      {mode === ERROR && <Error />}
      {mode === EDIT && <Form />}
    </article>
  );
}
