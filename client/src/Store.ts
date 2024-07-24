import { configureStore } from '@reduxjs/toolkit'
import { accountsSlice } from './state/AccountsState';
import { buildingsSlice } from './state/BuildingState';
import { dashboardSlice } from './state/DashboardState';
import { depositionsSlice } from './state/DepositionState';
import { historyContractsSlice } from './state/HistoryContractState';
import { itemsSlice } from './state/ItemState';
import { projectSlice } from './state/ProjectState';
import { rentContractsSlice } from './state/RentContractState';
import { roomsSlice } from './state/RoomState';
import { shelfSlice } from './state/ShelfState';
import { userSlice } from './state/UserState';



const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        dashboard : dashboardSlice.reducer,
        accounts : accountsSlice.reducer,
        buildings : buildingsSlice.reducer,
        rooms: roomsSlice.reducer,
        shelfs : shelfSlice.reducer,
        items: itemsSlice.reducer,
        rentContracts: rentContractsSlice.reducer,
        depositions: depositionsSlice.reducer,
        historyContracts: historyContractsSlice.reducer,
        projects: projectSlice.reducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
