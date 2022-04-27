import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    " interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerClass}
      id={props.id}
      onClick={() => props.setInterviewer(props.id)}
      selected={props.value}>
      <img
        src={props.avatar}
        alt={props.name}
        className="interviewers__item-image"
      />
      {(props.selected && props.name)}
    </li>
  );
}
