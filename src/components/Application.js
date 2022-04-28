import React from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment/index';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from './helpers/selectors';
import useApplicationData from './hooks/useApplicationData';

export default function Application(props) {
  const { state, setDay, bookInterview, deleteInterview, editInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointListItems = dailyAppointments.map(appointmentItem => {
    const dailyInterviewers = getInterviewersForDay(state, state.day);
    const interview = getInterview(state, appointmentItem.interview);
    return (
      <Appointment
        key={appointmentItem.id}
        id={appointmentItem.id}
        time={appointmentItem.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        editInterview={editInterview}
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
      <section className='schedule'>
        {appointListItems}
        <Appointment key='last' time={'5pm'} />
      </section>
    </main>
  );
}
