const appointmentsData = [
    {
      _id: "1",
      doctor: { _id: "d1", name: "Dr. John Doe" },
      patient: { _id: "p1", name: "John Smith" },
      date: "2024-07-01T09:00:00Z",
      time: "09:00 AM",
      status: "completed",
    },
    {
      _id: "2",
      doctor: { _id: "d2", name: "Dr. Jane Smith" },
      patient: { _id: "p1", name: "John Smith" },
      date: "2024-07-05T11:00:00Z",
      time: "11:00 AM",
      status: "scheduled",
    },
    {
      _id: "3",
      doctor: { _id: "d3", name: "Dr. Michael Brown" },
      patient: { _id: "p1", name: "John Smith" },
      date: "2024-07-10T14:00:00Z",
      time: "02:00 PM",
      status: "scheduled",
    },
    {
      _id: "4",
      doctor: { _id: "d4", name: "Dr. Emily Davis" },
      patient: { _id: "p1", name: "John Smith" },
      date: "2024-07-15T16:00:00Z",
      time: "04:00 PM",
      status: "scheduled",
    },
    {
      _id: "5",
      doctor: { _id: "d5", name: "Dr. Sarah Wilson" },
      patient: { _id: "p1", name: "John Smith" },
      date: "2024-07-20T10:00:00Z",
      time: "10:00 AM",
      status: "canceled",
    },
  ];
  
  export default appointmentsData;
  