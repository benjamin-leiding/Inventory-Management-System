import React from 'react';
import { Card,Button } from '@mantine/core';
import './App.css';
import {useAppDispatch, useAppSelector } from './Hooks';
import {resetError, selectUser } from './state/UserState';


import { Appshell } from './UI/Appshell';
import { LoginAndRegister } from './UI/LoginAndRegister';

function App() {
  const userState = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  return (
    <>
      {userState.loggedIn === false &&
        <LoginAndRegister></LoginAndRegister>
    }
      {userState.loggedIn === true &&
        <Appshell></Appshell>
      }
    </>
  );
}

export default App;
