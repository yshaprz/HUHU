import React, { useState, useEffect } from "react";
import "./room.css";

const Room = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  // TESTING VALUES LANG 
  const rooms = [
    { id: "00001", type: "Standard Room", floor: "1", rate: "1000", capacity: "2 guests", status: "Available" },
    { id: "00002", type: "Suite Room", floor: "1", rate: "3000", capacity: "6 guests", status: "Assigned" },
    { id: "00003", type: "Standard Room", floor: "2", rate: "1000", capacity: "2 guests", status: "Out of Order" },
    { id: "00004", type: "Deluxe Room", floor: "1", rate: "2000", capacity: "4 guests", status: "Available" },
    { id: "00005", type: "Standard Room", floor: "3", rate: "1000", capacity: "2 guests", status: "Assigned" },
    { id: "00006", type: "Standard Room", floor: "1", rate: "1000", capacity: "2 guests", status: "Available" },
    { id: "00007", type: "Suite Room", floor: "2", rate: "3000", capacity: "6 guests", status: "Assigned" },
    { id: "00008", type: "Standard Room", floor: "3", rate: "1000", capacity: "2 guests", status: "In Maintenance" },
    { id: "00009", type: "Deluxe Room", floor: "1", rate: "2000", capacity: "4 guests", status: "Assigned" },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId); 
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.id.includes(searchTerm) || room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? room.status.toLowerCase() === statusFilter.toLowerCase() : true;
    const matchesType = typeFilter ? room.type.toLowerCase().includes(typeFilter.toLowerCase()) : true;

    return matchesSearch && matchesStatus && matchesType;
    
  });

  return (
    <div className="room-container">
      <div className="room-header">
        <h2>Room</h2>
        <div className="current-date">
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className="room-filters">
        <div className="filter-by">
          <h2>Filter By:</h2>
        </div>
        <select value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Out of Order">Out of Order</option>
          <option value="In Maintenance">In Maintenance</option>
        </select>
        <select value={typeFilter} onChange={handleTypeFilter}>
          <option value="">All</option>
          <option value="Standard Room">Standard Room</option>
          <option value="Deluxe Room">Deluxe Room</option>
          <option value="Suite Room">Suite Room</option>
        </select>
        <div className="filter-search"> {/* Wrap input in this div */}
          <input
            type="text"
          placeholder="Search room "
          value={searchTerm}
          onChange={handleSearch}
          />
        </div>
        <button className="add-room-type-btn">+ Add Room Type</button>
        <button className="add-room-btn">+ Add Room</button>
      </div>
  
      <div className="room-table-container">
        <table className="room-table">
          <thead>
            <tr>
              <th>Room #</th>
              <th>Room Type</th>
              <th>Floor Number</th>
              <th>Rate</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.type}</td>
                <td>{room.floor}</td>
                <td>{room.rate}</td>
                <td>{room.capacity}</td>
                <td>
                  <span
                    className={`status ${room.status
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                  >
                    {room.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}  

export default Room;
