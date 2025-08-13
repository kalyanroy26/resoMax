const url = 'https://689c83b058a27b18087e7bcf.mockapi.io/bookings'
const trips = [
    {
        id: 1,
        title: "Golden Triangle Tour",
        description: "A classic introduction to India's rich history and culture. This tour covers the historical wonders of Delhi, the timeless beauty of the Taj Mahal in Agra, and the royal heritage of Jaipur.",
        price: {
            amount: 25000,
            currency: "INR"
        },
        duration: "6 days, 5 nights",
        image: "https://images.pexels.com/photos/62348/pexels-photo-62348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 2,
        title: "Kerala Backwaters & Beaches",
        description: "Experience the tranquil beauty of 'God's Own Country.' This trip includes a houseboat cruise on the serene backwaters of Alleppey, and relaxing on the beautiful beaches of Kovalam.",
        price: {
            amount: 18000,
            currency: "INR"
        },
        duration: "5 days, 4 nights",
        image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 3,
        title: "Goa Beach & Party Getaway",
        description: "A perfect vacation for sun, sand, and fun. Explore the vibrant beaches of North and South Goa, indulge in water sports, and enjoy the lively nightlife and delicious seafood.",
        price: {
            amount: 12000,
            currency: "INR"
        },
        duration: "4 days, 3 nights",
        image: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 4,
        title: "Himalayan Trekking Adventure",
        description: "Embark on an unforgettable trekking journey in the Himalayas. This package is for adventure seekers, offering stunning mountain views, lush green valleys, and a close encounter with nature.",
        price: {
            amount: 15000,
            currency: "INR"
        },
        duration: "7 days, 6 nights",
        image: "https://images.pexels.com/photos/3286562/pexels-photo-3286562.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 5,
        title: "Royal Rajasthan Desert Safari",
        description: "Live like a Maharaja and explore the magnificent forts and palaces of Rajasthan. The highlight of this trip is a thrilling camel safari and a night under the stars in the Thar Desert.",
        price: {
            amount: 22000,
            currency: "INR"
        },
        duration: "5 days, 4 nights",
        image: "https://images.pexels.com/photos/10099968/pexels-photo-10099968.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 6,
        title: "Spiritual Journey to Varanasi",
        description: "A deep dive into India's spiritual heart. Witness the ancient rituals along the Ganges River, take a boat ride at sunrise, and experience the unique culture of one of the world's oldest living cities.",
        price: {
            amount: 10000,
            currency: "INR"
        },
        duration: "3 days, 2 nights",
        image: "https://images.pexels.com/photos/8112557/pexels-photo-8112557.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
];

let renderTrips = () => {

    let container = document.getElementById('trips_container')

    container.innerHTML = ''

    trips.forEach(trip => {
        container.innerHTML += `
                    <div class="py-3 trip_card rounded-3 align-items-center justify-content-between col-12 col-md-4 d-flex flex-column">
                    <div class="col-11 mb-3 mb-md-0">
                        <img src="${trip.image}" alt="${trip.title}" class="img-fluid rounded-3" />
                    </div>
                    <div class="details col-11">
                        <span class="fs-3 fw-medium">${trip.title}</span>
                        <span class="fs-5"><span class="fw-medium">Duration:</span> ${trip.duration}</span>
                        <span class="fs-5"><span class="fw-medium">Price: </span>₹${trip.price.amount}/- only</span>
                        <input type="date" class="form-control my-2" id="date-${trip.id}">

                        <button class="btn btn-dark fs-5 align-self-end" onclick="checkAvailability(${trip.id})">Check Availability</button>
                    </div>
                    </div>
                        `;
    });

}


async function checkAvailability(tripId) {
  const date = document.getElementById(`date-${tripId}`).value;
  if (!date) return alert("Please select a date");

  const res = await axios.get(url);
  const bookings = res.data.filter(b => b.date === date);

  if (bookings.length >= 5) {
    alert("No vans available for the selected date. Please choose another date.");
  } else {
    const userName = prompt("Enter your name:");
    await axios.post(url, {
      tripId,
      tripName: trips.find(t => t.id === tripId).title,
      user: userName,
      date,
      status: "Confirmed"
    });
    alert("Booking Confirmed! Payment Successful.");
  }
}

renderTrips();
