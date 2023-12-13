import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3300/countries")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });

    axios.get("http://localhost:3300/states")
      .then((res) => {
        setStates(res.data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setSelectedCountry(selectedCountryId);
  };

  const filteredStates = states.filter((state) => state.country_id === selectedCountry);

  return (
    <div>
      <label htmlFor="countrySelect">Select Country</label>
      <select id="countrySelect" name="countrySelect" onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.country_id} value={country.country_id}>
            {country.country_name}
          </option>
        ))}
      </select>

      <label htmlFor="stateSelect">Select State</label>
      <select id="stateSelect" name="stateSelect">
        <option value="">Select a state</option>
        {filteredStates.map((state) => (
          <option key={state.state_id} value={state.state_id}>
            {state.state_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
