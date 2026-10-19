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
    Andaman: 14999
};


// Travel type additional charges

const travelCharges = {
    Flight: 3000,
    Train: 1000,
    Bus: 500
};


// Select destination from destination cards

function selectDestination(destination) {

    document.getElementById("destination").value = destination;

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