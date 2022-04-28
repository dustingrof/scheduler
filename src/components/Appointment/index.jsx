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
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const CREATE = "CREATE";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    // console.log('props', props);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));

  }
  function edit(name, interviewer) {
    // console.log('props', props);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.editInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));

  }
  function deleet(id) {
    // const interview = null;
    transition(DELETING, true);
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* {console.log('props from index', props)} */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save} />
      }
      {mode === CONFIRM && <Confirm onConfirm={deleet} onCancel={() => transition(SHOW)} />}
      {mode === SAVING && <Status message={"Saving.."} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={() => back()} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment"} onClose={() => back()} />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={edit}
          edit={"True"}
        />
      )}
    </article>
  );
}
