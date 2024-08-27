import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Box, Button, DropdownMenu, Flex, ScrollArea, TextField } from '@radix-ui/themes';
import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdAttach, IoMdCopy } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { SlDocs } from "react-icons/sl";
import toast from 'react-hot-toast';
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import { Link, useParams } from 'react-router-dom';

const SingleGroupPage = () => {
  const { groupId } = useParams();
  const [message, setMessage] = useState({
    sender: "",
    content: "",
    attachment: null,
  });
  const [chatData, setChatData] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat area when chatData changes
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'attachment') {
      const file = e.target.files[0];
      if (file.type.startsWith('image') || file.type.startsWith('video')) {
        setFilePreview(URL.createObjectURL(file)); // Set image or video preview
      }
      setMessage({
        ...message,
        [name]: file,
      });
    } else {
      setMessage({
        ...message,
        [name]: value,
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setChatData((prevMessages) => [
      ...prevMessages,
      {
        sender: "John", // Sample sender name, replace it with actual sender's name
        content: message.content,
        timestamp: new Date(),
        attachment: message.attachment,
      }
    ]);

    setMessage({
      ...message,
      content: "",
      attachment: null,
    });
    setFilePreview(null); // Clear file preview after sending
  }

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied!");
  }

  return (
    <>
      <main className={`flex flex-col justify-between h-screen`}>
        <Box as="div" className='bg-zinc-900 border-b border-zinc-700'>
          <Flex align="center" gap="3" className="p-2">
            <Avatar
              radius="full"
              size="4"
              fallback="GG"
            />
            <Flex direction="column" className="flex-1">
              <Link to={`/groups/${groupId}/info`}>
                <h1 className="text-zinc-400 capitalize font-bold">{groupId}</h1>
                <p className="text-gray-400 text-sm">Last online: 1 hour ago</p>
              </Link>
            </Flex>
          </Flex>
        </Box>

        <ScrollArea ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2 px-5 py-2">
            {chatData?.map((item, index) => (
              <div key={index} className={`flex justify-start cursor-pointer`}>
                <div className={`p-3 flex flex-col rounded-lg bg-zinc-800`}>
                  <div className="flex items-start gap-2">
                    <div className="flex flex-col">
                      <div className={`flex items-center gap-3`}>
                        <h1 className='font-medium text-zinc-500 text-sm'>{item.sender}</h1>
                        <span className='text-right mx-1 text-xs text-zinc-400'>
                          {format(item.timestamp, 'hh:mm a')}
                        </span>
                      </div>
                      <p className='text-xl'>
                        {item.content}
                      </p>
                      {item.attachment && (
                        <div>
                          {item.attachment.type.startsWith('image') && (
                            <img src={URL.createObjectURL(item.attachment)} alt="Attachment" className="object-cover w-full h-52 rounded-lg" />
                          )}
                          {item.attachment.type.startsWith('video') && (
                            <video src={URL.createObjectURL(item.attachment)} controls className="object-cover w-full h-52 rounded-lg" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit}>
          <Flex justify="center" items="center" className="p-3 pb-5">
            {filePreview && (
              <>
                {filePreview.startsWith('image') &&
                  <img src={filePreview} alt="File Preview" className="w-12 h-12 rounded-lg mx-2" />
                }
                {filePreview.startsWith('video') &&
                  <video src={filePreview} controls className="w-12 h-12 rounded-lg mx-2" />
                }
              </>
            )}
            <TextField.Root size="3" radius='medium' name='content' value={message.content} onChange={handleChange} placeholder='Type a message...' className="flex-grow rounded-lg  mx-2" >
              <TextField.Slot>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="ghost">
                      <IoMdAttach size={25} />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <label htmlFor="file-input" className="flex text-base items-center cursor-pointer">
                      <SlDocs />
                      <span className="ml-2">Send File</span>
                    </label>
                    <input type="file" name="attachment" id="file-input" className="hidden" onChange={handleChange} />
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </TextField.Slot>
            </TextField.Root>
            <Button type='submit' disabled={message.content === ""} size="3" className="bg-blue-500 text-white rounded-full">
              <RiSendPlaneFill />
            </Button>
          </Flex>
        </form>
      </main>
    </>
  );
};

export default SingleGroupPage;
