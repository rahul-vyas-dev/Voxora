"use client";
import { useState } from "react";
import VoxoraLogo from "@/public/Voxora.png";
import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";
import { FileUp, History, MessageSquare, Mic, Plus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { ChatHistory } from "@/types/history.type";
import { useSidebar } from "@/utils/sidebar.context";

function SideBar() {
  const { open, setOpen } = useSidebar();
  const [userHistory, setUserHistory] = useState<Array<ChatHistory>>([]);

  const handleHistoryFetchOnClick = async () => {
    try {
      const storedItem = localStorage.getItem("session_ids");

      const session_ids: Array<string> = storedItem ? JSON.parse(storedItem) : [];

      if (session_ids.length == 0) {
        toast(<b>No history found!</b>);
        return;
      }

      const backend_path = process.env.NEXT_PUBLIC_BACKEND_PAT;
      const fetched_history: { data: ChatHistory[] } = await axios.post(
        `${backend_path!}/history`,
        {
          session_ids,
        }
      );

      if (fetched_history.data.length == 0) {
        toast.error("No History found");
        return;
      }

      toast.success(<b>History fetched successfully.</b>);
      setUserHistory(fetched_history.data);
      console.log("fetched_history", fetched_history);
      // {time_stamps: '2026-06-08T16:29:50.916130', session_id: '2bd1c20c-77f1-493b-8989-00e866cfd38c', messages: Array(1)}
      sessionStorage.setItem("sessions", JSON.stringify(fetched_history));

      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      aria-label="AI Assistant Sidebar Navigation"
      className={`fixed z-30 flex h-screen flex-col border-r border-white/10 bg-black transition-all duration-300 ${
        open ? "w-72" : "w-20"
      }`}
    >
      <main className="relative mt-7 flex h-full flex-col overflow-hidden p-4">
        {/* Toggle Button */}
        <div className="flex items-center gap-3 border-b border-white/5 py-4">
          <Button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Sidebar Menu"
            className="relative h-10 w-10 rounded-xl transition-colors hover:bg-white/10"
          >
            {/* Top Line */}
            <span
              className={`absolute left-1/2 h-0.5 w-6 -translate-x-1/2 bg-white transition-all duration-300 ${
                open ? "top-[55%] rotate-50" : "top-3 rotate-8"
              }`}
            />

            {/* Middle Line */}
            <span
              className={`absolute top-1/2 left-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />

            {/* Bottom Line */}
            <span
              className={`absolute left-1/2 h-0.5 w-6 -translate-x-1/2 bg-white transition-all duration-300 ${
                open ? "top-[45%] -rotate-50" : "bottom-3 -rotate-8"
              }`}
            />
          </Button>
          {open && <b className="select-none">Close Sidebar</b>}
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center gap-1 border-b border-white/5 p-1">
          <div className="flex w-full items-center gap-3">
            <Image
              src={VoxoraLogo}
              alt="Voxora AI Assistant Logo"
              aria-label="Voxora Logo"
              className="pointer-events-none rounded-full object-cover select-none"
              width={40}
              height={40}
              priority
              draggable={false}
            />

            {open && (
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold tracking-wide text-[#adc6ff]">
                  Nebula Assistant
                </h1>

                <span className="text-xs text-zinc-400">Cosmic Edition</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Primary Navigation" className="mt-6 flex flex-col gap-1">
          <Link
            href={"/dashboard/hub"}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <Mic size={20} />
            {open && <b className="font-medium">Hub</b>}
          </Link>

          <Link
            href={"/dashboard/chat"}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <MessageSquare size={20} />
            {open && <b className="font-medium">Chat</b>}
          </Link>

          <Link
            href={"/dashboard/transcription"}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <FileUp size={20} />
            {open && <b className="font-medium">Transcription</b>}
          </Link>

          <Button
            onClick={handleHistoryFetchOnClick}
            aria-label="Fetch Chat History"
            className="justify-start gap-3 rounded-xl px-3 py-3 text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
            variant="ghost"
          >
            <History size={20} />
            {open && <b className="font-medium">History</b>}
          </Button>
        </nav>

        {/* Scrollable History */}
        {open && (
          <section
            aria-label="User Chat History"
            className="flex-1 overflow-y-auto px-3 pb-28 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#131c27] [&::-webkit-scrollbar-thumb]:bg-cyan-400 [&::-webkit-scrollbar-thumb:hover]:bg-cyan-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {userHistory.length ? (
              <div className="flex flex-col gap-2">
                {userHistory.map((obj) => (
                  <Link
                    key={obj.session_id}
                    href={`/dashboard/chat/${obj.session_id}`}
                    className="truncate rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-sm text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                    aria-label={`chat ${obj.time_stamps}`}
                  >
                    {"Date " + obj.time_stamps}
                  </Link>
                ))}
              </div>
            ) : null}
          </section>
        )}

        {/* Bottom Fixed New Session */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-[#0f0f0f] p-3">
          <Link
            href={"/hub"}
            aria-label="Create New Session"
            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-black transition-all duration-200 hover:opacity-90"
          >
            <Plus size={20} />

            {open && <b className="font-semibold tracking-wide">New Session</b>}
          </Link>
        </div>
      </main>
    </aside>
  );
}

export default SideBar;
