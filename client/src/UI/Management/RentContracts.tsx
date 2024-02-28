import { Button, Modal, Textarea, TextInput, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"
import {QrScanner} from '@yudiel/react-qr-scanner';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector } from "../../Hooks";
import { selectUser } from "../../state/UserState";
import {createRentContractAsync, endRentContractAsync, getAllRentContractsAsync, getOwnRentContractsAsync} from "../../state/RentContractState";
import { getItemsAsync } from "../../state/ItemState";

export const RentContracts = () => {

    const userState = useAppSelector(selectUser)

    const dispatch = useAppDispatch()


    const [openedCreateRentcontract, handlerCreateRentcontract] = useDisclosure(false)

    const [openedEndRentcontract, handlerEndRentcontract] = useDisclosure(false)


    const [itemId, setItemId] = useState("")

    const [qrScanneritemId, setQrScanneritemId] = useState(false)

    const [rentUserId, setRentUserId] = useState("")

    const [qrScannerRentUserId, setQrScannerRentUserId] = useState(false)

    const [contractorId, setContractorId] = useState(userState.userProfile?._id)

    const [expires, setExpires] = useState<Date | null>(null);

    return <>

        <Modal opened={openedCreateRentcontract} onClose={() => {
            handlerCreateRentcontract.close()
        }} title="Create Rent Contract">

            <div style={{display: "flex", flexDirection: "column", borderRadius: "5px", border: qrScanneritemId ? "2px solid #1C7ED6" : "", padding: qrScanneritemId ? "5px" : "0px" }}>
                <Text>All fields are requiered</Text>
                <br/>
                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                    <Textarea
                        description="Item Id"
                        rows={2}
                        value={itemId}
                        onChange={(event) => setItemId(event.currentTarget.value)}
                    />
                    <Button onClick={() => {
                        setQrScanneritemId(!qrScanneritemId)
                        setQrScannerRentUserId(false)
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

            <br />

            <div style={{display: "flex", flexDirection: "column", borderRadius: "5px", border: qrScannerRentUserId ? "2px solid #1C7ED6" : "", padding: qrScannerRentUserId ? "5px" : "0px" }}>
                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                    <Textarea
                        description="Rent User Id"
                        rows={2}
                        value={rentUserId}
                        onChange={(event) => setRentUserId(event.currentTarget.value)}
                    />
                    <Button onClick={() => {
                        setQrScannerRentUserId(!qrScannerRentUserId)
                        setQrScanneritemId(false)
                    }}>Qr</Button>
                </div>
                {
                    qrScannerRentUserId &&  <div style={{marginTop: "15px"}}>
                        <QrScanner
                            onDecode={(result) => {
                                setRentUserId(result)
                                setQrScannerRentUserId(false)
                                console.log(result)
                            }}
                            onError={(error) => console.log(error?.message)}
                        />
                    </div>
                }
            </div>

            <br />

            <TextInput
                disabled
                description={"Rent Contractor Id (you, " + userState.userProfile?.username + ")"}
                type={"text"}
                style={{color: "black", fontWeight: "bold"}}
                value={contractorId}
                onChange={(event) => setContractorId(event.currentTarget.value)}
            />
            <br />

            <DatePickerInput
                minDate={new Date()}
                maxDate={dayjs(new Date()).add(6, 'month').toDate()}
                description="Rent Contract Expires (max 6 month)"
                placeholder="Please select Date"
                value={expires}
                onChange={setExpires}
            />
            <br />

            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button  onClick={() => {
                    dispatch(createRentContractAsync({itemId: itemId, rentUserId: rentUserId, contractorId: contractorId!, expires: expires!})).unwrap().then(() => {
                        dispatch(getAllRentContractsAsync())
                        dispatch(getOwnRentContractsAsync())
                        dispatch(getItemsAsync())
                    })
                    setItemId("")
                    setRentUserId("")
                    setExpires(null)
                    handlerCreateRentcontract.close()
                }}>Create</Button>

            </div>
        </Modal>

        <Modal opened={openedEndRentcontract} onClose={() => {
            handlerEndRentcontract.close()
        }} title="End Rent Contract">

            <div style={{display: "flex", flexDirection: "column", borderRadius: "5px", border: qrScanneritemId ? "2px solid #1C7ED6" : "", padding: qrScanneritemId ? "5px" : "0px" }}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "15px"}}>
                    <Textarea
                        description="Item Id"
                        rows={2}
                        value={itemId}
                        onChange={(event) => setItemId(event.currentTarget.value)}
                    />
                    <Button style={{width: "100px"}} onClick={() => {
                        setQrScanneritemId(!qrScanneritemId)
                        setQrScannerRentUserId(false)
                    }}>Scan Qr</Button>
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

            <br />

            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <Button  onClick={() => {
                    dispatch(endRentContractAsync(itemId)).unwrap().then( () =>{
                        handlerEndRentcontract.close()
                        dispatch(getAllRentContractsAsync())
                        dispatch(getOwnRentContractsAsync())
                        dispatch(getItemsAsync())
                        setItemId("")
                    })
                }}>End</Button>

            </div>
        </Modal>

        <div style={{display: "flex", justifyContent: "flex-start",gap: "15px", alignItems: "center"}}>
            <Button style={{}} onClick={handlerCreateRentcontract.open}>Create Contract</Button>
            <Button onClick={handlerEndRentcontract.open}>End Contract</Button>
        </div>



    </>
}