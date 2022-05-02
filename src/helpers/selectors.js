export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const dayObj = state.days.find(d => d.name === day);
  if (dayObj === undefined || state.days.length === 0) {
    return [];
  };
  for (const id of dayObj.appointments) {
    const appoint = state.appointments[id];
    appointments.push(appoint);
  }
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const interviewers = [];
  const dayObj = state.days.find(d => d.name === day);
  if (dayObj === undefined || state.days.length === 0) {
    return [];
  };
  for (const id of dayObj.interviewers) {
    const appoint = state.interviewers[id];
    interviewers.push(appoint);
  }
  return interviewers;
}


export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewer = state.interviewers[interview.interviewer];

  const newObj = { ...interview, interviewer };
  return newObj;
};