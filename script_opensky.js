document.addEventListener('DOMContentLoaded', async () => {
    const trackForm = document.getElementById('trackForm');
    const resultsContainer = document.getElementById('results');
  
    trackForm.addEventListener('submit', async event => {
      event.preventDefault();
  
      const tailNumber = document.getElementById('tailNumber').value;
  
      // Send a request to the OpenSky Network API to retrieve the plane's information
      const response = await fetch(`https://opensky-network.org/api/flights/aircraft?icao24=${tailNumber}`, {
        headers: {
          Authorization: `Basic ${btoa(`Username:Password`)}`,
        },
      });
      const data = await response.json();
  
      // Check if the plane was found
      if (data.length > 0) {
        // Display the retrieved information on the website
        resultsContainer.innerHTML = '';
  
        const flightInfo = document.createElement('div');
        flightInfo.classList.add('flight-info');
        flightInfo.innerHTML = `
          <h2>Flight Information</h2>
          <p>Tail Number: ${data[0].icao24}</p>
          <p>Location: ${data[0].latitude}° N, ${data[0].longitude}° E</p>
          <p>Altitude: ${data[0].geo_altitude} meters</p>
        `;
        resultsContainer.appendChild(flightInfo);
      } else {
        // Display an error message if the plane was not found
        resultsContainer.innerHTML = '<p>Plane not found</p>';
      }
    });
  });
  