import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const useDashboardData = () => {
    const [totalCommercialResidents, setTotalCommercialResidents] = useState(0);
    const [totalCommercialSubscribedResidents, setTotalCommercialSubscribedResidents] = useState(0);
    const [totalCommercialUnsubscribedResidents, setTotalCommercialUnsubscribedResidents] = useState(0);
    const [commercialActive, setCommercialActive] = useState(0);
    const [commercialInactive, setCommercialInactive] = useState(0);
    const [totalResidentialProperties, setTotalResidentialProperties] = useState(0);
    const [residentialTotalUsers, setResidentialTotalUsers] = useState(0);
    const [residentialInactive, setResidentialInactive] = useState(0);
    const [totalStandByPCBs, settotalStandByPCBs] = useState(0);
    const [totalStandByProperties, settotalStandByProperties] = useState(0);

    useEffect(() => {
        const db = getDatabase();

        const appUsersRef = ref(db, "/property");
        const commercialPropertiesRef = ref(db, "/commercial");
        const pcbsRef = ref(db, "/superadminit38XGIc27Q8HDXoZwe1OzI900u1/StandByPCBs");
        const superAdminPropertiesRef = ref(db, "/superadminit38XGIc27Q8HDXoZwe1OzI900u1/StandByProperties");

        const unsubscribeAppUsers = onValue(appUsersRef, (snapshot) => {
            const allProperties = snapshot.val();

            let propertyOwnerCount = 0;
            let totalCommercialResidents = 0;
            let subscribedResidentsCount = 0;
            let unsubscribedResidentsCount = 0;
            let totalPropertyResidents = 0;
            let subscribedPropertyResidentsCount = 0;
            let totalUnsubscribedPropertyResidents = 0;

            Object.values(allProperties).forEach((property) => {
                if (property['Property Owner']) {
                    propertyOwnerCount++;
                }

                const commercialResidents = property.commercialResidents;
                if (commercialResidents) {
                    totalCommercialResidents += Object.keys(commercialResidents).length;
                    Object.values(commercialResidents).forEach((resident) => {
                        if (resident.isSubscriptionCancelled === "true" || !resident.isSubscriptionCancelled) {
                            unsubscribedResidentsCount++;
                        } else if (resident.isSubscriptionCancelled === "false") {
                            subscribedResidentsCount++;
                        }
                    });
                }

                const propertyResidents = property["Property Resident"];
                if (propertyResidents) {
                    totalPropertyResidents += Object.keys(propertyResidents).length;
                }

                const propertyOwners = property["Property Owner"];
                if (propertyOwners) {
                    Object.values(propertyOwners).forEach((owner) => {
                        if (owner.isSubscriptionCancelled === "true" || !owner.isSubscriptionCancelled) {
                            totalUnsubscribedPropertyResidents++;
                        } else if (owner.isSubscriptionCancelled === "false") {
                            subscribedPropertyResidentsCount++;
                        }
                    });
                }
            });

            setTotalResidentialProperties(propertyOwnerCount);
            setResidentialTotalUsers(totalPropertyResidents);
            setResidentialInactive(totalUnsubscribedPropertyResidents);
            setTotalCommercialResidents(totalCommercialResidents);
            setTotalCommercialSubscribedResidents(subscribedResidentsCount);
            setTotalCommercialUnsubscribedResidents(unsubscribedResidentsCount);
        });

        function filterProperties(prefix, properties) {

            return Object.entries(properties || {})
                .filter(([key, value]) => key.startsWith(prefix) && value.status !== "deleted")
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
        }

        const unsubscribeCommercialProperties = onValue(commercialPropertiesRef, (snapshot) => {

            const properties = snapshot.val();

            const filteredProperties = filterProperties("commercial-", properties);

            console.log(filteredProperties, "the properties of commerical node")

            const propertiesWithId = [];
            const propertiesWithoutId = [];

            Object.values(filteredProperties).forEach((property) => {
                if (property.propertyId) {
                    propertiesWithId.push(property);
                } else {
                    propertiesWithoutId.push(property);
                }
            });

            // Count the properties with and without a propertyId
            const commercialCountWithId = propertiesWithId.length;
            const commercialCountWithoutId = propertiesWithoutId.length;

            setCommercialActive(commercialCountWithId);
            setCommercialInactive(commercialCountWithoutId);
        });


        const unsubscribePCBs = onValue(pcbsRef, (snapshot) => {
            const pcbsData = snapshot.val();
            const totalStandByPCBs = pcbsData ? Object.keys(pcbsData).length : 0;

            settotalStandByPCBs(totalStandByPCBs);
        });

        const unsubscribeStandByProperties = onValue(superAdminPropertiesRef, (snapshot) => {
            const standByPropertiesData = snapshot.val();
            const totalStandByProperties = standByPropertiesData ? Object.keys(standByPropertiesData).length : 0;

            settotalStandByProperties(totalStandByProperties);
        });

        // Cleanup subscriptions when the component unmounts
        return () => {
            unsubscribeAppUsers();
            unsubscribeCommercialProperties();
            unsubscribePCBs();
            unsubscribeStandByProperties();
        };
    }, []);

    return {
        totalCommercialResidents,
        totalCommercialSubscribedResidents,
        totalCommercialUnsubscribedResidents,
        commercialActive,
        commercialInactive,
        totalResidentialProperties,
        residentialTotalUsers,
        residentialInactive,
        totalStandByPCBs,
        totalStandByProperties,
    };
};

export default useDashboardData;
