// import { Button, DropdownMenu } from '@radix-ui/themes'
// import { format } from 'date-fns'
// import { CiClock2 } from 'react-icons/ci'
// import { IoMdCopy } from 'react-icons/io'
// import { MdDeleteOutline } from 'react-icons/md'

// const Message = ({ senderId, userId, content, time, handleCopy, handleDelete }) => {
//   return (

//     <>
//       <div className={`p-2 flex flex-col rounded-xl  cursor-pointer ${senderId === userId ? "border border-zinc-900 bg-zinc-900" : "bg-zinc-950"}`}>
//         <div className='mt-1 flex items-center justify-between gap-2'>
//           <p className='w-full'>
//             {content}
//           </p>
//           <DropdownMenu.Root className="">
//             <DropdownMenu.Trigger>
//               <Button variant="ghost" radius='full'>
//                 <DropdownMenu.TriggerIcon />
//               </Button>
//             </DropdownMenu.Trigger>
//             <DropdownMenu.Content>
//               <DropdownMenu.Item>
//                 <CiClock2 size={20} />  {format(time, 'hh:mm a , dd-MMM-yyyy')}</DropdownMenu.Item>
//               <DropdownMenu.Item onClick={() => handleCopy}>
//                 <IoMdCopy size={20} /> Copy
//               </DropdownMenu.Item>
//               <DropdownMenu.Separator />
//               <DropdownMenu.Item onClick={() => handleDelete} color="red">
//                 <MdDeleteOutline size={20} />
//                 Delete message
//               </DropdownMenu.Item>
//             </DropdownMenu.Content>
//           </DropdownMenu.Root>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Message