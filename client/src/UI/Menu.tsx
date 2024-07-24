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
        <Flex h={"100%"} align={"center"} justify={"space-evenly"}>
            <Button onClick={() => dispatch(setSelectedPage(1))} style={dashboardState.selectedPage == 1 ? {borderRadius: "15px", backgroundColor: "#c4ad83"} : {borderRadius: "15px", backgroundColor: "#242424", paddingRight: "15px", paddingLeft: "15px"}}>
                <IconBoxMultiple  style={{ width: rem(30), height: rem(30) }}
                                 stroke={1.5}
                                 color={dashboardState.selectedPage == 1 ? "#2E2E2E" : "#c4ad83"}>
                </IconBoxMultiple>
            </Button>

            <Button onClick={() => dispatch(setSelectedPage(2))} style={dashboardState.selectedPage == 2 ? {borderRadius: "15px", backgroundColor: "#c4ad83"} : {borderRadius: "15px", backgroundColor: "#242424", paddingRight: "15px", paddingLeft: "15px"}}>
                <IconFile3d  style={{ width: rem(30), height: rem(30) }}
                                     stroke={1.5}
                             color={dashboardState.selectedPage == 2 ? "#2E2E2E" : "#c4ad83"}>
                </IconFile3d>
            </Button>

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 &&  <Button onClick={() => dispatch(setSelectedPage(3))} style={dashboardState.selectedPage == 3 ? {borderRadius: "15px", backgroundColor: "#c4ad83"} : {borderRadius: "15px", backgroundColor: "#242424", paddingRight: "15px", paddingLeft: "15px"}}>
                <IconBuildingWarehouse  style={{ width: rem(30), height: rem(30) }}
                                   stroke={1.5}
                                   color={dashboardState.selectedPage == 3 ? "#2E2E2E" : "#c4ad83"}>
                </IconBuildingWarehouse>
            </Button>}

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 && <Button onClick={() => dispatch(setSelectedPage(4))} style={dashboardState.selectedPage == 4 ? {borderRadius: "15px", backgroundColor: "#c4ad83"} : {borderRadius: "15px", backgroundColor: "#242424", paddingRight: "15px", paddingLeft: "15px"}}>
                <IconFileAnalytics  style={{ width: rem(30), height: rem(30) }}
                                    stroke={1.5}
                                    color={dashboardState.selectedPage == 4 ? "#2E2E2E" : "#c4ad83"}>
                </IconFileAnalytics>
            </Button>}
            
            
            {userState.userProfile?.role == 2 && <Button onClick={() => dispatch(setSelectedPage(5))} style={dashboardState.selectedPage == 5 ? {borderRadius: "15px", backgroundColor: "#c4ad83", } : {borderRadius: "15px", backgroundColor: "#242424", paddingRight: "15px", paddingLeft: "15px"}}>
                <IconUsersGroup  style={{ width: rem(30), height: rem(30) }}
                                 stroke={1.5}
                                 color={dashboardState.selectedPage == 5 ? "#2E2E2E" : "#c4ad83"}>
                </IconUsersGroup>
            </Button>}

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 && <Button onClick={() => dispatch(setSelectedPage(6))} style={dashboardState.selectedPage == 6 ? {borderRadius: "15px", backgroundColor: "#c4ad83"} : {borderRadius: "15px", backgroundColor: "#242424", paddingRight: "15px", paddingLeft: "15px"}}>
                <IconAffiliate  style={{ width: rem(30), height: rem(30) }}
                                    stroke={1.5}
                                    color={dashboardState.selectedPage == 6 ? "#2E2E2E" : "#c4ad83"}>
                </IconAffiliate>
            </Button>}


        </Flex>
    </AppShell.Footer>
}