import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Card, Group, Modal, TextInput, Text} from '@mantine/core';
import { useState } from 'react';
import {useAppDispatch, useAppSelector } from '../Hooks';
import {createBuildingAsync, selectBuildings } from '../state/BuildingState';
import { Buildings } from './Management/Buildings';
import { Items } from './Management/Items';
import { RentContracts } from './Management/RentContracts';

export const ManagePanel = () => {

    const buildingsState = useAppSelector(selectBuildings)

    const dispatch = useAppDispatch()

    const [openedFacilityManagement, handlerDrawer] = useDisclosure(false);

    const [opened, setOpened] = useState("")

    return <div style={{padding: "15px"}}>

        <Buildings></Buildings>
        
    </div>
}