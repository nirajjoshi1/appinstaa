import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Info,
  MoreVertical,
  Phone,
  Send,
  Video,
} from "lucide-react";
import Link from "next/link";

const Messages = ({ selectedUser }) => {
  // Call hooks to get messages and real-time updates
  useGetRTM();
  useGetAllMessage();

  // Get messages and user data from the Redux store
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
          <Link className="md:hidden" to="#">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold md:hidden">Chat</h1>
          <Link className="text-xl font-bold hidden md:block" to="#">
            Instagram
          </Link>
          <nav className="flex items-center space-x-4">
            <Button size="icon" variant="ghost">
              <Video className="h-5 w-5" />
              <span className="sr-only">Start video call</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Phone className="h-5 w-5" />
              <span className="sr-only">Start voice call</span>
            </Button>
            <Button size="icon" variant="ghost">
              <Info className="h-5 w-5" />
              <span className="sr-only">Conversation info</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex">
        {/* Left Sidebar for User Info */}
        <div className="flex justify-center p-4">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{selectedUser?.username}</span>
            <Link to={`/profile/${selectedUser?._id}`}>
              <Button className="h-8 my-2" variant="secondary">
                View profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {messages &&
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.senderId === user?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs break-words ${
                      msg.senderId === user?._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
