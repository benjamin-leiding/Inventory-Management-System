import { AppShell, Burger, Flex, Button } from '@mantine/core';

import {IconBuildingStore, IconUsersGroup, IconFile3d, IconLibrary, IconLibraryPhoto, IconBuildingWarehouse, IconFunction, IconStatusChange, IconFileStack,IconFileAnalytics, IconBuilding, IconBoxMultiple, IconAffiliateFilled, IconAffiliate} from '@tabler/icons-react'
import { rem } from '@mantine/core';
import {useAppDispatch, useAppSelector } from '../Hooks';
import { selectDashboard, setSelectedPage } from '../state/DashboardState';
import { selectUser } from '../state/UserState';

export const Menu = () => {

    const dashboardState = useAppSelector(selectDashboard)
    const userState = useAppSelector(selectUser)

    const dispatch = useAppDispatch()

    return <AppShell.Footer h={"60px"}>
        <div style={{display: "flex", alignItems: "center", paddingTop: "10px",paddingBottom: "10px", justifyContent: "space-evenly"}}>

            <Button onClick={() => dispatch(setSelectedPage(1))} style={dashboardState.selectedPage == 1 ? {borderRadius: "15px"} : {borderRadius: "15px", backgroundColor: "white"}}>
                <IconBoxMultiple  style={{ width: rem(30), height: rem(30) }}
                                 stroke={1.5}
                                 color={dashboardState.selectedPage == 1 ? "white" : "black"}>
                </IconBoxMultiple>
            </Button>

            <Button onClick={() => dispatch(setSelectedPage(2))} style={dashboardState.selectedPage == 2 ? {borderRadius: "15px"} : {borderRadius: "15px", backgroundColor: "white"}}>
                <IconFile3d  style={{ width: rem(30), height: rem(30) }}
                                     stroke={1.5}
                             color={dashboardState.selectedPage == 2 ? "white" : "black"}>
                </IconFile3d>
            </Button>

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 &&  <Button onClick={() => dispatch(setSelectedPage(3))} style={dashboardState.selectedPage == 3 ? {borderRadius: "15px"} : {borderRadius: "15px", backgroundColor: "white"}}>
                <IconBuildingWarehouse  style={{ width: rem(30), height: rem(30) }}
                                   stroke={1.5}
                                   color={dashboardState.selectedPage == 3 ? "white" : "black"}>
                </IconBuildingWarehouse>
            </Button>}

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 && <Button onClick={() => dispatch(setSelectedPage(4))} style={dashboardState.selectedPage == 4 ? {borderRadius: "15px"} : {borderRadius: "15px", backgroundColor: "white"}}>
                <IconFileAnalytics  style={{ width: rem(30), height: rem(30) }}
                                    stroke={1.5}
                                    color={dashboardState.selectedPage == 4 ? "white" : "black"}>
                </IconFileAnalytics>
            </Button>}
            
            
            {userState.userProfile?.role == 2 && <Button onClick={() => dispatch(setSelectedPage(5))} style={dashboardState.selectedPage == 5 ? {borderRadius: "15px"} : {borderRadius: "15px", backgroundColor: "white"}}>
                <IconUsersGroup  style={{ width: rem(30), height: rem(30) }}
                                 stroke={1.5}
                                 color={dashboardState.selectedPage == 5 ? "white" : "black"}>
                </IconUsersGroup>
            </Button>}

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 && <Button onClick={() => dispatch(setSelectedPage(6))} style={dashboardState.selectedPage == 6 ? {borderRadius: "15px"} : {borderRadius: "15px", backgroundColor: "white"}}>
                <IconAffiliate  style={{ width: rem(30), height: rem(30) }}
                                    stroke={1.5}
                                    color={dashboardState.selectedPage == 6 ? "white" : "black"}>
                </IconAffiliate>
            </Button>}


        </div>
    </AppShell.Footer>
}