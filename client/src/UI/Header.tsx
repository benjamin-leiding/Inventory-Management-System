import { AppShell, Burger, Flex, Button, Drawer, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {useAppDispatch, useAppSelector } from '../Hooks';
import {logout, selectUser } from '../state/UserState';
import QRCode from "react-qr-code";
import { Card, Image, Text, Badge, Group } from '@mantine/core';
import { IconUserBolt, IconUserShare } from '@tabler/icons-react'
import { rem } from '@mantine/core';
import {selectDashboard, setSelectedPage } from '../state/DashboardState';
export const Header = () => {

    const userState = useAppSelector(selectUser)
    const dashboardState = useAppSelector(selectDashboard)
    const dispatch = useAppDispatch()

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <AppShell.Header>
            <Flex
                gap="md"
                justify="space-between"
                align="center"
                direction="row"
                h="50px"
                pr={"15px"}
                pl={"15px"}
            >
                {dashboardState.selectedPage == 1 && <>{userState.userProfile!.role === 0 ? <h4>Find Items</h4> : <h4>Item Management</h4>}</>}
                {dashboardState.selectedPage == 2 && <h4>My rented Items</h4>}
                {dashboardState.selectedPage == 3 && <h4>Facility Management</h4>}
                {dashboardState.selectedPage == 4 && <h4>All Rent Contracts</h4>}
                {dashboardState.selectedPage == 5 && <h4>Account Management</h4>}

                <UnstyledButton onClick={open}><IconUserShare  style={{ width: rem(30), height: rem(30) }}
                                                      stroke={1.5}
                                                      color="#1C7ED6"></IconUserShare></UnstyledButton>
            </Flex>
            <Drawer opened={opened} onClose={close} position="top" size="xl" title="User Profile">
                <Card shadow="sm" padding="lg" radius="md" withBorder>

                    <Group justify="space-between" mt="md" mb="xs" >
                        <Text fw={500}>Hello {userState.userProfile?.username}!</Text>
                        <Badge color={userState.userProfile?.role == 2 ? "orange" : userState.userProfile?.role == 1 ? "yellow": "green"}>{userState.userProfile?.role == 0 ? " student" :
                            userState.userProfile?.role == 1 ? " employee" :
                                userState.userProfile?.role == 2 ? " Professer" :
                                    "impossible"
                        }</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                        Id
                    </Text>
                    <Text>
                        {userState.userProfile?._id}
                    </Text>

                    <Text size="sm" c="dimmed">
                        Email
                    </Text>
                    <Text>
                        {userState.userProfile?.email}
                    </Text>

                    <Text size="sm" c="dimmed">
                        Created
                    </Text>
                    <Text>
                        {Intl.DateTimeFormat("de-DE", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            timeZone: "UTC",
                        }).format(new Date(userState.userProfile!.createdAt))}
                    </Text>


                    <Card.Section>
                        <div style={{   width: "100%", display: "flex", justifyContent: "center", padding: "25px" }}>
                            <QRCode
                                size={256}
                                style={{ height: "auto",  width: "80%" }}
                                value={userState.userProfile!._id}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </Card.Section>
                    <div>
                        <Button onClick={() => {dispatch(setSelectedPage(1));dispatch(logout())}} color={"grey"}>Logout</Button>
                    </div>

                </Card>

            </Drawer>
        </AppShell.Header>
    )
}