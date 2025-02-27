import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import { IoAddOutline } from 'react-icons/io5'
import MultiSelect from './ui/MultiSelect'

const CreateGroupChat = () => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <IoAddOutline size={20} />
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Create Group</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            You can only create group chat with 10 members
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name of Group
              </Text>
              <TextField.Root
                defaultValue="Freja Johnsen"
                placeholder="Enter your full name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Add members
              </Text>
              <MultiSelect />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

    </>
  )
}

export default CreateGroupChat