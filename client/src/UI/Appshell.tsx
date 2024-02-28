
import { AppShell, Burger, Flex, Button } from '@mantine/core';
import { Header } from './Header';
import { MainScreen } from './MainScreen';
import { Menu } from './Menu';

export const Appshell = () => {
    return (
            <AppShell style={{overflow: "hidden"}}>
                <Header></Header>
                <MainScreen></MainScreen>
                <Menu></Menu>
            </AppShell>
        )
    
}