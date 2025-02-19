import React from "react";
import "./AnnexFormscreate.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";


const MainDashboard = () => {
  return (
    <div>
      <div className="main-header">
      <img src="logo.png" alt="Logo Icon" className="logo" />
      </div>
      <div className="dashboard-container">
       
        <aside className="sidebar">
          <nav>
            <ul>
              <li className="active">
                <DashboardIcon /> Dashboard
              </li>
              <li>
                <DescriptionIcon /> Annex Forms
              </li>
              <li>
                <PeopleAltIcon /> My Profile
              </li>
              <li>
                <MenuBookIcon /> Edit Profile
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <header className="header">
            <h2>Dashboard</h2>
            <div className="profile"></div>
            <button className="create-btn">Create ANNEX Form</button>
          </header>
            
              <div className="consignment-form">
                <h2>1. Consignment Information:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>2. Consignee:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>3. Actual quantity:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>49 DRUMS - Tonnes (Mg) m³: </label>
                    <input type="text" placeholder="Enter name" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                    <h2>4. Actual date of shipment:</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Date</label>
                        <input type="date" placeholder="Date" />
                      </div>
                    </div>
              </div>
              <div className="consignment-form">
                <h2>5. (a) First Carrier:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>5.(b) Second Carrier:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>5.(b) Second Carrier:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>6.Waste generator (Original producer/new producer/collector):</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>7. Recovery facility:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>8. Recovery operation (or if appropriate disposal operation in the case of waste referred to in Article 3(4):)</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>9. Usual description of the waste:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>10. Waste identification (fill in relevant codes):</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>11. Countries/states concerned:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>13. Signature upon receipt of the waste by the consignee:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="consignment-form">
                <h2>14. Shipment received at recovery facility:</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Enter address" />
                  </div>

                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" placeholder="Enter contact person" />
                  </div>

                  <div className="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Enter telephone number" />
                  </div>

                  <div className="form-group">
                    <label>Fax</label>
                    <input type="text" placeholder="Enter fax number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </div>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
