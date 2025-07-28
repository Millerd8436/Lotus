// A simple logger for capturing experimental data.
// In a real application, this would send data to a backend API.

interface EventData {
  [key: string]: any;
}

export const logEvent = (eventName: string, data: EventData) => {
  const timestamp = new Date().toISOString();
  console.log(`[LOTUS_EVENT] ${timestamp} - ${eventName}`, data);
}; 