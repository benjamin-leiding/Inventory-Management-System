import { Button, Card, Group, Modal, Textarea, TextInput, Text, Badge, Switch, Drawer, Flex } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {useCallback, useRef, useState } from "react"
import {useAppDispatch, useAppSelector } from "../../Hooks"
import {
    createItemAsync,
    deleteItemAsync,
    editItemAsync,
    getItemsAsync,
    printItemAsync,
    selectItems,
    updateImgItemAsync
} from "../../state/ItemState"
import { IconArrowBack, IconTrash , IconEdit, IconQrcode, IconCamera} from '@tabler/icons-react'
import { Item } from "../../Models/Item"
import Webcam from "react-webcam";
import { createDepositionAsync } from "../../state/DepositionState"
import axios from "axios"
import { BackendBaseUrl } from "../../Arch/Urls"
import { Keys } from "../../Arch/keys"
import { QrScanner } from "@yudiel/react-qr-scanner"
import QRCode from "react-qr-code"

export const Items = () => {

    const itemState = useAppSelector(selectItems)

    const dispatch = useAppDispatch()



    const [openedScreen, setOpenedScreen] = useState("Items")



    const [searchTerm, setSearchTerm] = useState("")

    const [onlyAvailable, setOnlyAvailable] = useState(false)



    const [openedCreateItem, handlerCreateItem] = useDisclosure(false)

    const [openedEditItem, handlerEditItem] = useDisclosure(false)

    const [openedDeleteItem , handlerDeleteItem] = useDisclosure(false)

    const [openedDepositItem, handlerDepositItem] = useDisclosure(false)

    const [openedUpdateImgItem, handlerUpdateImgItem] = useDisclosure(false)

    const [openedQrItem, handlerCodeItem] = useDisclosure(false)




    const [item, setItem] = useState<Item | null>()

    const [itemId, setItemId] = useState("")

    const [itemName, setItemName] = useState("")

    const [itemDescription, setItemDescription] = useState("")

    const [shelfId, setShelfId] = useState("")

    const [qrScanneritemId, setQrScanneritemId] = useState(false)

    const [qrScannerShelfId, setQrScannerShelfId] = useState(false)


    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
        }
    }, [webcamRef]);

    return <div style={{padding: "15px"}}>

        <Modal opened={openedDepositItem} onClose={() => {
            handlerDepositItem.close()
            setItemId("")
        }} title="Deposit Item">
            <div style={{display: "flex", flexDirection: "column", borderRadius: "5px", border: qrScanneritemId ? "2px solid #1C7ED6" : "", padding: qrScanneritemId ? "5px" : "0px" }}>
                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                    <TextInput
                        description="ItemId"
                        value={itemId}
                        onChange={(event) => setItemId(event.currentTarget.value)}
                    />
                    <Button style={{}} onClick={() => {
                        setQrScanneritemId(!qrScanneritemId)
                        setQrScannerShelfId(false)
                    }}>Qr</Button>
                </div>
                {
                    qrScanneritemId &&  <div style={{marginTop: "15px"}}>
                        <QrScanner
                            onDecode={(result) => {
                                setItemId(result)
                                setQrScanneritemId(false)
                                console.log(result)
                            }}
                            onError={(error) => console.log(error?.message)}
                        />
                    </div>
                }
            </div>

            <div style={{display: "flex", flexDirection: "column", borderRadius: "5px", border: qrScannerShelfId ? "2px solid #1C7ED6" : "", padding: qrScannerShelfId ? "5px" : "0px" }}>
                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                    <TextInput
                        description="ShelfId"
                        value={shelfId}
                        onChange={(event) => setShelfId(event.currentTarget.value)}
                    />
                    <Button onClick={() => {
                        setQrScannerShelfId(!qrScannerShelfId)
                        setQrScanneritemId(false)
                    }}>Qr</Button>
                </div>
                {
                    qrScannerShelfId &&  <div style={{marginTop: "15px"}}>
                        <QrScanner
                            onDecode={(result) => {
                                setShelfId(result)
                                setQrScannerShelfId(false)
                                console.log(result)
                            }}
                            onError={(error) => console.log(error?.message)}
                        />
                    </div>
                }
            </div>

            <br />
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(createDepositionAsync({itemId: itemId, shelfId: shelfId})).unwrap().then(
                        () => {
                            dispatch(getItemsAsync())
                            handlerDepositItem.close()
                        }
                    )

                }}>Deposit</Button>
            </div>
        </Modal>

        <Modal opened={openedCreateItem} onClose={() => {
            handlerCreateItem.close()
            setItemId("")
            setItemName("")
            setItemDescription("")
        }} title="Create Item">
            <TextInput
                description="Item Name"
                type={"text"}
                value={itemName}
                onChange={(event) => setItemName(event.currentTarget.value)}
            />
            <br />
            <Textarea
                description="Description"
                value={itemDescription}
                onChange={(event) => setItemDescription(event.currentTarget.value)}
            />
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
                <Text  size="sm" c="dimmed">Image</Text>
                {isCaptureEnable || (
                    <Button onClick={() => {setCaptureEnable(true);  setUrl(null);}}>Open Camera</Button>
                )}
                {isCaptureEnable && (<Button onClick={() => setCaptureEnable(false)}>Close Camera</Button>)}
            </div>

            {isCaptureEnable && (
                <>
                    <div>

                    </div>
                    <div>
                        <Webcam
                            allowFullScreen={true}
                            audio={false}
                            width={"100%"}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                    <Button onClick={() => {
                        capture()
                        setCaptureEnable(false)
                    }}>Take Image</Button>
                </>
            )}
            {url && (
                <>
                    <div>
                        <img style={{width: "100%"}} src={url} alt="Screenshot" />
                    </div>
                    <Button
                        onClick={() => {
                            setUrl(null);
                        }}
                    >
                        Delete
                    </Button>
                </>
            )}

            <br/>

            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={async () => {
                    const blob = await (await fetch(url!)).blob();
                    // Create File object from Blob
                    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

                    dispatch(createItemAsync({name: itemName, description: itemDescription, image: file})).unwrap().then(() => {
                        handlerCreateItem.close()
                        dispatch(getItemsAsync())
                    })
                }}>Create</Button>
            </div>
        </Modal>



        <Modal opened={openedEditItem} onClose={() => {
            handlerEditItem.close()
            setItemId("")
            setItemName("")
            setItemDescription("")

        }} title="Edit Item">
            <TextInput
                description="Item Name"
                type={"text"}
                value={itemName}
                onChange={(event) => setItemName(event.currentTarget.value)}
            />
            <br />
            <Textarea
                rows={5}
                description="Description"
                value={itemDescription}
                onChange={(event) => setItemDescription(event.currentTarget.value)}
            />
            <br />
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(editItemAsync({itemId: itemId, name: itemName, description: itemDescription})).unwrap().then(async() => {
                        handlerEditItem.close()
                        dispatch(getItemsAsync())
                        setSearchTerm(itemId)
                        setItemId("")
                        setItemName("")
                        setItemDescription("")
                        setOpenedScreen("Items")

                    })
                }}>edit</Button>
            </div>
        </Modal>

        <Modal opened={openedDeleteItem} onClose={() => {
            handlerDeleteItem.close()
            setItemId("")
            setItemName("")
            setItemDescription("")
        }} title="Delete Item">

            <Text  size="sm" c="dimmed">Id</Text>
            <Text>{itemId}</Text>
            <Text  size="sm" c="dimmed">Name</Text>
            <Text>{itemName}</Text>
            <h4>Do you really want to delete this Item?</h4>
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={() => {
                    dispatch(deleteItemAsync(itemId)).unwrap().then(
                        () => {
                            dispatch(getItemsAsync())
                            setSearchTerm("")
                            setItemId("")
                            setItemName("")
                            setOpenedScreen("Items")
                            handlerDeleteItem.close()
                        }
                    )

                }}>Delete</Button>
            </div>
        </Modal>


        <Modal opened={openedUpdateImgItem} onClose={() => {
            handlerUpdateImgItem.close()
            setItemId("")

        }} title="Update Item img">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
                <Text  size="sm" c="dimmed">Image</Text>
                {isCaptureEnable || (
                    <Button onClick={() => {setCaptureEnable(true);  setUrl(null);}}>Open Camera</Button>
                )}
                {isCaptureEnable && (<Button onClick={() => setCaptureEnable(false)}>Close Camera</Button>)}
            </div>

            {isCaptureEnable && (
                <>
                    <div>

                    </div>
                    <div>
                        <Webcam
                            allowFullScreen={true}
                            audio={false}
                            width={"100%"}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                    <Button onClick={() => {
                        capture()
                        setCaptureEnable(false)
                    }}>Take Image</Button>
                </>
            )}
            {url && (
                <>
                    <div>
                        <img style={{width: "100%"}} src={url} alt="Screenshot" />
                    </div>
                    <Button
                        onClick={() => {
                            setUrl(null);
                        }}
                    >
                        Delete
                    </Button>
                </>
            )}

            <br/>

            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button onClick={async () => {
                    const blob = await (await fetch(url!)).blob();
                    // Create File object from Blob
                    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

                    dispatch(updateImgItemAsync({itemId: itemId, image: file})).unwrap().then(() => {
                        handlerUpdateImgItem.close()
                        dispatch(getItemsAsync())
                        setOpenedScreen("Items")
                        setSearchTerm(itemId)
                    })
                }}>Update Image</Button>
            </div>
        </Modal>

        {openedScreen === "Items" && <>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button color={"sand.9"} style={{marginRight: "10px"}} onClick={handlerCreateItem.open}>Create Item</Button>
                <Button color={"sand.9"} style={{marginRight: "10px"}} onClick={handlerDepositItem.open}>Deposit Item</Button>
            </div>

            <br />

            <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <TextInput
                    mb={"15px"}
                    description="Find Item"
                    value={searchTerm}
                    onChange={(event) => {setSearchTerm(event.target.value)}}
                />

            </div>

            <Switch
                color={"sand.4"}
                checked={onlyAvailable}
                onChange={(event) => setOnlyAvailable(event.currentTarget.checked)}
                label={"Only show available Items"}
            />
            <br />


            {filterItemsByRentedOut(filterItems(itemState.items, searchTerm), onlyAvailable).map(item => {
                return <div>
                    <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                        <Flex direction={"row"} align={"center"} justify={"space-between"}>
                            <Flex direction={"column"}>
                                <Text  size="xs" c="dimmed">Id</Text>
                                <Text size="xs" mb={"xs"}>{item._id}</Text>
                            </Flex>
                            {
                                item?.rentedOut && <Badge color={"rot.5"} size="sm">
                                    rented out
                                </Badge>
                            }
                        </Flex>

                        <Text  size="xs" c="dimmed">Name</Text>
                        <Text mb={"xs"} color={"emerald.6"} size={"md"} fw={"bold"}>{item.name}</Text>
                        <Text size="xs" c="dimmed">Description</Text>
                        <Text mb={"xs"}>{item.description}</Text>

                        <Flex justify={"space-between"} align={"center"}>
                            <Flex direction={"column"}>
                                <Text size="xs" c="dimmed">Created</Text>
                                <Text size="sm" color={"sand.1"}>
                                    {Intl.DateTimeFormat("de-DE", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                        timeZone: "UTC",
                                    }).format(new Date(item.createdAt))}
                                </Text>
                            </Flex>

                            <Button color={"sand.7"} autoContrast onClick={() => {setOpenedScreen("Details"); setItem(item)}}>Details</Button>
                        </Flex>
                    </Card>
                </div>
            })}
        </>}

        {openedScreen === "Details" && item && <>
            
            <Modal opened={openedQrItem} onClose={handlerCodeItem.close} title="Item Qr-Code">

                <Text  size="sm" c="dimmed">Id</Text>
                <Text>{item._id}</Text>
                <Text  size="sm" c="dimmed">Name</Text>
                <Text>{item.name}</Text>
                <div style={{   width: "100%", display: "flex", justifyContent: "center", padding: "25px" }}>
                    <QRCode
                        size={256}
                        bgColor={"#242424"}
                        fgColor={"#f9f9f9"}
                        style={{ height: "auto",  width: "80%" }}
                        value={item._id}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                    <Button onClick={() => {
                        dispatch(printItemAsync({itemId: item._id}))
                        handlerCodeItem.close()
                    }}>Print Qr-Code</Button>
                </div>
            </Modal>

            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: "15px"}}>
                <Button color="lightgrey" style={{marginRight: "15px", padding: "5px"}} onClick={() => {setOpenedScreen("Items"); setItem(null)}}>
                    <IconArrowBack />
                </Button>
                <h4 style={{margin: "0px"}}>Item</h4>
            </div>

            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "15px", flexWrap: "wrap"}}>
                <Button onClick={() => {
                    handlerCodeItem.open()
                }}>
                    <IconQrcode></IconQrcode>

                </Button>


                <Button onClick={() => {
                    setItemId(item._id)
                    setItemName(item.name)
                    setItemDescription(item.description)
                    handlerEditItem.open()
                }}>
                    <IconEdit></IconEdit>
                </Button>

                <Button onClick={() => {
                    setItemId(item._id)
                    handlerUpdateImgItem.open()
                }}>
                    <IconCamera />
                </Button>
                <Button onClick={() => {
                    setItemId(item._id)
                    setItemName(item.name)
                    handlerDeleteItem.open()
                }}>
                    <IconTrash/>
                </Button>
            </div>
            <br />

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
            <br />

            <img style={{width: "100%"}} src={BackendBaseUrl + "/image/" + item!.imageUrl} ></img>

            <Text  size="xs" c="dimmed">ItemId</Text>
            <Text  size="xs" mb={"xs"}>{item?._id}</Text>

            <Text  size="xs" c="dimmed">Itemname</Text>
            <Text  size="sm" mb={"xs"} fw="bold">{item?.name}</Text>

            <Text size="xs" c="dimmed">Description</Text>
            <Text mb={"xs"}>{item?.description}</Text>

            <Text  size="xs" c="dimmed">Deposition</Text>
            <Text  mb={"xs"}>{item?.deposition}</Text>



        </>}

    </div>
}

function filterItems(items: Item[], searchString: string): Item[] {
    const lowerSearchString = searchString.toLowerCase();
    return items.filter(item => {
        const { _id, name, description } = item;
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
