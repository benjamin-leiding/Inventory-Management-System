import {Badge, Button, Card, Flex, Modal, TextInput, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {useAppDispatch, useAppSelector} from "../Hooks";
import { createProjectAsync, getProjectsAsync, selectProjects } from "../state/ProjectState";
import { selectUser } from "../state/UserState";

export const Projects = () => {

    const [opened, { open, close }] = useDisclosure(false);

    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const userState = useAppSelector(selectUser)

    const projectState = useAppSelector(selectProjects)
    
    const dispatch = useAppDispatch()
    
    function handleProjectCreation(){
        dispatch(createProjectAsync({name: name, ownerId: userState.userProfile!._id, description: description})).unwrap().then( () => {

            close()
            dispatch(getProjectsAsync())

        }
        )
    }

    return <div style={{padding: "15px"}}>
        <Modal opened={opened} onClose={close} title="Create Project">
            <Flex direction={"column"} gap={"25px"}>
                <TextInput
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                />
                <TextInput
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.currentTarget.value)}
                />
                <Button onClick={handleProjectCreation}>Create</Button>
            </Flex>
        </Modal>

        <Button onClick={open}>Create Project</Button>
        {projectState.projects?.map(project => {
            return <Card shadow="sm" padding="xs" mb="10px" radius="md" withBorder>
                <Text  size="xs" c="dimmed">Id</Text>
                <Text size="xs" mb={"xs"}>{project._id}</Text>
                <Text  size="xs" c="dimmed">Name</Text>
                <Text>{project.name}</Text>
                <Text size="xs" c="dimmed">Description</Text>
                <Text mb={"xs"}>{project.description}</Text>

                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Badge size="sm" mb={"5px"}>
                        Created: {Intl.DateTimeFormat("de-DE", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        timeZone: "UTC",
                    }).format(new Date(project.createdAt))}
                    </Badge>

                    <Button onClick={() => {}}>Details</Button>
                </div>
            </Card>

        })}
    </div>
}