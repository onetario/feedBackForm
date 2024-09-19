import { useState } from "react";
import Axios from "axios";
import "./form.css";

function MyForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("+91");
  const [country, setCountry] = useState("India");
  const [feedback, setFeedback] = useState("Good.");
  const [formData, setFormData] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(false); // State to control data visibility

  const payload = { name, age, phone, country, feedback };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    // Validation: Check if all fields are filled
    if (
      !name ||
      !age ||
      country === "Select" ||
      !feedback ||
      phone.length !== 13
    ) {
      alert(
        "Please fill out all the required fields, and ensure the phone number is 12 digits long."
      );
      return; // Stop the form submission if validation fails
    }
    alert("Your Form is submitted");

    Axios.post("https://feedbackform-server.onrender.com/form", payload)
      .then((res) => {
        console.log(res.config.data); // Log the server response
        console.log("done");
        console.log(res.data.message); // Log the response message from the server
        alert(res.data.message);

        // Reset the form fields to their default values
        setName("");
        setAge("");
        setPhone("+91");
        setCountry("India");
        setFeedback("Good.");

        // Reset the visibility of the data after submission
        setIsDataVisible(false); // Ensure data is hidden after submission
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to fetch the form data from the server
  const fetchData = () => {
    Axios.get("http://localhost:3001/form-data")
      .then((res) => {
        setFormData(res.data); // Update formData with the fetched data
        setIsDataVisible(true); // Show the data once fetched
      })
      .catch((err) => {
        console.error("Error fetching form data", err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="frm">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Age:</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <label>Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label>Country:</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="Select">Select</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        <br />
        <label>Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <br />
        <button>Submit</button>
      </form>

      <button className="btn" onClick={fetchData}>
        View Data
      </button>

      {/* Conditionally display the data */}
      {isDataVisible && (
        <div className="getData">
          <h3>Submitted Data:</h3>
          <ul>
            {formData.map((data, index) => (
              <li key={index}>
                <p>Name: {data.name}</p>
                <p>Age: {data.age}</p>
                <p>Phone: {data.phone}</p>
                <p>Country: {data.country}</p>
                <p>Feedback: {data.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MyForm;
