import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview } from "./helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    console.log("day=", day);
    setState((prev) => ({ ...prev, day }));
  };

  // const setAppointments = (appointments) =>
  //   setState((prev) => ({ ...prev, appointments }));

  useEffect(() => {
    const firstURL = `api/days`;
    const secondURL = `api/appointments`;
    const thirdURL = `api/interviewers`;

    Promise.all([
      axios.get(firstURL),
      axios.get(secondURL),
      axios.get(thirdURL),
    ]).then((all) => {
      // console.log("all", all);
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => {
        return { ...prev, days, appointments, interviewers };
      });
    });
  }, []);


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointListItems = dailyAppointments.map((appt) => {
    const interview = getInterview(state, appt.interview);
    return (
      <Appointment
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={appt.interview}
      />);
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointListItems}</section>
    </main>
  );
}

