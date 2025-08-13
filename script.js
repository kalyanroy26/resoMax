const url = 'https://689c83b058a27b18087e7bcf.mockapi.io/bookings'
const trips = [
    {
        id: 1,
        title: "Golden Triangle Tour",
        description: "A classic introduction to India's rich history and culture. This tour covers the historical wonders of Delhi, the timeless beauty of the Taj Mahal in Agra, and the royal heritage of Jaipur.",
        price: 25000,
        duration: "6 days, 5 nights",
        image: "https://images.pexels.com/photos/62348/pexels-photo-62348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
        id: 2,
        title: "Kerala Backwaters & Beaches",
        description: "Experience the tranquil beauty of 'God's Own Country.' This trip includes a houseboat cruise on the serene backwaters of Alleppey, and relaxing on the beautiful beaches of Kovalam.",
        price: 18000,
        duration: "5 days, 4 nights",
        image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 3,
        title: "Goa Beach & Party Getaway",
        description: "A perfect vacation for sun, sand, and fun. Explore the vibrant beaches of North and South Goa, indulge in water sports, and enjoy the lively nightlife and delicious seafood.",
        price: 12000,
        duration: "4 days, 3 nights",
        image: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 4,
        title: "Himalayan Trekking Adventure",
        description: "Embark on an unforgettable trekking journey in the Himalayas. This package is for adventure seekers, offering stunning mountain views, lush green valleys, and a close encounter with nature.",
        price: 15000,
        duration: "7 days, 6 nights",
        image: "https://images.pexels.com/photos/3286562/pexels-photo-3286562.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 5,
        title: "Royal Rajasthan Desert Safari",
        description: "Live like a Maharaja and explore the magnificent forts and palaces of Rajasthan. The highlight of this trip is a thrilling camel safari and a night under the stars in the Thar Desert.",
        price: 22000,
        duration: "5 days, 4 nights",
        image: "https://images.pexels.com/photos/10099968/pexels-photo-10099968.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
        id: 6,
        title: "Spiritual Journey to Varanasi",
        description: "A deep dive into India's spiritual heart. Witness the ancient rituals along the Ganges River, take a boat ride at sunrise, and experience the unique culture of one of the world's oldest living cities.",
        price: 10000,
        duration: "3 days, 2 nights",
        image: "https://images.pexels.com/photos/8112557/pexels-photo-8112557.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
];

let renderTrips = () => {

    let container = document.getElementById('trips_container')
    if (!container) return

    container.innerHTML = ''

    trips.forEach(trip => {
        container.innerHTML += `
                    <div class="py-3 trip_card rounded-3 align-items-center justify-content-between col-12 col-md-5 d-flex flex-column">
                    <div class="col-11 mb-3 mb-md-0">
                        <img src="${trip.image}" alt="${trip.title}" class="img-fluid rounded-3" />
                    </div>
                    <div class="details col-11 gap-2">
                        <span class="fs-3 fw-medium">${trip.title}</span>
                        <span class="fs-5"><span class="fw-medium">Duration:</span> ${trip.duration}</span>
                        <span class="fs-5"><span class="fw-medium">Price: </span>₹${trip.price}/- only</span>
                        <button class="btn btn-dark fs-5 px-5 align-self-end" onclick="getTripDetails(${trip.id})">Book</button>
                    </div>
                    </div>
                        `;
    });

}

// get trip details 
let getTripDetails = (tripId) => {
    let trip = trips.find(item => item.id === tripId)
    if (!trip) {
        alert("Trip not found");
        return;
    }
    window.localStorage.setItem('trip_details', JSON.stringify(trip))
    window.location.href = "./pages/booking.html";
}

// check availability of vans
let checkAvailability = () => {
    let date = document.getElementById('date').value;
    let username = document.getElementById('username').value;

    let bookingsByDate = JSON.parse(window.localStorage.getItem('available_vans')) || {};

    if (!bookingsByDate[date]) {
        bookingsByDate[date] = { vanCount: 0 };
    }

    if (bookingsByDate[date].vanCount < 5) {
        bookingsByDate[date].vanCount++;
        alert("Van is available");

        window.localStorage.setItem('available_vans', JSON.stringify(bookingsByDate));

        let tripDetails = JSON.parse(window.localStorage.getItem('trip_details'));
        
        let data = {
            "tripName": tripDetails.title,
            "user": username,
            "date": date,
            "status": "success"
        };

        window.localStorage.setItem('bookingDetails', JSON.stringify(data));
    } 
    else {
        alert("No vans available for the selected date. Please choose another date.");
    }
};


document.addEventListener('DOMContentLoaded', function () {
    const bookingContainer = document.getElementById('booking_container');
    let tripDetails = JSON.parse(window.localStorage.getItem('trip_details'));
    
    if (!bookingContainer) return;

    bookingContainer.innerHTML = ''

    bookingContainer.innerHTML += `
     <div
          class="passenger_info col-12 col-md-6 rounded-3 p-3 d-flex flex-column gap-3"
        >
          <span class="fs-1 ms-1 fw-bold text-center"
            >Trip Details</span>
        
            <div class="trip_details">
                <span class="fs-3 fw-medium text-decoration-underline">Selected Trip</span>
                <div class="py-3 border border-1 px-2 rounded-3 align-items-center justify-content-between col-12 d-flex flex-column flex-md-row mt-3">
                <div class="col-12 col-md-4 p-0">
                    <img src="${tripDetails.image}" alt="Golden Triangle Tour" class="img-fluid rounded-3">
                </div>
                <div class="details col-12 col-md-7">
                    <span class="fs-3 fw-medium my-2">${tripDetails.title}</span>
                    <span class="fs-5"><span class="fw-medium">Duration: </span>${tripDetails.duration}</span>
                </div>
            </div>


            </div>

          <div class="d-flex flex-column gap-4">
            <span class="fs-3 fw-medium text-decoration-underline my-2"
              >Booking Details</span
            >
            <span class="contact_details"
              ><i class="fi fi-rr-phone-call"></i>
              <input
                type="text"
                name="name"
                id="username"
                placeholder="Enter Username"
            /></span>

            <span class="contact_details"
              ><i class="fi fi-rr-calendar"></i>
              <input
                type="date"
                name="date"
                id="date"
                placeholder="choose date"
            /></span>

          </div>
          <button onclick=checkAvailability() class="btn btn-dark py-3">Check Availability</button>

        </div>

        <div
          class="fare_details col-12 col-md-5 rounded-3 pt-2 d-flex flex-column justify-content-evenly"
        >
          <div class="border-bottom mb-3 pb-4">
            <span class="fs-4 text-decoration-underline fw-bold px-2"
              >Payment Details </span
            >

            <div class="d-flex justify-content-between px-2 fs-5 mt-2">
              <span>Subtotal</span>
              <span class="fw-medium">₹ ${tripDetails.price}</span>
            </div>

            <div class="d-flex justify-content-between px-2 fs-5">
              <span>GST</span>
              <span class="fw-medium">₹ ${(tripDetails.price * 0.05).toFixed(2)}</span>
            </div>
          </div>

          <div class="d-flex justify-content-between px-2 fs-5 pb-3">
            <span class="fs-4 fw-bold">Total</span>
            <span class="fw-medium">₹ ${(tripDetails.price * 1.05).toFixed(2)}</span>
          </div>

          <div class="d-flex flex-column justify-content-between px-2 fs-5 pb-3 mt-3">
            <span class="fw-bold fs-4 mb-1">Choose Payment Mode:</span>
            <div>
              <select class="form-select" aria-label="Default select example">
              <option value="credit">Credit Card</option>
                <option value="upi">UPI App</option>
                <option value="debit">Debit Card</option>
              </select>

               <div class="d-flex flex-column rounded-2 fs-5 ms-3 ">
                <br />

                <div class="row gy-3 border border-1 rounded-1 p-3">
                  <div class="col-12 col-lg-6">
                    <label for="cc-name" class="form-label">Name on card</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cc-name"
                      placeholder=""
                      required=""
                    />
                    <div class="invalid-feedback">Name on card is required</div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <label for="cc-number" class="form-label"
                      >Credit card number</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="cc-number"
                      placeholder=""
                    />
                  </div>
                  <div class="col-12 col-lg-6">
                    <label for="cc-expiration" class="form-label"
                      >Expiration</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <div class=" col-4 col-md-3">
                    <label for="cc-cvv" class="form-label">CVV</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cc-cvv"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header d-flex align-items-center">
                  <h1 class="modal-title fs-2 text-center" id="exampleModalLabel">
                    <img src="../assets/icons/check.png" alt="check" height="40" class="me-1">
                    Confirmation
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                    <div class="col-12 d-flex flex-column align-items-center justify-content-center">
                        <img src="../assets/illustrations/confirmed.png" alt="Success" height="300">
                        <span class="fs-2 fw-medium text-center">Booking Successfull..</span>
                    </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick = exit()
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            class="rounded-2 cb_btn p-3 mb-2 align-self-sm-end align-self-center"
            id="cb_btn"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick = saveBooking()
          >
            Make Payment
          </button>
        </div>    
    `

})

let exit = ()=>{
    window.location.href = '../index.html'
}

let saveBooking = async ()=>{    
    let bookingDetails = JSON.parse(window.localStorage.getItem('bookingDetails'))
    console.log(bookingDetails);
    
    try {
        const res = await axios.post(url,bookingDetails)
    } catch (error) {
        console.log("Error: ",error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
  const navToggler = document.querySelector(".navbar-toggler");
  const mobileMenu = document.getElementById("mobileMenu");

  navToggler.addEventListener("click", function () {
    mobileMenu.classList.toggle("d-none");
  });
});


renderTrips();
