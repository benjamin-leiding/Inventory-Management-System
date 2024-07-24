import { notifications } from "@mantine/notifications";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { Keys } from "../Arch/keys";
import { BackendBaseUrl } from "../Arch/Urls";
import { Building } from "../Models/Building";
import { Item } from "../Models/Item";
import { Room } from "../Models/Room";
import { User } from "../Models/User";
import { RootState } from "../Store";

export interface ItemState{
    items: Item[]
    status: 'idle' | 'loading' | 'failed'
}

const initialState : ItemState = {
    items: [],
    status: 'idle'
}

export const createItemAsync = createAsyncThunk(
    'createItemAsync',
    async ({ name, description, image }: { name: string, description: string, image: File }) => {
        console.log("ich bin da")
        const createItemAsyncUrl = BackendBaseUrl + "/item/create";

        // Create a FormData object to send the data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image); // Append the image file

        const data = await axios.post(
            createItemAsyncUrl,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                    'token': window.localStorage.getItem(Keys.Access_token)
                },
                withCredentials: true
            }
        );
        console.log(data);
        return data;
    }
);

export const printItemAsync = createAsyncThunk(
    'printItemAsync',
    async ({ itemId }: { itemId: string}) => {
        
        const printItemAsyncUrl = BackendBaseUrl + "/item/print";

        
        console.log(itemId)
        
        const data = await axios.post(
            printItemAsyncUrl,
            {itemId: itemId},
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                    'token': window.localStorage.getItem(Keys.Access_token)
                },
                withCredentials: true
            }
        );
        console.log(data);
        return data;
    }
);
export const getItemsAsync = createAsyncThunk(
    'getItemsAsync',
    async () => {
        const createItemAsyncUrl = BackendBaseUrl + "/item/all"
        const data = await axios.get(
            createItemAsyncUrl,
            {
                headers: {
                    token: window.localStorage.getItem(Keys.Access_token)
                }
            }
        )
        console.log(data)
        return {items: data.data.items}
    }
);

export const editItemAsync = createAsyncThunk(
    'editItemAsync',
    async ({itemId, name, description}:{itemId: string, name: string, description: string}) => {
        const editItemAsyncUrl = BackendBaseUrl + "/item/update"
        const data = await axios.post(
            editItemAsyncUrl,
            {
                itemId : itemId,
                name : name,
                description : description
            },
            {
                headers: {
                    token: window.localStorage.getItem(Keys.Access_token)
                }
            }
        )
        console.log(data)
        return data
    }
);

export const updateImgItemAsync = createAsyncThunk(
    'updateImgItemAsync',
    async ({ itemId, image }: { itemId: string, image: File }) => {
        console.log("ich bin da")
        const updateImgItemAsyncUrl = BackendBaseUrl + "/item/update_img";

        // Create a FormData object to send the data
        const formData = new FormData();
        formData.append('itemId', itemId);
        formData.append('image', image); // Append the image file

        const data = await axios.post(
            updateImgItemAsyncUrl,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                    'token': window.localStorage.getItem(Keys.Access_token)
                },
                withCredentials: true
            }
        );
        console.log(data);
        return data;
    }
);

export const deleteItemAsync = createAsyncThunk(
    'deleteItemAsync',
    async (itemId: string) => {
        const deleteItemAsyncUrl = BackendBaseUrl + "/item/delete"
        const data = await axios.post(
            deleteItemAsyncUrl,
            {
                itemId : itemId,
            },
            {
                headers: {
                    token: window.localStorage.getItem(Keys.Access_token)
                }
            }
        )
        console.log(data)
        return data
    }
);



export const itemsSlice = createSlice({
    name: 'itemsSlice',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        //getUsersAsync
        builder
            .addCase(createItemAsync.pending, (state, action) => {
                console.log("createItemAsync is loading")
            })
            .addCase(createItemAsync.fulfilled, (state, action) => {
                console.log("createItemAsync is fulfilled")
                console.log(action.payload)
                notifications.show({
                    title: action.payload.data.success ? "Success" : "Error",
                    message: action.payload.data.message,
                    color: action.payload.data.success ? "" : 'red',
                })
            })
            .addCase(createItemAsync.rejected, (state, {error}) => {
                console.log("createItemAsync is rejected")
            });

        //updateImgItemAsync
        builder
            .addCase(updateImgItemAsync.pending, (state, action) => {
                console.log("updateImgItemAsync is loading")
            })
            .addCase(updateImgItemAsync.fulfilled, (state, action) => {
                console.log("updateImgItemAsync is fulfilled")
                console.log(action.payload)
                notifications.show({
                    title: action.payload.data.success ? "Success" : "Error",
                    message: action.payload.data.message,
                    color: action.payload.data.success ? "" : 'red',
                })
            })
            .addCase(updateImgItemAsync.rejected, (state, {error}) => {
                console.log("updateImgItemAsync is rejected")
            });

        //deleteItemAsync
        builder
            .addCase(deleteItemAsync.pending, (state, action) => {
                console.log("deleteItemAsync is loading")
            })
            .addCase(deleteItemAsync.fulfilled, (state, action) => {
                console.log("deleteItemAsync is fulfilled")
                notifications.show({
                    title: action.payload.data.success ? "Success" : "Error",
                    message: action.payload.data.message,
                })
                console.log(action.payload)
            })
            .addCase(deleteItemAsync.rejected, (state, {error}) => {
                console.log("deleteItemAsync is rejected")
            });

        //getItemsAsync
        builder
            .addCase(getItemsAsync.pending, (state, action) => {
                console.log("getItemsAsync is loading")
            })
            .addCase(getItemsAsync.fulfilled, (state, action) => {
                console.log("getItemsAsync is fulfilled")
                console.log(action.payload)
                state.items = action.payload.items
            })
            .addCase(getItemsAsync.rejected, (state, {error}) => {
                console.log("getItemsAsync is rejected")
            });

        //getItemsAsync
        builder
            .addCase(printItemAsync.pending, (state, action) => {
                console.log("getItemsAsync is loading")
            })
            .addCase(printItemAsync.fulfilled, (state, action) => {
                console.log("getItemsAsync is fulfilled")
                console.log(action.payload)
            })
            .addCase(printItemAsync.rejected, (state, {error}) => {
                console.log("getItemsAsync is rejected")
            });

        //editItemAsync
        builder
            .addCase(editItemAsync.pending, (state, action) => {
                console.log("editItemAsync is loading")
            })
            .addCase(editItemAsync.fulfilled, (state, action) => {
                console.log("editItemAsync is fulfilled")
                console.log(action.payload)
                notifications.show({
                    title: action.payload.data.success ? "Success" : "Error",
                    message: action.payload.data.message,
                    color: action.payload.data.success ? "" : 'red',
                })
            })
            .addCase(editItemAsync.rejected, (state, {error}) => {
                console.log("editItemAsync is rejected")
            });
    },
});

export const {  } = itemsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectItems = (state: RootState) => state.items;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default itemsSlice.reducer;