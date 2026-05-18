"use client";

import { LLMFormValueType } from "@/types/chat.type";
import { useSidebar } from "@/utils/sidebar.context";
import axios from "axios";
import { ArrowUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_PAT!;

interface msg {
  user_prompt: string;
  ai_response: string;
}

interface chats {
  session_id: string;
  messages: msg[];
  time_stamps: Date;
}

function Page() {
  const { open } = useSidebar();
  const [historyChats, setHistoryChats] = useState<chats | null>(null);
  const [streamedText, setStreamedText] = useState("");
  const [streamedTextError, setStreamedTextError] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const randomSessionId = useRef(uuidv4());
  // An array which have session_id inside it
  const params = useParams();

  useEffect(() => {
    const fetcHistoryChats = async (session_id: string) => {
      try {
        const res = await axios.post(`${backendUrl}/history`, {
          session_id,
        });

        setHistoryChats(res.data);
      } catch (error) {
        console.log("Error during history fetch.", error);
        toast.error("Error during history fetch.");
      }
    };
    if (params.session_id?.length) {
      fetcHistoryChats(params.session_id[0]);
    }
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<LLMFormValueType>({
    defaultValues: {
      model: "phi-3",
      think: "medium",
    },
  });

  useEffect(() => {
    if (errors.prompt?.message) {
      toast.error(errors.prompt?.message);
    }
  }, [errors.prompt?.message]);

  const onSubmitPrompt: SubmitHandler<LLMFormValueType> = async (data) => {
    try {
      setCurrentPrompt(data.prompt);
      setStreamedText("");
      setStreamedTextError("");

      if (!params.session_id?.length) {
        const storedItem = localStorage.getItem("session_ids");
        console.log("stored key", storedItem);
        const session_ids: Array<string> = storedItem ? JSON.parse(storedItem) : [];

        if (!session_ids.includes(randomSessionId.current)) {
          localStorage.setItem(
            "session_ids",
            JSON.stringify([...session_ids, randomSessionId.current])
          );
        }
      }

      const response = await axios.post(`${backendUrl}/c`, {
        prompt: data.prompt,
        session_id: params.session_id?.[0] || randomSessionId,
        think: data.think,
        model: data.model,
      });
      if (!response.data) return;

      const reader = response.data.getReader();

      const decoder = new TextDecoder();

      let done = false;

      let fullText = "";

      while (!done) {
        const result = await reader.read();
        done = result.done;

        const chunkValue = decoder.decode(result.value);

        fullText += chunkValue;

        // update UI progressively
        setStreamedText((prev) => prev + chunkValue);
      }

      setHistoryChats((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              user_prompt: currentPrompt,
              ai_response: fullText,
            },
          ],
        };
      });

      setCurrentPrompt("");
      setStreamedText("");
    } catch (error) {
      console.log("Error during LLM req", error);
      setStreamedTextError("Error during text generation.");
    } finally {
      setValue("prompt", "");
    }
  };

  return (
    <section
      className={`relative flex h-screen flex-col overflow-hidden bg-[#070b14] ${open ? "" : "ml-20"}`}
    >
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] h-105 w-105 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-105 w-105 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* chat section */}
      <div className="flex-1 overflow-y-auto px-4 pt-10 pb-52 md:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          {/* history chats */}
          {historyChats?.messages?.map((chat, index) => (
            <div key={index} className="flex flex-col gap-5">
              {/* user message */}
              <div className="flex justify-end">
                <div className="max-w-[90%] rounded-[28px] border-[3px] border-cyan-300 bg-cyan-400 px-6 py-5 text-base leading-relaxed font-bold text-black shadow-[6px_6px_0px_#0891b2] md:max-w-3xl">
                  {chat.user_prompt}
                </div>
              </div>

              {/* ai response */}
              <div className="flex items-start gap-4">
                {/* ai icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[3px] border-violet-300 bg-violet-400 text-xl text-black shadow-[5px_5px_0px_#7c3aed]">
                  ✦
                </div>

                {/* ai text */}
                <div className="flex-1 rounded-[28px] border-[3px] border-zinc-700 bg-[#121826] px-6 py-5 shadow-[6px_6px_0px_#27272a]">
                  <p className="leading-loose whitespace-pre-wrap text-zinc-300">
                    {chat.ai_response}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* current streaming message */}
          {currentPrompt && (
            <div className="flex flex-col gap-5">
              {/* current user prompt */}
              <div className="flex justify-end">
                <div className="max-w-[90%] rounded-[28px] border-[3px] border-cyan-300 bg-cyan-400 px-6 py-5 text-base leading-relaxed font-bold text-black shadow-[6px_6px_0px_#0891b2] md:max-w-3xl">
                  {currentPrompt}
                </div>
              </div>

              {/* streaming ai response */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-[3px] border-violet-300 bg-violet-400 text-xl text-black shadow-[5px_5px_0px_#7c3aed]">
                  ✦
                </div>
                <div className="flex-1 rounded-[28px] border-[3px] border-zinc-700 bg-[#121826] px-6 py-5 shadow-[6px_6px_0px_#27272a]">
                  <p className="leading-loose whitespace-pre-wrap text-zinc-300">
                    {streamedText ? (
                      streamedText
                    ) : streamedTextError ? (
                      <span className="text-red-400">{streamedTextError}</span>
                    ) : (
                      <span className="animate-pulse text-zinc-500">Thinking...</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* input */}
      <form onSubmit={handleSubmit(onSubmitPrompt)}>
        <div className={`fixed bottom-6 z-20 flex w-4/5 justify-center md:bottom-10 md:w-4/5`}>
          <div className="flex w-full flex-col gap-4 rounded-[32px] border-[3px] border-cyan-300/40 bg-[#151520] p-4 shadow-[8px_8px_0px_#0891b2] md:flex-row md:items-end">
            {/* textarea */}
            <TextareaAutosize
              minRows={1}
              maxRows={6}
              placeholder="Whisper your inquiry to the void..."
              className="flex-1 resize-none overflow-y-auto bg-transparent text-lg leading-relaxed text-white outline-none placeholder:text-zinc-500 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#131c27] [&::-webkit-scrollbar-thumb]:bg-[#383838] [&::-webkit-scrollbar-thumb:hover]:bg-[#4d4d4d] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
              {...register("prompt", { required: "Prompt is required." })}
              defaultValue={""}
            />

            <div className="flex flex-1 flex-row justify-between">
              {/* controls */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-black tracking-[0.25em] text-cyan-300 uppercase">
                  Think
                </span>

                <div className="relative">
                  <select
                    className="appearance-none rounded-2xl border-[3px] border-zinc-700 bg-[#0f1720] px-5 py-2 pr-12 text-sm font-black text-zinc-300 shadow-[4px_4px_0px_#27272a] transition-all duration-200 outline-none hover:-translate-y-1 hover:border-cyan-300 hover:text-cyan-200 hover:shadow-[6px_6px_0px_#0891b2] focus:border-cyan-300 focus:shadow-[6px_6px_0px_#0891b2]"
                    defaultValue="medium"
                    onChange={(e) => setValue("think", e.target.value as "low" | "medium" | "high")}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  {/* custom arrow */}
                  <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-cyan-300">
                    ▼
                  </div>
                </div>
              </div>

              {/* send button */}
              <button
                className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-2xl border-[3px] border-cyan-300 bg-cyan-400 text-2xl text-black shadow-[6px_6px_0px_#0891b2] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#0891b2] active:translate-y-1 active:shadow-[3px_3px_0px_#0891b2]"
                type="submit"
              >
                <ArrowUp />
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Page;
