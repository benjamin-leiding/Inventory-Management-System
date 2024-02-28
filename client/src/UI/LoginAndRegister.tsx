import { TextInput } from '@mantine/core';
import { useState } from 'react';
import { Button, Card } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../Hooks';
import {registerAsync, resetError, selectUser, signInAsync } from '../state/UserState';
import { Loader } from '@mantine/core';

export const LoginAndRegister = () => {

    const userState = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    const [selectedPage, setSelectedPage] = useState(0)

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    return <div style={{height: "100vh"}}>
        {selectedPage == 0 && <div style={{display: "flex", flexDirection: "column", margin: "20px"}}>
            {userState.status == 'loading' && <Card>
                <Loader color="blue" />
            </Card>}
            {userState.status == "failed" && <Card>
                <h4>Login failed</h4>
                <p>{userState.errorText}</p>
                <Button onClick={() => {dispatch(resetError())}}>Back to Login</Button>
            </Card>
            }
            {userState.status == "idle" && <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h4>Login</h4>
                <TextInput
                    description="email"
                    type={"email"}
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <br />
                <TextInput
                    description="password"
                    type={"password"}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <p>
                    No Account? Click <span onClick={() => setSelectedPage(1)} style={{color: "green"}}>here</span> to register
                </p>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>

                    <Button onClick={() => {
                        dispatch(signInAsync({email, password}))
                    }}>Login</Button>
                </div>
            </Card>
            }
        </div>}

        {selectedPage == 1 && <div style={{display: "flex", flexDirection: "column", margin: "20px"}}>
            {userState.status == 'loading' && <Card>
                <Loader color="blue" />
            </Card>}
            {userState.status == "failed" && <Card>
                <h4>Login failed</h4>
                <p>{userState.errorText}</p>
                <Button onClick={() => {dispatch(resetError())}}>Back to Login</Button>
            </Card>
            }
            {userState.status == "idle" && <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h4>Register</h4>
                <TextInput
                    description="username"
                    type={"text"}
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                />
                <br />
                <TextInput
                    description="email"
                    type={"email"}
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <br />
                <TextInput
                    description="password"
                    type={"password"}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <p>
                    Already got an Account? Click <span onClick={() => setSelectedPage(0)} style={{color: "green"}}>here</span> to login
                </p>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>

                    <Button onClick={() => {
                        dispatch(registerAsync({username, email, password}))
                    }}>Register</Button>
                </div>
            </Card>
            }
        </div>}

    </div>
    
}