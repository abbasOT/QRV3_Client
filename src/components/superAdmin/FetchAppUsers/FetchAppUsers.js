




// import { getDatabase, ref, onValue } from "firebase/database";

// const FetchAppUsers = (setAppUsers) => {
//     const db = getDatabase();
//     const usersRef = ref(db, "/users");

//     const handleUserData = async (usersSnapshot) => {
//         const usersData = usersSnapshot.val();

//         const userInfoList = Object.values(usersData || {}).map((user) => ({
//             userId: user?.uid || user?.id,
//             firstName: user.firstName || "",
//             lastName: user.lastName || "",
//             email: user.email || "",
//             address: user.address || "",
//             phone: user.phone || "",
//             isSubscriptionCancelled: user.isSubscriptionCancelled || "",
//         }));

//         const propertiesRef = ref(db, "/property");

//         onValue(propertiesRef, (propertiesSnapshot) => {
//             const propertiesData = propertiesSnapshot.val();
//             const emailPropertyAssociations = {};
//             const allCommercialResidentEmails = new Set();
//             const allPropertyResidentEmails = new Set();

//             Object.entries(propertiesData || {}).forEach(([propertyId, propertyData]) => {
//                 const adminNodes = ["commercialAdmin", "Property Owner"];
//                 const residentNodes = ["commercialResidents", "Property Resident"];

//                 adminNodes.forEach((node) => {
//                     const nodeData = propertyData[node];

//                     if (nodeData) {
//                         if (node === "commercialAdmin") {
//                             const date = nodeData?.date || ""
//                             Object.values(nodeData).forEach((email) => {
//                                 if (!emailPropertyAssociations[email]) {
//                                     emailPropertyAssociations[email] = {
//                                         adminCount: 0,
//                                         commercialResidentCount: 0,
//                                         propertyResidentCount: 0,
//                                         properties: [],
//                                         propertyDetails: [],
//                                     };
//                                 }
//                                 emailPropertyAssociations[email].adminCount += 1;
//                                 emailPropertyAssociations[email].properties.push(propertyId);

//                                 const intercomsData = propertyData["intercoms"];
//                                 const intercoms = intercomsData ? Object.keys(intercomsData) : [];




//                                 emailPropertyAssociations[email].propertyDetails.push({
//                                     propertyId,
//                                     propertyName: "commercialAdmin",
//                                     intercoms: intercoms,
//                                     paymentStatus: "done",
//                                     assignedDate: date || ""

//                                     // Ensure paymentStatus is set to "done" for commercialAdmin
//                                 });
//                             });
//                         } else if (node === "Property Owner") {
//                             Object.entries(nodeData).forEach(([nodeId, nodeInfo]) => {
//                                 const email = nodeInfo.email;
//                                 const paymentStatus = nodeInfo.paymentStatus;
//                                 const assignedDate = nodeInfo.date;
//                                 if (email) {
//                                     if (!emailPropertyAssociations[email]) {
//                                         emailPropertyAssociations[email] = {
//                                             adminCount: 0,
//                                             commercialResidentCount: 0,
//                                             propertyResidentCount: 0,
//                                             properties: [],
//                                             propertyDetails: [],
//                                         };
//                                     }
//                                     emailPropertyAssociations[email].adminCount += 1;
//                                     emailPropertyAssociations[email].properties.push(propertyId);

//                                     const intercomsData = propertyData["intercoms"];
//                                     const intercoms = intercomsData ? Object.keys(intercomsData) : [];

//                                     emailPropertyAssociations[email].propertyDetails.push({
//                                         propertyId,
//                                         propertyName: "Property Owner",
//                                         intercoms: intercoms,
//                                         paymentStatus: paymentStatus || "done",
//                                         assignedDate: assignedDate || ""
//                                     });
//                                 }
//                             });
//                         }
//                     }
//                 });

//                 residentNodes.forEach((node) => {
//                     const nodeData = propertyData[node];

//                     if (nodeData) {
//                         Object.entries(nodeData).forEach(([nodeId, nodeInfo]) => {
//                             const email = nodeInfo.email;
//                             const paymentStatus = nodeInfo.paymentStatus;

