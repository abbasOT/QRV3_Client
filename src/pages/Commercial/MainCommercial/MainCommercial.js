import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../../../components/Commercial/SideBar/SideBar'
import { Grid, } from '@mui/material'
import { Outlet } from "react-router-dom";
import HeaderBar from '../../../components/Commercial/HeaderBar/HeaderBar';
import { getDatabase, ref, onValue, get, push } from "firebase/database";




function MainCommercial() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userKey");

    console.log(userId, "id in the main commercial")

    useEffect(() => {
        if (!userId) {
            navigate("/login");
            return;
        }

        const db = getDatabase();
        const userRef = ref(db, `/commercial/${userId}`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            if (!snapshot.exists()) {
                navigate("/login");
            } else {
                console.log("User data:", snapshot.val());
                // You can perform other actions here with the user data if needed
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [userId, navigate]);


    return (
        <Grid container >
            <Grid item xs={2} sx={sidebar}>
                <SideBar />
            </Grid>
            <Grid item xs={10} padding={"1rem 5.3rem"}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderBar />
                    </Grid>
                    <Grid item xs={12} >
                        <Outlet />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default MainCommercial


const sidebar = {
    position: "sticky",
    top: 0,
    left: 0,
}