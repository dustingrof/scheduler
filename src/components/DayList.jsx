import React from "react";
import DayListItem from "./DayListItem.jsx";

// import classNames from "classnames";

export default function DayList(props) {
  const calDays = props.days;
  const listItems = calDays.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));
  return <ul>{listItems}</ul>;
}
