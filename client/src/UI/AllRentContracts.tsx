import {Badge, Button, Card, Tabs, Text } from "@mantine/core"
import { useAppSelector } from "../Hooks"
import { selectRentContracts } from "../state/RentContractState"
import { IconArrowBack, IconTrash , IconBoxModel, IconFile3d, IconCube, IconUserBolt,IconUserCheck,IconUserShare} from '@tabler/icons-react'
import { useState } from "react"
import { RentContract } from "../Models/RentContract"
import { RentContracts } from "./Management/RentContracts"
import { selectHistoryContracts } from "../state/HistoryContractState"

export const AllRentContracts = () => {

    const contractState = useAppSelector(selectRentContracts)

    const historyContractState = useAppSelector(selectHistoryContracts)

    const [openedScreen, setOpenedScreen] = useState("Contracts")

    const [contract, setContract] = useState<RentContract | null>()

    return <div style={{padding: "15px"}}>



        {openedScreen === "Contracts" && <>
            <RentContracts></RentContracts>
            <br />
            <Tabs defaultValue="Active User">
                <Tabs.List>
                    <Tabs.Tab value="Active User" >
                        User
                    </Tabs.Tab>
                    <Tabs.Tab value="Active Project">
                        Project
                    </Tabs.Tab>
                    <Tabs.Tab value="History">
                        History
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Active User">
                    {contractState.rentContracts.length === 0 ? <Text>There are no active user rentcontracts</Text>: <br></br>}

                    {sortRentContractsByExpires(filterContractTypeUser(contractState.rentContracts)).map(contract => {
                        return <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div>
                                    <Text  size="sm" c="dimmed">Itemname</Text>
                                    <Text>{contract.itemName}</Text>
                                </div>


                                <div>
                                    <Text  size="sm" c="dimmed">Borrower</Text>
                                    <Text>{contract.rentUserUserName}</Text>
                                </div>

                            </div>
                            <br/>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div>
                                    <Text  size="sm" c="dimmed">{isDateInPast(new Date(contract.expires)) ? "Expired" : "Expires"}</Text>
                                    <Badge color={isDateInPast(new Date(contract.expires)) ? "red" : "green"}><Text>
                                        {Intl.DateTimeFormat("de-DE", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            timeZone: "UTC",
                                        }).format(new Date(contract.expires))}
                                    </Text></Badge>
                                </div>


                                <Button
                                    style={{borderRadius: "15px"}}
                                    onClick={() => {
                                        setOpenedScreen("Contract")
                                        setContract(contract)
                                    }}>Details</Button>
                            </div>

                        </Card>
                    })}
                </Tabs.Panel>

                <Tabs.Panel value="Current Project">
                    {contractState.rentContracts.length === 0 ? <Text>There are no active Project rentcontracts</Text>: <br></br>}

                    {sortRentContractsByExpires(contractState.rentContracts).map(contract => {
                        return <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div>
                                    <Text  size="sm" c="dimmed">Itemname</Text>
                                    <Text>{contract.itemName}</Text>
                                </div>


                                <div>
                                    <Text  size="sm" c="dimmed">Borrower</Text>
                                    <Text>{contract.rentUserUserName}</Text>
                                </div>

                            </div>
                            <br/>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div>
                                    <Text  size="sm" c="dimmed">{isDateInPast(new Date(contract.expires)) ? "Expired" : "Expires"}</Text>
                                    <Badge color={isDateInPast(new Date(contract.expires)) ? "red" : "green"}><Text>
                                        {Intl.DateTimeFormat("de-DE", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            timeZone: "UTC",
                                        }).format(new Date(contract.expires))}
                                    </Text></Badge>
                                </div>


                                <Button
                                    style={{borderRadius: "15px"}}
                                    onClick={() => {
                                        setOpenedScreen("Contract")
                                        setContract(contract)
                                    }}>Details</Button>
                            </div>

                        </Card>
                    })}
                </Tabs.Panel>

                <Tabs.Panel value="History">
                    {historyContractState.historyContracts.length === 0 ? <Text>There are no history rentcontracts</Text>: <br></br>}

                    {sortRentContractsByExpires(historyContractState.historyContracts).map(contract => {
                        return <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div>
                                    <Text  size="sm" c="dimmed">Itemname</Text>
                                    <Text>{contract.itemName}</Text>
                                </div>


                                <div>
                                    <Text  size="sm" c="dimmed">Borrower</Text>
                                    <Text>{contract.rentUserUserName}</Text>
                                </div>

                            </div>
                            <br/>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <div>
                                    <Text  size="sm" c="dimmed">{isDateInPast(new Date(contract.expires)) ? "Expired" : "Expires"}</Text>
                                    <Badge color={isDateInPast(new Date(contract.expires)) ? "red" : "green"}><Text>
                                        {Intl.DateTimeFormat("de-DE", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            timeZone: "UTC",
                                        }).format(new Date(contract.expires))}
                                    </Text></Badge>
                                </div>


                                <Button
                                    style={{borderRadius: "15px"}}
                                    onClick={() => {
                                        setOpenedScreen("Contract")
                                        setContract(contract)
                                    }}>Details</Button>
                            </div>

                        </Card>
                    })}
                </Tabs.Panel>

            </Tabs>


        </>}

        {openedScreen === "Contract" && contract && <>
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                <Button color="lightgrey" style={{marginRight: "15px", padding: "5px"}} onClick={() => {setOpenedScreen("Contracts"); setContract(null)}}>
                    <IconArrowBack />
                </Button>
                <h4 style={{margin: "0px"}}>Contract</h4>

            </div>

            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap:"15px"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "80px"}}>
                    <IconCube></IconCube>
                    <Text>Item</Text>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Text  size="sm" c="dimmed">Id</Text>
                    <Text>{contract.itemId}</Text>

                    <Text  size="sm" c="dimmed">Name</Text>
                    <Text>{contract.itemName}</Text>
                </div>
            </div>
            <br/>
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap:"15px"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "80px"}}>
                    <IconFile3d></IconFile3d>
                    <Text>Contract</Text>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Text  size="sm" c="dimmed">Created</Text>
                    <Text>{Intl.DateTimeFormat("de-DE", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        timeZone: "UTC",
                    }).format(new Date(contract.createdAt))}</Text>

                    <Text  size="sm" c="dimmed">Expires</Text>
                    <Badge color={isDateInPast(new Date(contract.expires)) ? "red" : "green"}><Text>
                        {Intl.DateTimeFormat("de-DE", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            timeZone: "UTC",
                        }).format(new Date(contract.expires))}
                    </Text></Badge>

                </div>
            </div>
            <br/>
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap:"15px"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "80px"}}>
                    <IconUserShare></IconUserShare>
                    <Text>Borrower</Text>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Text  size="sm" c="dimmed">Id</Text>
                    <Text>{contract.rentUserId}</Text>

                    <Text  size="sm" c="dimmed">Name</Text>
                    <Text>{contract.rentUserUserName}</Text>


                    <Text  size="sm" c="dimmed">Email</Text>
                    <Text>{contract.rentUserEmail}</Text>
                </div>
            </div>
            <br/>
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap:"15px"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "80px"}}>
                    <IconUserCheck></IconUserCheck>
                    <Text>Contractor</Text>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    <Text  size="sm" c="dimmed">Id</Text>
                    <Text>{contract.contractorId}</Text>

                    <Text  size="sm" c="dimmed">Name</Text>
                    <Text>{contract.contractorUserName}</Text>

                    <Text  size="sm" c="dimmed">Email</Text>
                    <Text>{contract.contractorEmail}</Text>
                </div>
            </div>
        </>}
    </div>
}

export function isDateInPast(date: Date): boolean {
    const now = new Date();
    return date < now;
}

export function sortRentContractsByExpires(contracts: RentContract[]): RentContract[] {
    // Sorting the contracts array by the expires date in ascending order
    const sortedContracts = [...contracts].sort((a, b) => new Date(a.expires).getTime() - new Date(b.expires).getTime());
    return sortedContracts;
}

export function filterContractTypeUser(contracts: RentContract[]):RentContract[]{
    return contracts.filter(contract => contract.contractType == "User")
}