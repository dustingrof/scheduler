import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, {
        interview: appointment.interview,
      })
      .then(response => {
        setState(prev => {
          return { ...prev, appointments };
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

    return axios.delete(`/api/appointments/${id}`).then(response => {
      setState(prev => {
        return { ...prev, appointments };
      });
    });
  }

  return { state, setDay, bookInterview, deleteInterview };
}
