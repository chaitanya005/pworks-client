import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = ({ personsData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location?.search);
  const [sortField, setSortField] = useState(params.get("sortField") || "");
  const [searchTerm, setSearchTerm] = useState(params.get("search") || "");

  const navigatePage = (newField, search) => {
    navigate(`/?sortField=${newField}&search=${search}`);
  };

  const handleSort = (field) => {
    let newField = field == sortField ? `-${sortField}` : field;
    setSortField(newField);
    navigatePage(newField, searchTerm);
  };

  const handleSearch = (e) => {
    let search = e.target.value;
    setSearchTerm(search);
    navigatePage(sortField, search);
  };

  useEffect(() => {
    let data = [...personsData];
    if (searchTerm) {
      let search = searchTerm.toLowerCase();
      data = data.filter(
        (item) =>
          item.Name.toLowerCase().includes(search) ||
          item.StatusOfApplication.toLowerCase().includes(search) ||
          item.PositionApplied.toLowerCase().includes(search)
      );
    }
    if (sortField) {
      data = data.sort((a, b) => {
        if (sortField.startsWith("-")) {
          return b[sortField.slice(1)] > a[sortField.slice(1)] ? 1 : -1;
        } else {
          return a[sortField] > b[sortField] ? 1 : -1;
        }
      });
    }
    setFilteredData(data);
  }, [personsData, sortField, searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name, Status, Position"
        style={{ width: "30%", margin: "20px" }}
        data-testid="search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div
        style={{
          margin: "30px",
          borderCollapse: "separate",
          border: "1px solid",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th onClick={() => handleSort("YearsOfExperience")}>
                Years of experience
              </th>
              <th onClick={() => handleSort("PositionApplied")}>
                Position applied
              </th>
              <th onClick={() => handleSort("DateOfApplication")}>
                Date of application
              </th>
              <th>Status of the application</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {filteredData?.map((personData, i) => (
              <tr key={i}>
                <td>{personData?.Name}</td>
                <td>{personData?.Email}</td>
                <td>{new Date(personData?.Age).toDateString()}</td>
                <td>{personData?.YearsOfExperience}</td>
                <td>{personData?.PositionApplied}</td>
                <td>
                  {new Date(personData?.DateOfApplication).toLocaleDateString()}
                </td>
                <td>{personData?.StatusOfApplication?.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
