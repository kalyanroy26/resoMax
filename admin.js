const url = 'https://689c83b058a27b18087e7bcf.mockapi.io/bookings'

let getBookings = async()=>{
  const res = await axios.get(url);
  const tableBody = document.getElementById("booking-list");
  res.data.forEach(b => {
    tableBody.innerHTML += `
      <tr>
        <td>${b.tripName}</td>
        <td>${b.user}</td>
        <td>${b.date}</td>
        <td>${b.status}</td>
      </tr>
    `;
  });
}

getBookings();
