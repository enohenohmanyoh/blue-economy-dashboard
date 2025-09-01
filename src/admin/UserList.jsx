// src/pages/UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

// Use environment variable, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/admin";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/get/all/user`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user.id);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username || "",
      email: user.email || "",
      password: user.password || "",
      birthDate: user.birthDate || "",
      gender: user.gender || "",
    });
  };

  const updateUser = async (id) => {
    try {
      await axios.put(`${API_URL}/update/user/${id}`, formData);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-card">
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {editingUser === user.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) =>
                          setFormData({ ...formData, birthDate: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => updateUser(user.id)}>Save</button>
                      <button onClick={() => setEditingUser(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>••••••</td>
                    <td>{user.birthDate}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button onClick={() => startEditing(user)}>Edit</button>
                      <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
