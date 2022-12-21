document.addEventListener('DOMContentLoaded', async () => {
    const trackForm = document.getElementById('trackForm');
    const resultsContainer = document.getElementById('results');
  
    trackForm.addEventListener('submit', async event => {
      event.preventDefault();
  
      const tailNumber = document.getElementById('tailNumber').value;
  
      // Send a request to the RapidAPI ADS-B Exchange API to retrieve the plane's information
      const response = await fetch(`https://adsbexchange-com1.p.rapidapi.com/api/aircraft/${tailNumber}`, {
        headers: {
          'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
          'X-RapidAPI-Host': 'adsbexchange-com1.p.rapidapi.com',
        },
      });
      const data = await response.json();
  
      // Check if the plane was found
      if (data.Error === null) {
        // Display the retrieved information on the website
        resultsContainer.innerHTML = '';
  
        const flightInfo = document.createElement('div');
        flightInfo.classList.add('flight-info');
        flightInfo.innerHTML = `
          <h2>Flight Information</h2>
          <p>Tail Number: ${data.reg}</p>
          <p>Location: ${data.lat}° N, ${data.lon}° E</p>
          <p>Altitude: ${data.alt} meters</p>
          <p>Airport Code: ${data.from}</p>
        `;
        resultsContainer.appendChild(flightInfo);
  
        // Send a request to ourairports.com to retrieve the airport information
        const airportResponse = await fetch(`https://ourairports.com/data/airports/${data.from}.json`);
        const airportData = await airportResponse.json();
  
        const airportInfo = document.createElement('div');
        airportInfo.classList.add('airport-info');
        airportInfo.innerHTML = `
          <h2>Airport Information</h2>
          <p>Name: ${airportData.name}</p>
          <p>City: ${airportData.city}</p>
          <p>Country: ${airportData.country}</p>
        `;
        resultsContainer.appendChild(airportInfo);
      } else {
        // Display an error message if the plane was not found
        resultsContainer.innerHTML = `<p>Error: ${data.Error}</p>`;
      }
    });
  });
    