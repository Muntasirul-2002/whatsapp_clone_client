import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../../components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import { axiosInstance, getConfig } from "../../../../../../utils/request";
import {
  CREATE_CHANNEL,
  GET_ALL_CONTACTS,
} from "../../../../../../lib/api-client";
import { SERVER_URL } from "../../../../../../utils/constants";
import { useAppStore } from "../../../../../../store";
import MultipleSelector from "../../../../../../components/ui/multipleselect";
import { toast } from "sonner";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData, addChannel } =
    useAppStore();
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");
  useEffect(() => {
    const getData = async () => {
      await getConfig();
      const response = await axiosInstance.get(GET_ALL_CONTACTS, {
        withCredentials: true,
      });
      setAllContacts(response.data.contacts);
    };
    getData();
  }, []);
  const createChannel = async () => {
    try {
      if (channelName.length > 0 && selectedContacts.length > 0) {
        const response = await axiosInstance.post(CREATE_CHANNEL, {
          name: channelName,
          members: selectedContacts.map((contact) => contact.value),
        }, {withCredentials:true});
        if(response.status === 200){
          setChannelName("")
          setSelectedContacts([])
          setNewChannelModal(false)
          addChannel(response.data.channel)
          toast.success("Channel Created 🥳")

        }
      } else {
        toast.error("Name and Contacts are required 😎")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 text-lg font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle className="text-center">
              Fill the details to create a new channel
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Input
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2e2c3b] border-none py-2 text-white"
              defaultOptions={allContacts}
              placeholder="Search Contact"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">
                  No result found.
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full cursor-pointer bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
