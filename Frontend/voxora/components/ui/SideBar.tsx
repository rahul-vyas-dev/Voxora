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

      const session_ids: Array<string> = storedItem
        ? JSON.parse(storedItem)
        : [];

      if (session_ids.length == 0) {
        toast(<b>No history found!</b>);
        return;
      }

      const backend_path = process.env.BACKEND_PATH;

      const fetched_history: ChatHistory[] = await axios.post(backend_path!, {
        session_ids,
      });

      if (fetched_history.length == 0) {
        toast.error("No History found");
        return;
      }

      toast.success(<b>History fetched successfully.</b>);
      setUserHistory(fetched_history);

      sessionStorage.setItem("sessions", JSON.stringify(fetched_history));

      return;
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <aside
      aria-label="AI Assistant Sidebar Navigation"
      className={`fixed h-screen bg-black border-r border-white/10 transition-all duration-300 flex flex-col z-20 ${
        open ? "w-72" : "w-20"
      }`}
    >
      <main className="mt-7 flex flex-col h-full overflow-hidden p-4 relative">
        {/* Toggle Button */}
        <div className="flex items-center py-4 border-b border-white/5 gap-3">
          <Button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Sidebar Menu"
            className="relative h-10 w-10 rounded-xl hover:bg-white/10 transition-colors"
          >
            {/* Top Line */}
            <span
              className={`absolute left-1/2 h-0.5 w-6 -translate-x-1/2 bg-white transition-all duration-300 ${
                open ? "top-[55%] rotate-50" : "top-3 rotate-8"
              }`}
            />

            {/* Middle Line */}
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-300 ${
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
          {open && <b>Close Sidebar</b>}
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center gap-1 border-b border-white/5 p-1">
          <div className="flex items-center gap-3 w-full">
            <Image
              src={VoxoraLogo}
              alt="Voxora AI Assistant Logo"
              aria-label="Voxora Logo"
              className="rounded-full object-cover pointer-events-none select-none"
              width={40}
              height={40}
              priority
              draggable={false}
            />

            {open && (
              <div className="flex flex-col">
                <h1 className="text-[#adc6ff] font-semibold text-xl tracking-wide">
                  Nebula Assistant
                </h1>

                <span className="text-xs text-zinc-400">Cosmic Edition</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="flex flex-col gap-1 mt-6"
        >
          <Link
            href={"/dashboard/hub"}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <Mic size={20} />
            {open && <b className="font-medium">Hub</b>}
          </Link>

          <Link
            href={"/dashboard/chat"}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <MessageSquare size={20} />
            {open && <b className="font-medium">Chat</b>}
          </Link>

          <Link
            href={"/dashboard/transcription"}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            <FileUp size={20} />
            {open && <b className="font-medium">Transcription</b>}
          </Link>

          <Button
            onClick={handleHistoryFetchOnClick}
            aria-label="Fetch Chat History"
            className="justify-start gap-3 rounded-xl px-3 py-3 text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-200"
            variant="ghost"
          >
            <History size={20} />
            {open && <b className="font-medium">History</b>}
          </Button>
        </nav>

        {/* Scrollable History */}
        <section
          aria-label="User Chat History"
          className="flex-1 overflow-y-auto px-3 pb-28 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          {userHistory.length ? (
            <div className="flex flex-col gap-2">
              {userHistory.map((obj) => (
                <Link
                  key={obj.session_id}
                  href={`/chat/${obj.session_id}`}
                  className="rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-200 truncate"
                >
                  {"Date " + obj.time_stamps}
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        {/* Bottom Fixed New Session */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-[#0f0f0f] p-3">
          <Link
            href={"/hub"}
            aria-label="Create New Session"
            className="flex items-center gap-3 rounded-xl bg-white text-black px-4 py-3 hover:opacity-90 transition-all duration-200"
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
