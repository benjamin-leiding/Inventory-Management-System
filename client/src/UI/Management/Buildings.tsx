import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"
import {useAppDispatch, useAppSelector } from "../../Hooks"
import {createBuildingAsync, deleteBuildingAsync, getBuildingsAsync, selectBuildings } from "../../state/BuildingState"
import { Drawer, Button, Card, Group, Modal, TextInput, Text, UnstyledButton, NumberInput} from '@mantine/core';

import { IconArrowBack, IconTrash } from '@tabler/icons-react'
import { createRoomAsync, deleteRoomAsync } from "../../state/RoomState";
import {createShelfAsync, deleteShelfAsync} from "../../state/ShelfState";
import { Building } from "../../Models/Building";
import { getItemsAsync } from "../../state/ItemState";
import QRCode from "react-qr-code";

export const Buildings = () => {

    const buildingsState = useAppSelector(selectBuildings)

    const dispatch = useAppDispatch()


    const [opened, setOpened] = useState("Buildings")




    const [openedCreateBuilding, handlerCreateBuilding] = useDisclosure(false)

    const [openedDeleteBuilding, handlerDeleteBuilding] = useDisclosure(false)

    const [building, setBuilding] = useState<Building>()

    const [buildingId, setBuildingId] = useState("")

    const [buildingName, setBuildingName] = useState("")

    const [address, setAddress] = useState("")


    const [openedCreateRoom, handlerCreateRoom] = useDisclosure(false)

    const [openedDeleteRoom, handlerDeleteRoom] = useDisclosure(false)

    const [roomName, setRoomName] = useState("")

    const [roomFloor, setRoomFloor] = useState(0)

    const [roomId, setRoomId] = useState("")


    const [openedCreateShelf, handlerCreateShelf] = useDisclosure(false)

    const [openedDeleteShelf, handlerDeleteShelf] = useDisclosure(false)

    const [shelfName, setShelfName] = useState("")

    const [shelfId, setShelfId] = useState("")


    const [openedShelfQr, handlerShelfQr] = useDisclosure(false)

    return <>
        <Modal opened={openedCreateBuilding} onClose={handlerCreateBuilding.close} title="Create Building">
            <TextInput
                description="Building Name"
                type={"text"}
                value={buildingName}
                onChange={(event) => setBuildingName(event.currentTarget.value)}
            />
            <br />
            <TextInput
                description="Address"
                type={"text"}
                value={address}
                onChange={(event) => setAddress(event.currentTarget.value)}
            />
            <br />
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(createBuildingAsync({name: buildingName, address: address})).unwrap().then( () => {
                        handlerCreateBuilding.close()
                        dispatch(getBuildingsAsync())
                        setBuildingName("")
                        setAddress("")
                    })
                }}>Create</Button>
            </div>
        </Modal>

        <Modal opened={openedCreateRoom} onClose={handlerCreateRoom.close} title="Create Room">
            <TextInput
                description="Room Name"
                type={"text"}
                value={roomName}
                onChange={(event) => setRoomName(event.currentTarget.value)}
            />
            <br />
            <NumberInput
                description="Room Floor"
                value={roomFloor}
                onChange={(event) => setRoomFloor(event as number)}
            />
            <br />
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(createRoomAsync({name: roomName, floor: roomFloor, buildingId: buildingId})).unwrap().then( () => {
                        handlerCreateRoom.close();
                        dispatch(getBuildingsAsync())
                        setRoomName("")
                        setRoomFloor(0)
                    }

                    )
                }}>Create</Button>
            </div>
        </Modal>

        <Modal opened={openedCreateShelf} onClose={handlerCreateShelf.close} title="Create Room">
            <TextInput
                description="Shelf Name"
                type={"text"}
                value={shelfName}
                onChange={(event) => setShelfName(event.currentTarget.value)}
            />
            <br />
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(createShelfAsync({name: shelfName, roomId: roomId})).unwrap().then( () => {
                            handlerCreateShelf.close();
                            dispatch(getBuildingsAsync())
                        })
                }}>Create</Button>
            </div>
        </Modal>

        <Modal opened={openedDeleteShelf} onClose={handlerDeleteShelf.close} title="Delete Shelf">
            <Text size="sm" c="dimmed">Do you wanna delete this shelf?</Text>
            <Text>{shelfName}</Text>
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(deleteShelfAsync(shelfId)).unwrap().then( () => {
                        handlerDeleteShelf.close();
                        setShelfName("")
                        setShelfId("")
                        dispatch(getBuildingsAsync())
                    })
                }}>Delete</Button>
            </div>
        </Modal>

        <Modal opened={openedDeleteBuilding} onClose={handlerDeleteBuilding.close} title="Delete Building">
            <Text c="dimmed">Do you really want to delete this Building? All Rooms inside, Shelfs and Depositions will be irreversibly gone</Text>
            <Text >Building: {building?.name}</Text>
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(deleteBuildingAsync(building!._id)).unwrap().then(() => {
                        handlerDeleteBuilding.close()
                        dispatch(getBuildingsAsync())
                        dispatch(getItemsAsync())
                    })
                }}>Delete</Button>
            </div>
        </Modal>

        <Modal opened={openedDeleteRoom} onClose={handlerDeleteRoom.close} title="Delete Room">
            <Text c="dimmed">Do you really want to delete this Room? All Shelfs inside and Depositions will be irreversibly gone</Text>
            <Text>Room: {roomName}</Text>
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(deleteRoomAsync(roomId)).unwrap().then(() => {
                        handlerDeleteRoom.close()
                        dispatch(getBuildingsAsync())
                        dispatch(getItemsAsync())
                    })
                }}>Delete</Button>
            </div>
        </Modal>


        {opened == "Buildings" && <>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h4>Buildings</h4>
                <Button style={{marginRight: "10px"}} onClick={handlerCreateBuilding.open}>Create</Button>
            </div>
            {
                buildingsState.buidlings.map(building => {
                    return <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                                <Text  size="sm" c="dimmed">Name</Text>
                                <Text>{building.name}</Text>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                                <Text  size="sm" c="dimmed">Rooms</Text>
                                <Text>{building.rooms?.length}</Text>
                            </div>
                        </Group>
                        <Text size="sm" c="dimmed">Address</Text>
                        <Text mb={"xs"}>{building.address}</Text>
                        <div style={{display: "flex", justifyContent: "flex-end", gap: "15px"}}>
                            <Button onClick={() => {
                                setBuilding(building)
                                handlerDeleteBuilding.open()

                            }}><IconTrash /></Button>
                            <Button onClick={() => {
                                setOpened("Building")
                                setBuildingId(building._id)
                            }}>Details</Button>
                        </div>
                    </Card>
                })
            }
        </>}

        {opened == "Building" && <>
            {buildingsState.buidlings.map(building => {
                if(building._id == buildingId){
                    return <>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                            <Button color="lightgrey" style={{marginRight: "15px", padding: "5px"}} onClick={() => {setOpened("Buildings"); setBuildingId("")}}>
                                <IconArrowBack />
                            </Button>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <Text size="sm" c="dimmed" >Building</Text>
                                <h4 style={{margin: "0px"}}>{building.name}</h4>
                            </div>

                        </div>
                        <Text size="sm" c="dimmed" mt="15px">Address</Text>
                        <h4 style={{margin: "0px"}}>{building.address}</h4>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px",marginTop: "7px", paddingTop: "7px", borderTop: "1px solid lightgrey", paddingRight: "10px"}}>
                            <Text size="sm" c="dimmed">Rooms</Text>
                            <Button onClick={handlerCreateRoom.open}>Create</Button>
                        </div>

                        {
                            building.rooms?.map(roomPreview => {
                                return <>
                                    <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                                <Text size="sm" c="dimmed" >Roomname</Text>
                                                <Text>{roomPreview.name}</Text>
                                            </div>

                                            <div style={{display: "flex", flexDirection: "column"}}>
                                                <Text size="sm" c="dimmed" >Shelfs</Text>
                                                <Text>{roomPreview.shelfs?.length}</Text>
                                            </div>
                                        </div>

                                        <div style={{display: "flex", justifyContent: "flex-end", gap: "15px"}}>
                                            <Button onClick={() => {
                                                handlerDeleteRoom.open()
                                                setRoomId(roomPreview._id)
                                                setRoomName(roomPreview.name)
                                            }}>
                                                <IconTrash />
                                            </Button>
                                            <Button onClick={() => {
                                                setOpened("Room")
                                                setRoomId(roomPreview._id)
                                            }}>Details</Button>
                                        </div>



                                    </Card>

                                </>
                            })
                        }
                    </>
                }
            })}
        </>}
        {opened === "Room" && buildingsState.buidlings.map(building => {
                    return building.rooms?.map(room => {
                            return room._id === roomId && <><div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                                    <Button color="lightgrey" style={{marginRight: "15px", padding: "5px"}} onClick={() => {setOpened("Building");}}>
                                        <IconArrowBack />
                                    </Button>
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <Text size="sm" c="dimmed" >Room</Text>
                                        <h4 style={{margin: "0px"}}>{room.name}</h4>
                                    </div>

                                </div>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px",marginTop: "7px", paddingTop: "7px", borderTop: "1px solid lightgrey", paddingRight: "10px"}}>
                                    <Text size="sm" c="dimmed">Shelfs</Text>
                                    <Button onClick={handlerCreateShelf.open}>Create</Button>
                                </div>
                                {room.shelfs?.map(shelf => {
                                    return <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>

                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <Text size="sm" c="dimmed" >ShelfId</Text>
                                            <Text>{shelf._id}</Text>
                                        </div>

                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                                <Text size="sm" c="dimmed" >Shelfname</Text>
                                                <Text>{shelf.name}</Text>
                                            </div>
                                            <div style={{display: "flex", flexDirection: "column"}}>
                                                <Text size="sm" c="dimmed" >Shelfnumber</Text>
                                                <Text>{shelf.number}</Text>
                                            </div>
                                        </div>

                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
                                            <Modal opened={openedShelfQr} onClose={handlerShelfQr.close} title="Shelf Qr-Code">

                                                <Text  size="sm" c="dimmed">Id</Text>
                                                <Text>{shelf._id}</Text>
                                                <Text  size="sm" c="dimmed">Name</Text>
                                                <Text>{shelf.name}</Text>
                                                <div style={{   width: "100%", display: "flex", justifyContent: "center", padding: "25px" }}>
                                                    <QRCode
                                                        size={256}
                                                        style={{ height: "auto",  width: "80%" }}
                                                        value={shelf._id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </div>
                                                <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                                                    <Button onClick={() => {
                                                        handlerShelfQr.close()
                                                    }}>Print Qr-Code</Button>
                                                </div>
                                            </Modal>
                                            <Button onClick={handlerShelfQr.open}>Qr-code</Button>
                                            <Button onClick={() => {
                                                setShelfId(shelf._id);
                                                setShelfName(shelf.name)
                                                handlerDeleteShelf.open()
                                            }}><IconTrash /></Button>
                                        </div>

                                    </Card>
                                })}
                                </>
                            })
                    })
        }
    </>
}