//                             if (email) {
//                                 if (node === "commercialResidents") {
//                                     allCommercialResidentEmails.add(email);
//                                     if (!emailPropertyAssociations[email]) {
//                                         emailPropertyAssociations[email] = {
//                                             adminCount: 0,
//                                             commercialResidentCount: 0,
//                                             propertyResidentCount: 0,
//                                             properties: [],
//                                             propertyDetails: [],
//                                         };
//                                     }
//                                     emailPropertyAssociations[email].commercialResidentCount += 1;
//                                     emailPropertyAssociations[email].properties.push(propertyId);
//                                     emailPropertyAssociations[email].propertyDetails.push({
//                                         propertyId,
//                                         propertyName: "commercialResidents",
//                                         paymentStatus: paymentStatus || "done",
//                                     });
//                                 } else if (node === "Property Resident") {
//                                     allPropertyResidentEmails.add(email);
//                                     if (!emailPropertyAssociations[email]) {
//                                         emailPropertyAssociations[email] = {
//                                             adminCount: 0,
//                                             commercialResidentCount: 0,
//                                             propertyResidentCount: 0,
//                                             properties: [],
//                                             propertyDetails: [],
//                                         };
//                                     }
//                                     emailPropertyAssociations[email].propertyResidentCount += 1;
//                                     emailPropertyAssociations[email].properties.push(propertyId);
//                                     emailPropertyAssociations[email].propertyDetails.push({
//                                         propertyId,
//                                         propertyName: "Property Resident",
//                                         paymentStatus: paymentStatus || "done", // Add paymentStatus here
//                                     });
//                                 }
//                             }
//                         });
//                     }
//                 });
//             });

//             const responseData = userInfoList.map((user) => {
//                 const { firstName, lastName, email, address, phone, isSubscriptionCancelled, userId } = user;
//                 const associations = emailPropertyAssociations[email] || {
//                     adminCount: 0,
//                     commercialResidentCount: 0,
//                     propertyResidentCount: 0,
//                     properties: [],
//                     propertyDetails: [],
//                 };

//                 const withoutId = (associations.adminCount === 0 &&
//                     associations.commercialResidentCount === 0 &&
//                     associations.propertyResidentCount === 0) ? "true" : "false";

//                 const associatedResidentEmails = [];

//                 associations.propertyDetails.forEach((detail) => {
//                     if (detail.propertyName === "commercialAdmin") {
//                         const propertyData = propertiesData[detail.propertyId];
//                         if (propertyData && propertyData.commercialResidents) {
//                             Object.values(propertyData.commercialResidents).forEach((resident) => {
//                                 if (resident.email) {
//                                     associatedResidentEmails.push(resident.email);
//                                 }
//                             });
//                         }
//                     } else if (detail.propertyName === "Property Owner") {
//                         const propertyData = propertiesData[detail.propertyId];
//                         if (propertyData && propertyData["Property Resident"]) {
//                             Object.values(propertyData["Property Resident"]).forEach((resident) => {
//                                 if (resident.email) {
//                                     associatedResidentEmails.push(resident.email);
//                                 }
//                             });
//                         }
//                     }
//                 });

//                 return {
//                     user: {
//                         firstName,
//                         lastName,
//                         email,
//                         address,
//                         phone,
//                         withoutId,
//                         isSubscriptionCancelled,
//                         userId
//                     },
//                     associations: {
//                         propertyDetails: associations.propertyDetails,
//                         adminCount: associations.adminCount,
//                         commercialResidentCount: associations.commercialResidentCount,
//                         propertyResidentCount: associations.propertyResidentCount,
//                         associatedResidentEmails,
//                     }
//                 };
//             });

//             setAppUsers(responseData);
//         });
//     };

//     onValue(usersRef, handleUserData);
// };

// export default FetchAppUsers;

















import { getDatabase, ref, onValue } from "firebase/database";

