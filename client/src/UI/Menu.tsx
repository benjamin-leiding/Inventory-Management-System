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
        <Flex h={"100%"} align={"center"} justify={"space-evenly"} bg={"#2E2E2E"}>
            <Button
                onClick={() => dispatch(setSelectedPage(1))}
                variant={dashboardState.selectedPage == 1 ? "" : "light"}
                color={"pink.3"}
                autoContrast
                style={{borderRadius: "15px"}}>
                <IconBoxMultiple
                    style={{ width: rem(30), height: rem(30) }}
                    stroke={1.5}></IconBoxMultiple>
            </Button>

            <Button
                onClick={() => dispatch(setSelectedPage(2))}
                variant={dashboardState.selectedPage == 2 ? "" : "light"}
                color={"pink.3"}
                autoContrast
                style={{borderRadius: "15px"}}>
                <IconFile3d  style={{ width: rem(30), height: rem(30) }}
                                     stroke={1.5}>
                </IconFile3d>
            </Button>

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 &&
                <Button onClick={() => dispatch(setSelectedPage(3))}
                        variant={dashboardState.selectedPage == 3 ? "" : "light"}
                        color={"pink.3"}
                        autoContrast
                        style={{borderRadius: "15px"}}>
                <IconBuildingWarehouse  style={{ width: rem(30), height: rem(30) }}
                                   stroke={1.5}>
                </IconBuildingWarehouse>
            </Button>}

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 &&
                <Button onClick={() => dispatch(setSelectedPage(4))}
                        variant={dashboardState.selectedPage == 4 ? "" : "light"}
                        color={"pink.3"}
                        autoContrast
                        style={{borderRadius: "15px"}}
                >
                <IconFileAnalytics  style={{ width: rem(30), height: rem(30) }}
                                    stroke={1.5}>
                </IconFileAnalytics>
            </Button>}
            
            
            {userState.userProfile?.role == 2 &&
                <Button
                    onClick={() => dispatch(setSelectedPage(5))}
                    variant={dashboardState.selectedPage == 5 ? "" : "light"}
                    color={"pink.3"}
                    autoContrast
                    style={{borderRadius: "15px"}}
                >
                <IconUsersGroup  style={{ width: rem(30), height: rem(30) }}
                                 stroke={1.5}>
                </IconUsersGroup>
            </Button>}

            {userState.userProfile?.role != undefined && userState.userProfile?.role >= 1 &&
                <Button onClick={() => dispatch(setSelectedPage(6))}
                        variant={dashboardState.selectedPage == 6 ? "" : "light"}
                        color={"pink.3"}
                        autoContrast
                        style={{borderRadius: "15px"}}
                >
                <IconAffiliate  style={{ width: rem(30), height: rem(30) }}
                                    stroke={1.5}>
                </IconAffiliate>
            </Button>}
        </Flex>
    </AppShell.Footer>
}

