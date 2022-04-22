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