const FetchAppUsers = (setAppUsers) => {
    const db = getDatabase();
    const usersRef = ref(db, "/users");

    const handleUserData = async (usersSnapshot) => {
        const usersData = usersSnapshot.val();

        const userInfoList = Object.values(usersData || {}).map((user) => ({
            userId: user?.uid || user?.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            address: user.address || "",
            phone: user.phone || "",
            isSubscriptionCancelled: user.isSubscriptionCancelled || "",
        }));

        const propertiesRef = ref(db, "/property");

        onValue(propertiesRef, (propertiesSnapshot) => {
            const propertiesData = propertiesSnapshot.val();
            const emailPropertyAssociations = {};
            const allCommercialResidentEmails = new Set();
            const allPropertyResidentEmails = new Set();

            Object.entries(propertiesData || {}).forEach(([propertyId, propertyData]) => {
                const adminNodes = ["Property Owner"];
                const residentNodes = ["commercialResidents", "Property Resident"];

                adminNodes.forEach((node) => {
                    const nodeData = propertyData[node];

                    if (nodeData) {
                        if (node === "Property Owner") {
                            Object.entries(nodeData).forEach(([nodeId, nodeInfo]) => {
                                const email = nodeInfo.email;
                                const paymentStatus = nodeInfo.paymentStatus;
                                const assignedDate = nodeInfo.date;
                                if (email) {
                                    if (!emailPropertyAssociations[email]) {
                                        emailPropertyAssociations[email] = {
                                            adminCount: 0,
                                            commercialResidentCount: 0,
                                            propertyResidentCount: 0,
                                            properties: [],
                                            propertyDetails: [],
                                        };
                                    }
                                    emailPropertyAssociations[email].adminCount += 1;
                                    emailPropertyAssociations[email].properties.push(propertyId);

                                    const intercomsData = propertyData["intercoms"];
                                    const intercoms = intercomsData ? Object.keys(intercomsData) : [];

                                    emailPropertyAssociations[email].propertyDetails.push({
                                        propertyId,
                                        propertyName: "Property Owner",
                                        intercoms: intercoms,
                                        paymentStatus: paymentStatus || "done",
                                        assignedDate: assignedDate || ""
                                    });
                                }
                            });
                        }
                    }
                });

                residentNodes.forEach((node) => {
                    const nodeData = propertyData[node];

                    if (nodeData) {
                        Object.entries(nodeData).forEach(([nodeId, nodeInfo]) => {
                            const email = nodeInfo.email;
                            const paymentStatus = nodeInfo.paymentStatus;

                            if (email) {
                                if (node === "commercialResidents") {
                                    allCommercialResidentEmails.add(email);
                                    if (!emailPropertyAssociations[email]) {
                                        emailPropertyAssociations[email] = {
                                            adminCount: 0,
                                            commercialResidentCount: 0,
                                            propertyResidentCount: 0,
                                            properties: [],
                                            propertyDetails: [],
                                        };
                                    }
                                    emailPropertyAssociations[email].commercialResidentCount += 1;
                                    emailPropertyAssociations[email].properties.push(propertyId);
                                    emailPropertyAssociations[email].propertyDetails.push({
                                        propertyId,
                                        propertyName: "commercialResidents",
                                        paymentStatus: paymentStatus || "done",
                                    });
                                } else if (node === "Property Resident") {
                                    allPropertyResidentEmails.add(email);
                                    if (!emailPropertyAssociations[email]) {
                                        emailPropertyAssociations[email] = {
                                            adminCount: 0,
                                            commercialResidentCount: 0,
                                            propertyResidentCount: 0,
                                            properties: [],
                                            propertyDetails: [],
                                        };
                                    }
                                    emailPropertyAssociations[email].propertyResidentCount += 1;
                                    emailPropertyAssociations[email].properties.push(propertyId);
                                    emailPropertyAssociations[email].propertyDetails.push({
                                        propertyId,
                                        propertyName: "Property Resident",
                                        paymentStatus: paymentStatus || "done", // Add paymentStatus here
                                    });
                                }
                            }
                        });
                    }
                });
            });

            const responseData = userInfoList.map((user) => {
                const { firstName, lastName, email, address, phone, isSubscriptionCancelled, userId } = user;
                const associations = emailPropertyAssociations[email] || {
                    adminCount: 0,
                    commercialResidentCount: 0,
                    propertyResidentCount: 0,
                    properties: [],
                    propertyDetails: [],
                };

                const withoutId = (associations.adminCount === 0 &&
                    associations.commercialResidentCount === 0 &&
                    associations.propertyResidentCount === 0) ? "true" : "false";

                const associatedResidentEmails = [];

                associations.propertyDetails.forEach((detail) => {
                    if (detail.propertyName === "Property Owner") {
                        const propertyData = propertiesData[detail.propertyId];
                        if (propertyData && propertyData["Property Resident"]) {
                            Object.values(propertyData["Property Resident"]).forEach((resident) => {
                                if (resident.email) {
                                    associatedResidentEmails.push(resident.email);
                                }
                            });
                        }
                    }
                });

                return {
                    user: {
                        firstName,
                        lastName,
                        email,
                        address,
                        phone,
                        withoutId,
                        isSubscriptionCancelled,
                        userId
                    },
                    associations: {
                        propertyDetails: associations.propertyDetails,
                        adminCount: associations.adminCount,
                        commercialResidentCount: associations.commercialResidentCount,
                        propertyResidentCount: associations.propertyResidentCount,
                        associatedResidentEmails,
                    }
                };
            });

            setAppUsers(responseData);
        });
    };

    onValue(usersRef, handleUserData);
};

export default FetchAppUsers;