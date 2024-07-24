import {Flex, TextInput, Title, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { Button, Card, Box, Text } from '@mantine/core';
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



    return <Flex h={"100vh"} justify={"center"} align={"flex-start"}>
        {selectedPage == 0 && <Flex direction={"column"} m={"20px"}>
            <Card shadow="sm" padding="lg" radius="md" withBorder w={"350px"}>
                {userState.status == 'loading' && <Loader color="red.3" />}
                {userState.status == "failed" && <>
                    <Title mb={"10px"} order={4}>Login failed</Title>
                    <Text mb={"25px"}>{userState.errorText}</Text>
                    <Flex justify={"flex-end"}>
                        <Button
                            color={"pink.5"}
                            onClick={() => {dispatch(resetError())}}>
                            Back to Login
                        </Button>
                    </Flex>
                </>}
                {userState.status == "idle" && <>
                    <Title order={4} mb={"5px"}>Login</Title>
                    <TextInput
                        mb={"5px"}
                        description="email"
                        type={"email"}
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                    <TextInput
                        description="password"
                        type={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    <Text mb={"5px"}>
                        No Account? Click
                        <UnstyledButton onClick={() => setSelectedPage(1)}>
                            <Text color={"red.3"} p={"5px"}>here</Text>
                        </UnstyledButton>
                        to register
                    </Text>
                    <Flex justify={"flex-end"}>
                        <Button
                            onClick={() => {
                                dispatch(signInAsync({email, password}))
                            }}
                            autoContrast
                            color={"pink.5"}
                        >Login</Button>
                    </Flex>
                </>}
            </Card>
        </Flex>}

        {selectedPage == 1 && <Flex direction={"column"} m={"20px"}>
            <Card shadow="sm" padding="lg" radius="md" withBorder w={"350px"}>
                {userState.status == 'loading' && <Loader color="red.3" />}
                {userState.status == "failed" && <>
                    <Title order={4}>Register failed</Title>
                    <Text>{userState.errorText}</Text>
                    <Flex justify={"flex-end"}>
                        <Button
                            color={"pink.5"}
                            onClick={() => {dispatch(resetError())}}>
                            Back to Register
                        </Button>
                    </Flex>
                </>}
                {userState.status == "idle" && <>
                    <Title mb={"5px"} order={4}>Register</Title>
                    <TextInput
                        mb={"5px"}
                        description="username"
                        type={"text"}
                        value={username}
                        onChange={(event) => setUsername(event.currentTarget.value)}
                    />
                    <TextInput
                        mb={"5px"}
                        description="email"
                        type={"email"}
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                    <TextInput
                        mb={"5px"}
                        description="password"
                        type={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    <Text mb={"5px"}>
                        Already got an Account? Click
                        <UnstyledButton onClick={() => setSelectedPage(0)}>
                            <Text color={"red.3"} p={"5px"}>here</Text>
                        </UnstyledButton>
                        to login
                    </Text>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                        <Button
                            color={"pink.5"}
                            onClick={() => {
                                dispatch(registerAsync({username, email, password}))
                            }}>
                            Register
                        </Button>
                    </div>
                </>}

            </Card>



        </Flex>}

    </Flex>
    
}