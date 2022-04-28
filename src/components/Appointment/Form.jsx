import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // to reset the form to empty fields
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  //to cancel the creation/edit of an interview 
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // make sure form fields are selected, set error if empty
  function validate(e) {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <form autoComplete="off" onSubmit={(event) => {
        validate(event); // validate the form submission
        event.preventDefault(); // prevent page refresh
      }} >
        <section className="appointment__card-left">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />

          <section className="appointment__validation">{error}</section>

          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
        </section>

        <section className="appointment__card-right">
          <section className="appointment__actions">

            <Button danger onClick={cancel}>
              Cancel
            </Button>

            <Button confirm type={"submit"} >
              Save
            </Button>

          </section>
        </section>
      </form>
    </main >
  );
}
