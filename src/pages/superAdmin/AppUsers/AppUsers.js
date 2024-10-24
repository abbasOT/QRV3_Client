import React, { useState, useEffect } from 'react'
import AppUserAccountDetailsCard from '../../../components/superAdmin/AppUserAccountDetailsCard/AppUserAccountDetailsCard';
import Header from "../../../components/superAdmin/Header/Header";
import searchIcon from "../../../assests/search_icon.svg";
import Form from "react-bootstrap/Form";
import { Divider, Box, Grid } from "@mui/material";
import axios from 'axios';
import FetchAppUsers from '../../../components/superAdmin/FetchAppUsers/FetchAppUsers';

const SearchInputStyle = {
    border: "none",
    borderRadius: "30px",
    backgroundColor: "#EEEEEE",
    color: "#8E8E8E",
    paddingLeft: "50px",
    minWidth: "424px",
    height: "35px",
};

const iconStyle = {
    position: "relative",
    marginRight: "-40px", // Adjust the spacing between the icon and the text
};

const TotalPropStyle = {
    fontFamily: "Poppins",
    color: "#8E8E8E",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontWeight: 400,
}

const TotalPropNumStyle = {
    ...TotalPropStyle,
    paddingLeft: "1rem",
    fontWeight: 700,
    fontSize: "1rem"
}
const container = {
    // minWidth:"1200px"
    margin: "1rem 2rem",
    width: "1500px", minWidth: "1200px",

}

function AppUsers() {


    const [appUsers, setAppUsers] = useState([]);

    // useEffect(() => {
    //     // Function to fetch properties
    //     const fetchAppUsers = async () => {
    //         try {
    //             // Make a GET request to get properties
    //             const response = await axios.get(
    //                 `https://ot-technologies.com/super/getAppUsers`
    //             );
    //             // Update the state with the fetched properties
    //             setAppUsers(response.data || []);
    //         } catch (error) {
    //             console.error("Error fetching properties:", error.message);
    //         }
    //     };

    //     // Call the function to fetch properties when the component mounts
    //     fetchAppUsers();
    // }, []);

    useEffect(() => {
        FetchAppUsers(setAppUsers);
    }, []);


    console.log(appUsers)


    // const usersArray = appUsers ? appUsers : []
    const usersArray = appUsers
        ? appUsers.filter(userObj => userObj.user.email) // Filter out users without an email
        : [];


    const [CommercialProperties, setCommercialProperties] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    const [activeTab, setActiveTab] = useState('totalProperties');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    console.log(activeTab)
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };


    // Filter users based on the active tab

    const totalAccounts = usersArray.length;
    const withoutIdCount = usersArray.filter(
        (user) => user.user.withoutId === "true"
    ).length;
    const subscriptionCanceledCount = usersArray.filter(
        (user) =>
            user.user.withoutId === "false" &&
            (user.user.isSubscriptionCancelled === "true" ||
                user.user.isSubscriptionCancelled === "")
    ).length;


    const filteredUsers = usersArray.filter((userObj) => {
        // Apply the active tab filter first
        let matchesTabFilter = true;

        if (activeTab === 'withoutId') {
            matchesTabFilter = userObj.user.withoutId === 'true';
        } else if (activeTab === 'subscriptionCanceled') {
            matchesTabFilter = userObj.user.withoutId === 'false' &&
                (userObj.user.isSubscriptionCancelled === 'true' || userObj.user.isSubscriptionCancelled === '');
        }

        // Apply search filter
        const matchesSearchFilter = userObj.user.email.toLowerCase().includes(searchInput.toLowerCase());

        // Return true if both filters are satisfied
        return matchesTabFilter && matchesSearchFilter;
    });



    return (
        <>
            <Header />
            <div style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
                <div style={container}>
                    <div className="row mt-4 d-flex justify-content-center align-items-center pb-5">

                        <div className="col-3 d-flex mt-5">
                            {" "}
                            <img src={searchIcon} style={iconStyle} alt="" />{" "}
                            <Form.Control
                                style={SearchInputStyle}
                                id="SearchInput"
                                // size="lg"
                                type="text"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                placeholder="Search email account"

                            />
                        </div>
                    </div>

                    <Box sx={{ display: "flex", alignItems: "center", gap: "1.7rem", width: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem", flexDirection: "column", position: "relative" }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>

                                {activeTab === 'totalProperties' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", left: -5, top: -35 }} />}
                                {activeTab === 'withoutId' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", left: -5, top: -5 }} />}
                                {activeTab === 'subscriptionCanceled' && <Box sx={{ borderRadius: "0.7rem", background: "#8E8E8E", width: "1.5rem", height: "0.5rem", position: "absolute", left: -5, top: 28 }} />}

                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: "0.5rem", flexDirection: "column", alignItems: "left" }}>
                            <div onClick={() => handleTabClick('totalProperties')} style={{ cursor: 'pointer' }}>
                                <span style={TotalPropStyle}>
                                    Total Accounts: <span style={TotalPropNumStyle}>{totalAccounts}</span>
                                </span>
                            </div>
                            <div onClick={() => handleTabClick('withoutId')} style={{ cursor: 'pointer' }}>
                                <span style={TotalPropStyle}>
                                    Without ID: <span style={{ ...TotalPropNumStyle, color: "#446B54", paddingLeft: "2.8rem" }}>{withoutIdCount}</span>
                                </span>
                            </div>
                            <div onClick={() => handleTabClick('subscriptionCanceled')} style={{ cursor: 'pointer' }}>
                                <span style={TotalPropStyle}>
                                    Subscription Canceled: <span style={{ ...TotalPropNumStyle, color: "#E3982A", }}>{subscriptionCanceledCount}</span>
                                </span>
                            </div>
                        </Box>
                    </Box>


                    <Divider sx={{ border: "2px solid #EEEEEE", opacity: "unset", mt: 1 }} />

                    <Box sx={{ mt: 1, padding: "1rem 5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "start", gap: "2rem" }}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((userObj, index) => {



                                let bgColor = "#EEEEEE"; // Default color

                                if (userObj.user.withoutId === 'true') {
                                    bgColor = "#446B54"; // Color for users without ID
                                } else if (userObj.user.withoutId === 'false' && (userObj.user.isSubscriptionCancelled === 'true' || userObj.user.isSubscriptionCancelled === '')) {
                                    bgColor = "#E3982A"; // Color for subscription canceled
                                }

                                return (
                                    <Box key={index} sx={{ width: "calc(50% - 1rem)", flex: "1 1 calc(50% - 1rem)", maxWidth: "48%" }}>
                                        <AppUserAccountDetailsCard
                                            bgColor={bgColor}
                                            user={userObj.user}
                                            associations={userObj.associations}
                                        />
                                    </Box>
                                );
                            })
                        ) : (
                            <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                                No App User Available
                            </Box>
                        )}
                    </Box>

                </div>


            </div>
        </>
    )
}

export default AppUsers
