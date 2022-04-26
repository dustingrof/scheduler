import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment/index';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from './helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => {
    console.log('day=', day);
    setState(prev => ({ ...prev, day }));
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
    ]).then(all => {
      // console.log("all", all);
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => {
        return { ...prev, days, appointments, interviewers };
      });
    });
  }, []);

  function bookInterview(id, interview) {
    console.log('LOOK HERE', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });
    // console.log('appointment.interview', appointment.interview);
    axios
      .put(`/api/appointments/${id}`, {
        interview: appointment.interview,
      })
      .then(response => {
        // console.log('response', response);
        setState(prev => {
          return { ...prev, appointment };
        });
      });
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });
    axios.delete(`/api/appointments/${id}`).then(response => {
      // console.log('response', response);
      setState(prev => {
        return { ...prev, appointment };
      });
    });
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointListItems = dailyAppointments.map(appointmentItem => {
    const dailyInterviewers = getInterviewersForDay(state, state.day);
    // console.log('dailyInterviewers', dailyInterviewers);
    const interview = getInterview(state, appointmentItem.interview);
    console.log('interview', interview);
    return (
      <Appointment
        key={appointmentItem.id}
        id={appointmentItem.id}
        time={appointmentItem.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    );
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>{appointListItems}</section>
    </main>
  );
}
