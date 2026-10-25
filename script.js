// Registered travelers

let travelersList = [];
// Display registered travelers in table

function displayTravelers() {

    const tableBody =
        document.getElementById("travelerTableBody");

    tableBody.innerHTML = "";

    travelersList.forEach(function(traveler, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${traveler.name}</td>

            <td>${traveler.email}</td>

            <td>${traveler.location}</td>

            <td>
                <button
                    class="edit-btn"
                    onclick="updateLocation(${index})">
                    Edit Location
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTraveler(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}
// Delete traveler

function deleteTraveler(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this traveler?");

    if (confirmDelete) {

        travelersList.splice(index, 1);

        displayTravelers();
    }
}
// Update traveler location

function updateLocation(index) {

    const newLocation =
        prompt(
            "Enter the new location:",
            travelersList[index].location
        );

    if (newLocation !== null && newLocation.trim() !== "") {

        travelersList[index].location =
            newLocation.trim();

        displayTravelers();
    }
}
// Destination prices per person

const destinationPrices = {
    Goa: 8999,
    Manali: 11999,
    Jaipur: 7999,
    Kerala: 10999,
    Mumbai: 5999,
    Delhi: 6999,
    Udaipur: 9499,
    Rishikesh: 8499,
    Andaman: 14999,
    Dubai: 18999,
    Bali: 12999,
    Maldives: 21999
};


// Travel type additional charges

const travelCharges = {
    Flight: 3000,
    Train: 1000,
    Bus: 500
};


const destinationItineraries = {
    Goa: [
        "Relax on Calangute Beach, explore Fort Aguada, and enjoy a sunset by the sea.",
        "Visit Old Goa's historic churches, browse Panaji's Latin Quarter, and try local cuisine.",
        "Spend the day at a South Goa beach, then finish with a quiet evening at Colva."
    ],
    Manali: [
        "Explore Hadimba Temple and Old Manali, then enjoy the riverside cafés.",
        "Take a day trip to Solang Valley for mountain views and outdoor activities.",
        "Visit Vashisht hot springs and stroll through the Manali market."
    ],
    Jaipur: [
        "Visit Amber Fort and Hawa Mahal, then explore the City Palace.",
        "See Jantar Mantar and shop for crafts and textiles in the old city bazaars.",
        "Discover Jaigarh Fort and Nahargarh Fort, with sunset views over Jaipur."
    ],
    Kerala: [
        "Cruise the Alleppey backwaters and settle into a traditional houseboat.",
        "Explore Fort Kochi's heritage streets, waterfront, and local cafés.",
        "Visit a tea garden or spice plantation and enjoy Kerala's lush scenery."
    ],
    Mumbai: [
        "See the Gateway of India and take a heritage walk around Colaba.",
        "Visit Elephanta Caves or explore the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya.",
        "Walk Marine Drive, explore Bandra, and enjoy the city's evening food scene."
    ],
    Delhi: [
        "Explore Old Delhi, including Jama Masjid, Chandni Chowk, and the Red Fort.",
        "Visit Humayun's Tomb, India Gate, and the museums around central Delhi.",
        "See Qutub Minar and Lotus Temple, then browse a local market."
    ],
    Udaipur: [
        "Tour the City Palace and take a relaxed boat ride on Lake Pichola.",
        "Visit Jagdish Temple and Saheliyon-ki-Bari, then explore the old city's lanes.",
        "See Sajjangarh Monsoon Palace and enjoy a lakeside sunset."
    ],
    Rishikesh: [
        "Visit the riverside ghats and attend the evening Ganga Aarti at Triveni Ghat.",
        "Walk across the Lakshman Jhula area and explore nearby cafés and ashrams.",
        "Choose a guided river-rafting trip or spend a peaceful day by the Ganga."
    ],
    Andaman: [
        "Arrive in Port Blair and visit the Cellular Jail and its evening light show.",
        "Take a ferry to Havelock Island and relax at Radhanagar Beach.",
        "Explore the island's beaches and coral reefs on a guided snorkeling trip."
    ],
    Dubai: [
        "Visit Burj Khalifa, Dubai Mall, and the Dubai Fountain, then enjoy an evening desert safari.",
        "Walk around Dubai Marina, see Palm Jumeirah, and take a dinner cruise.",
        "Explore Old Dubai, ride an abra across the Creek, and browse the traditional souks."
    ],
    Bali: [
        "Explore Ubud's art market and Sacred Monkey Forest, then visit a nearby rice terrace.",
        "Visit a traditional temple and enjoy an afternoon at a beach in southern Bali.",
        "Take a coastal day trip to Uluwatu Temple and watch the sunset."
    ],
    Maldives: [
        "Arrive at your island resort and unwind by the lagoon or on the beach.",
        "Join a guided snorkeling excursion to explore the house reef and marine life.",
        "Enjoy a boat trip, a sandbank visit, and a relaxed final evening by the water."
    ]
};

// Show the itinerary for the selected destination

function renderItinerary(destination) {

    const itinerarySection =
        document.getElementById("itinerarySection");
    const itinerary = destinationItineraries[destination];

    if (!itinerary) {
        itinerarySection.classList.remove("visible");
        return;
    }

    document.getElementById("itineraryTitle").textContent =
        `${destination} Itinerary`;

    const itineraryDays = document.getElementById("itineraryDays");
    itineraryDays.innerHTML = "";

    itinerary.forEach(function(activity, index) {
        const day = document.createElement("div");
        day.className = "itinerary-day";

        const dayLabel = document.createElement("span");
        dayLabel.textContent = `Day ${index + 1}`;

        const description = document.createElement("p");
        description.textContent = activity;

        day.append(dayLabel, description);
        itineraryDays.appendChild(day);
    });

    itinerarySection.classList.add("visible");
}


// Select destination from destination cards

function selectDestination(destination) {

    document.getElementById("destination").value = destination;

    renderItinerary(destination);

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}


// Set minimum travel date to today

const today = new Date().toISOString().split("T")[0];

document.getElementById("travelDate").setAttribute(
    "min",
    today
);


// Booking form submission

document.getElementById("bookingForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        // Get form values

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const from = document.getElementById("from").value;
        const destination =
            document.getElementById("destination").value;
        // Add traveler to registered travelers list

travelersList.push({
    name: name,
    email: email,
    location: from
});

displayTravelers();

        const travelDate =
            document.getElementById("travelDate").value;

        const travelers =
            parseInt(document.getElementById("travelers").value);

        const travelType =
            document.getElementById("travelType").value;

        const hotel =
            document.getElementById("hotel").value;


        // Basic validation

        if (travelers < 1) {

            alert("Number of travelers must be at least 1.");

            return;
        }


        // Calculate travel cost

        let basePrice =
            destinationPrices[destination] * travelers;

        let travelCost =
            travelCharges[travelType] * travelers;


        // Hotel cost

        let hotelCost = 0;

        if (hotel === "Yes") {

            hotelCost = 2500 * travelers;
        }


        // Final price

        let total =
            basePrice + travelCost + hotelCost;


        // Display booking details

        document.getElementById("bookingDetails").innerHTML = `

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>From:</strong> ${from}</p>

            <p><strong>Destination:</strong> ${destination}</p>

            <p><strong>Travel Date:</strong> ${travelDate}</p>

            <p><strong>Travelers:</strong> ${travelers}</p>

            <p><strong>Travel Type:</strong> ${travelType}</p>

            <p><strong>Hotel:</strong> ${hotel}</p>

            <p><strong>Destination Cost:</strong>
            ₹${basePrice.toLocaleString()}</p>

            <p><strong>Travel Charges:</strong>
            ₹${travelCost.toLocaleString()}</p>

            <p><strong>Hotel Charges:</strong>
            ₹${hotelCost.toLocaleString()}</p>

        `;

        renderItinerary(destination);

        document.getElementById("totalPrice").innerText =
            "₹" + total.toLocaleString();


        // Show result section

        document.getElementById("resultSection").style.display =
            "block";


        // Scroll to result

        document.getElementById("resultSection").scrollIntoView({
            behavior: "smooth"
        });

    }
);


// Confirm booking

function confirmBooking() {

    const name = document.getElementById("name").value;

    const destination =
        document.getElementById("destination").value;

    const total =
        document.getElementById("totalPrice").innerText;


    alert(
        "🎉 Booking Confirmed!\n\n" +
        "Passenger: " + name + "\n" +
        "Destination: " + destination + "\n" +
        "Total Amount: " + total + "\n\n" +
        "Thank you for choosing TravelAnks!"
    );

}