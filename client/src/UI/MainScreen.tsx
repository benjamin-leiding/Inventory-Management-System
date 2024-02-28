import { AppShell, Burger, Flex, Button, Drawer, Card, Text, Group, Badge, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import {useAppDispatch, useAppSelector } from '../Hooks';
import { getUsersAsync, selectAccounts } from '../state/AccountsState';
import { getBuildingsAsync } from '../state/BuildingState';
import { selectDashboard } from '../state/DashboardState';
import { getItemsAsync } from '../state/ItemState';
import { getAllRentContractsAsync, getOwnRentContractsAsync } from '../state/RentContractState';
import { selectUser } from '../state/UserState';
import { Accounts } from './Accounts';
import { AllRentContracts } from './AllRentContracts';
import { FindItems } from './FindItems';
import { Items } from './Management/Items';
import { ManagePanel } from './ManagePanel';
import { OwnRentContracts } from './OwnRentContracts';

export const MainScreen = () => {

    const dashboardState = useAppSelector(selectDashboard)
    const accountsState = useAppSelector(selectAccounts)
    const userState = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    // Use useEffect to run code after the component has mounted
    useEffect(() => {
        dispatch(getUsersAsync())
        dispatch(getBuildingsAsync())
        dispatch(getItemsAsync())
        dispatch(getAllRentContractsAsync())
        dispatch(getOwnRentContractsAsync())

    },[]) // The empty dependency array ensures that this effect runs only once after mount

    return <AppShell.Main style={{paddingTop: "50px", paddingBottom: "60px", overflow: "hidden"}}>
        {dashboardState.selectedPage == 1 && <div style={{overflow: "hidden"}}>

            {userState.userProfile!.role === 0 ? <FindItems></FindItems> : <Items></Items>}

        </div>}

        {dashboardState.selectedPage == 2 && <div>

            <OwnRentContracts></OwnRentContracts>

        </div>}

        {dashboardState.selectedPage == 3 && <div>

            <ManagePanel></ManagePanel>

        </div>}

        {dashboardState.selectedPage == 4 && <div>

            <AllRentContracts></AllRentContracts>

        </div>}

        {dashboardState.selectedPage == 5 && <Accounts></Accounts>}


    </AppShell.Main>
}