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
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => {
        return { ...prev, days, appointments, interviewers };
      });
    });
  }, []);

  const remainingSpots = (appointmentId, booked) => {
    for (const day of state.days) {
      if (day.appointments.includes(appointmentId)) {
        const newSpots = booked ? day.spots - 1 : day.spots + 1;
        const newDay = { ...day, spots: newSpots };
        const newDays = state.days.map(day =>
          day.id === newDay.id ? newDay : day
        );
        setState(prev => {
          return { ...prev, days: newDays };
        });
      }
    }
  };

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
        remainingSpots(id, true);
      });
  }
  /** TO DO: figure out a way to fix the spots count without duplicating this code */
  // created to fix bug that caused spots remaining to update on edit. 
  // excluded the function from this bit
  function editInterview(id, interview) {
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
      remainingSpots(id, false);
    });
  }

  return { state, setDay, bookInterview, deleteInterview, editInterview };
}
