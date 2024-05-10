import { Avatar, Box, Flex, TextField } from "@radix-ui/themes"
import { GoDotFill } from "react-icons/go"
import { MdSearch } from "react-icons/md"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"

const groups = [
  {
    fullName: "BadMosh Group",
  },
  {
    fullName: "Bakwaaaaaas Group",
  },
]
const GroupsPage = () => {
  return (
    <div>
      <div className='absolute top-2 right-2'>
        <Sidebar />
      </div>
      <div className='flex flex-col px-5 my-5'>
        <h1 className=" text-3xl p-5 font-medium" >Group Chats</h1>
        <div className='flex justify-start m-5 items-center'>
          <TextField.Root placeholder="Search chats">
            <TextField.Slot>
              <MdSearch size="20" />
            </TextField.Slot>
          </TextField.Root>
        </div>
        {groups?.map((user, index) => (
          <Link key={index} to={`/groups/${index}`}>
            <div className='p-3'>
              <Flex gap="3" justify="between" align="center">
                <Flex gap="3" justify="center" align="center">
                  <div>
                    <div className='z-50 relative left-7 top-10 lg:left-9 lg:top-10'>
                      <GoDotFill color='lightgreen' />
                    </div>
                    <Avatar
                      radius="full"
                      src={`https://cdn-icons-png.flaticon.com/512/718/718339.png`}
                      size={{ base: "5", md: "4" }}
                    />
                  </div>
                  <Flex justify="center" direction="column" align="center" gap="1">
                    <h1 className='text-lg sm:text-xl  text-zinc-200'>
                      {user.fullName}
                    </h1>
                  </Flex>
                </Flex>
                <Box as="div">
                  <p className='text-sm sm:text-lg text-zinc-500'>12:00 PM</p>
                </Box>
              </Flex>
            </div>
          </Link>
        ))
        }
      </div>
    </div>
  )
}

export default GroupsPage