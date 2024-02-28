import {Card, Group, TextInput, Text, Badge, Button, Switch, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconArrowBack } from "@tabler/icons-react"
import axios from "axios"
import { useState } from "react"
import { BackendBaseUrl } from "../Arch/Urls"
import { useAppSelector } from "../Hooks"
import { Item } from "../Models/Item"
import { selectItems } from "../state/ItemState"
import { selectUser } from "../state/UserState"
import { Items } from "./Management/Items"

export const FindItems = () => {

    const userState = useAppSelector(selectUser)

    const [searchTerm, setSearchTerm] = useState("")

    const [screen, setScreen] = useState("Items")

    const [item, setItem] = useState<Item | null>(null)

    const [onlyAvailable, setOnlyAvailable] = useState(false)

    const [openedItemManagement, handlerDrawer] = useDisclosure(false);

    const itemState = useAppSelector(selectItems)

    return <div style={{padding: "15px"}}>

        <Drawer size={"xl"} opened={openedItemManagement} onClose={handlerDrawer.close} position={"top"}>
            <Items></Items>
        </Drawer>
        {screen === "Items" && <>
            {userState.userProfile!.role >= 1 && <div>
                <Button style={{marginBottom: "15px"}} onClick={handlerDrawer.open}>Item Management</Button>
            </div>}

            <TextInput
                mb={"15px"}
                description="Find Item"
                type={"email"}
                onChange={(event) => {setSearchTerm(event.target.value)}}
            />
            <Switch
                checked={onlyAvailable}
                onChange={(event) => setOnlyAvailable(event.currentTarget.checked)}
                label={"Only show available Items"}
            />
            <br/>
            {filterItemsByRentedOut(filterItemsBySearchTerm(itemState.items, searchTerm), onlyAvailable).map(item => {
                return <div>
                    <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                        <Text  size="xs" c="dimmed">Id: {item._id}</Text>
                        <Text  size="xs" c="dimmed">Name</Text>
                        <Text size={"sm"}>{item.name}</Text>
                        <Text size="xs" c="dimmed">Description</Text>
                        <Text size={"sm"} mb={"xs"}>{item.description}</Text>
                        <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "15px"}}>
                            {
                                item.rentedOut && <Badge color={"red"} size="sm" mb={"5px"}>
                                    rented out
                                </Badge>
                            }
                            <Button onClick={() => {
                                setItem(item)
                                setScreen("Item")
                            }}>Details</Button>
                        </div>

                    </Card>
                </div>
            })}
        </>}
        {
            screen === "Item" &&  <>
                <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "15px"}}>
                    <Button color="lightgrey" style={{marginRight: "15px", padding: "5px"}} onClick={() => {setScreen("Items"); setItem(null)}}>
                        <IconArrowBack />
                    </Button>
                    <h4 style={{margin: "0px"}}>Item</h4>
                </div>




                    <img src={BackendBaseUrl + "/image/" + item!.imageUrl} ></img>

                    <Text  size="sm" c="dimmed">Id</Text>
                    <Text  mb={"xs"}>{item?._id}</Text>

                    <Text  size="sm" c="dimmed">Name</Text>
                    <Text  mb={"xs"}>{item?.name}</Text>

                    <Text size="sm" c="dimmed">Description</Text>
                    <Text mb={"xs"}>{item?.description}</Text>

                    <Text  size="sm" c="dimmed">Deposition</Text>
                    <Text  mb={"xs"}>{item?.deposition}</Text>

                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Badge size="sm" mb={"5px"}>
                            Created: {Intl.DateTimeFormat("de-DE", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            timeZone: "UTC",
                        }).format(new Date(item!.createdAt))}
                        </Badge>
                        {
                            item?.rentedOut && <Badge color={"red"} size="sm" mb={"5px"}>
                                rented out
                            </Badge>
                        }

                    </div>
            </>
        }

    </div>
}

function filterItemsBySearchTerm(items: Item[], searchString: string): Item[] {
    const lowerSearchString = searchString.toLowerCase();
    return items.filter(item => {
        const { _id, name, description, rentedOut } = item;
        return (
            _id.toLowerCase().includes(lowerSearchString) ||
            name.toLowerCase().includes(lowerSearchString) ||
            description.toLowerCase().includes(lowerSearchString)
        );
    });
}

function filterItemsByRentedOut(items: Item[], rentedOut: boolean): Item[] {
    if (rentedOut) {
        return items.filter(item => !item.rentedOut);
    } else {
        return items;
    }
}
