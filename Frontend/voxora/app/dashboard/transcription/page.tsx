"use client";

import { FileUpload } from "@/components/ui/File-upload";
import { useSidebar } from "@/utils/sidebar.context";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { type STTStudioFormValues } from "@/types/stt.types";
import { getAudioDuration } from "@/utils/audio";
import { Button } from "@/components/Button";
import { models } from "@/app/constants/whishper.model";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";
import axios from "axios";
import { STTResponse } from "@/types/stt.types";

export default function Page() {
  const { open } = useSidebar();
  const [audio, setAudio] = useState<File | null>(null);
  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>("0");
  const [enabled, setEnabled] = useState(false);
  const [aiResponse, setAiResponse] = useState<STTResponse | null>(null);
  const [language, setLanguage] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedModel, setSelectedModel] = useState<"tiny" | "base" | "medium" | "large">(
    "medium"
  );
  const backendUrl = process.env.BACKEND_PATH!;

  const [waveformHeights, setWaveformHeights] = useState<number[]>(() =>
    Array.from({ length: 70 }, () => Math.floor(Math.random() * 100))
  );

  // waveform animation
  const startWaveAnimation = () => {
    intervalRef.current = setInterval(() => {
      setWaveformHeights(Array.from({ length: 70 }, () => Math.floor(Math.random() * 100) + 10));
    }, 120);
  };

  // waveform animation
  const stopWaveAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<STTStudioFormValues>({
    defaultValues: {
      audioFile: null,
      modelSize: "base",
      translateToEnglish: false,
    },
  });

  useEffect(() => {
    toast.error(errors.audioFile?.message);
  }, [errors.audioFile?.message]);

  const isaudioChanges = useWatch({
    control,
    name: "audioFile",
  });

  const sizeChanges = useWatch({
    control,
    name: "modelSize",
  });

  const translateToEngLangChanges = useWatch({
    control,
    name: "translateToEnglish",
  });

  // set value on change
  useEffect(() => {
    const audioFile = getValues("audioFile");
    if (audioFile) {
      setAudio(audioFile);
      setValue("modelSize", selectedModel);
      setValue("translateToEnglish", enabled);
    }
  }, [
    isaudioChanges,
    sizeChanges,
    translateToEngLangChanges,
    getValues,
    enabled,
    selectedModel,
    setValue,
  ]);

  // create audio URL
  useEffect(() => {
    if (!audio) return;

    const audioUrl = URL.createObjectURL(audio);

    audioRef.current = new Audio(audioUrl);

    return () => {
      audioRef.current?.pause();
      URL.revokeObjectURL(audioUrl);
    };
  }, [audio]);

  // Format audio duration in MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Form submit
  const onSubmit: SubmitHandler<STTStudioFormValues> = async (data) => {
    if (data.audioFile) {
      const duration = await getAudioDuration(data.audioFile);
      setDuration(formatDuration(duration));
    }
    setLanguage("Processing...");
    try {
      const response: STTResponse = await axios.post(`${backendUrl}/stt`, {
        audio: data.audioFile,
        model_size: data.modelSize,
        translate: data.translateToEnglish,
      });
      setLanguage(response.language);
      setAiResponse(response);
      toast.success("Transcription done successfully.");
    } catch (error) {
      console.log("Error during api req to STT", error);
      toast.error("Error during transcription.");
    }
  };

  // Handle toggle audio
  const handlePlayAudioOnClick = async () => {
    if (!audioRef.current) return;

    setWaveformHeights(() => Array.from({ length: 70 }, () => Math.floor(Math.random() * 100)));

    if (isAudioPlay) {
      audioRef.current.pause();
      stopWaveAnimation();
      setIsAudioPlay(false);
    } else {
      await audioRef.current.play();
      startWaveAnimation();
      setIsAudioPlay(true);
    }
  };

  //Auto pause audio
  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    const handleEnded = () => {
      setIsAudioPlay(false);
      stopWaveAnimation();
    };

    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [isAudioPlay]);

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#07090f] text-white ${open ? "" : "ml-20"} transition-all duration-300`}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] h-100 w-100 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-112.5 w-112.5 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section>
        <form
          className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            {/* Heading */}
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[0.2em] text-zinc-300 backdrop-blur-xl">
                AI SPEECH TRANSCRIPTION
              </span>

              <h1 className="bg-linear-to-r from-white via-zinc-200 to-indigo-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
                STT Studio
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
                Upload audio recordings, preview speech files, and convert voice into highly
                accurate structured transcription powered by Nebula neural inference.
              </p>
            </div>

            {/* Upload Card */}
            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/4 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/6">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex min-h-105 flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-black/20 px-6 py-4 text-center transition-all duration-300 hover:border-indigo-400/40 hover:bg-black/30">
                {/* Upload Icon */}
                <div className="relative mb-8 flex h-fit w-fit items-center justify-center rounded-[2rem] border-2 border-violet-400/30 bg-[#0f0f18] p-3 shadow-[10px_10px_0px_rgba(91,33,182,0.9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[14px_14px_0px_rgba(91,33,182,1)]">
                  {/* glow */}
                  <div className="bg-[radial-gradient circle_at_top,rgba(139,92,246,0.18),transparent_60%)] pointer-events-none absolute inset-0 rounded-[2rem]" />

                  <Controller
                    control={control}
                    name="audioFile"
                    rules={{ required: "Audio file is required!!" }}
                    render={({ field }) => (
                      <FileUpload
                        onChange={(files) => field.onChange(files)}
                        defaultValues={false}
                      />
                    )}
                  />
                </div>

                <div className="relative mb-10 max-w-2xl rounded-[2rem] border-[3px] border-violet-400/40 bg-[#11111a] p-8">
                  {/* glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_45%)]" />

                  {/* badge */}
                  <div className="shadow-4px_4px_0px_rgba(124,58,237,0.7)] mb-5 inline-flex items-center rounded-full border-2 border-violet-300/30 bg-black/40 px-4 py-1 text-xs font-bold tracking-[0.25em] text-violet-200 uppercase">
                    Neural Audio Upload
                  </div>

                  <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Drop your <span className="text-violet-300">audio file</span>
                  </h2>

                  <p className="max-w-xl text-base leading-relaxed text-zinc-400">
                    Drag & drop WAV, MP3, FLAC, or M4A recordings into the transcription engine.
                    Real-time processing, waveform rendering, and semantic speech analysis
                    supported.
                  </p>
                </div>

                {/* Audio Preview */}
                {audio && (
                  <div className="mt-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/20 text-indigo-200">
                          🎵
                        </div>

                        <div className="text-left">
                          <h3 className="flex overflow-clip text-sm font-semibold text-wrap text-white">
                            {audio?.name}
                          </h3>
                          <p className="text-xs text-zinc-500">
                            {(audio?.size / 1024 / 1024).toFixed(2)} MB • {duration} Duration
                          </p>
                        </div>
                      </div>

                      <Button
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-all hover:bg-white/8 hover:text-white"
                        onClick={handlePlayAudioOnClick}
                      >
                        <b>{isAudioPlay ? "Pause" : "Play"}</b>
                      </Button>
                    </div>

                    {/* Waveform */}
                    <div className="flex h-20 items-end gap-1 overflow-hidden rounded-xl bg-white/3 px-3 py-4">
                      {waveformHeights.map((h, i) => (
                        <div
                          key={i}
                          className="w-full rounded-full bg-linear-to-t from-indigo-400 to-cyan-300 opacity-80"
                          style={{
                            height: `${h}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Processing Card */}
            <div className="rounded-[28px] border border-white/10 bg-white/4 p-7 shadow-xl backdrop-blur-2xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-wide text-white">
                    Live Transcription
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Neural semantic processing pipeline active
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                  {language ? language : "Start"}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-300 backdrop-blur-xl">
                <p className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-violet-400/70 hover:scrollbar-thumb-violet-300 max-h-40 overflow-y-auto pr-3 leading-relaxed text-zinc-400 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#11111a] [&::-webkit-scrollbar-thumb]:bg-violet-400 [&::-webkit-scrollbar-thumb:hover]:bg-violet-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                  {aiResponse?.text ? aiResponse.text : "Text will be visible here."}
                </p>
              </div>

              {/* Progress */}
              <div className="mt-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between">
                  <Button
                    className="group relative overflow-hidden rounded-2xl border-[3px] border-violet-300 bg-violet-400 px-6 py-6 font-black tracking-tight text-black shadow-[6px_6px_0px_#7c3aed] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#7c3aed] active:translate-y-1 active:shadow-[3px_3px_0px_#7c3aed]"
                    onClick={async () => {
                      if (aiResponse?.text) {
                        await navigator.clipboard.writeText(aiResponse.text);
                        toast.success(<b>Text copied successfully.</b>);
                      }
                      toast.message(<b>Nothing to copy.</b>);
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Copy className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      Copy Text
                    </span>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_45%)]" />
                  </Button>

                  <Button className="group relative overflow-hidden rounded-2xl border-[3px] border-emerald-300 bg-[#11111a] px-6 py-6 font-black tracking-tight text-emerald-200 shadow-[6px_6px_0px_#059669] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#059669] active:translate-y-1 active:shadow-[3px_3px_0px_#059669]">
                    <span className="relative z-10 flex items-center gap-3">
                      <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                      Download File
                    </span>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Config Panel */}
          <aside className="w-full lg:max-w-sm">
            <div className="sticky top-8 rounded-[32px] border border-white/10 bg-white/4 p-8 shadow-2xl backdrop-blur-2xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-400/20 to-pink-400/20 text-2xl shadow-lg">
                  ⚙️
                </div>

                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">Configuration</h2>
                  <p className="mt-1 text-sm text-zinc-500">Optimize transcription intelligence</p>
                </div>
              </div>

              {/* Model Selection */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-md bg-violet-400 shadow-[3px_3px_0px_#7c3aed]" />

                  <h3 className="text-sm font-black tracking-[0.25em] text-zinc-300 uppercase">
                    Model Size
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {models.map((model) => {
                    const isActive = selectedModel === model.name;

                    return (
                      <button
                        key={model.name}
                        type="button"
                        onClick={() => {
                          setSelectedModel(model.name);
                        }}
                        className={`group relative overflow-hidden rounded-[24px] border-[3px] p-5 text-left transition-all duration-200 ${
                          isActive
                            ? `border-violet-300 bg-violet-400 text-black shadow-[8px_8px_0px_#7c3aed] hover:-translate-y-1 hover:shadow-[12px_12px_0px_#7c3aed]`
                            : `border-zinc-700 bg-[#151520] text-white shadow-[6px_6px_0px_#27272a] hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-[8px_8px_0px_#7c3aed]`
                        } `}
                      >
                        {/* glow */}
                        {isActive && (
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_45%)]" />
                        )}

                        <div className="relative z-10">
                          <div className="mb-3 flex items-center justify-between">
                            <span
                              className={`text-lg font-black tracking-tight ${
                                isActive ? "text-black" : "text-white"
                              } `}
                            >
                              {model.name}
                            </span>

                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full border-[3px] transition-all ${
                                isActive
                                  ? `border-black bg-white shadow-[2px_2px_0px_#000]`
                                  : `border-zinc-500 bg-transparent`
                              } `}
                            >
                              {isActive && <div className="h-2.5 w-2.5 rounded-full bg-black" />}
                            </div>
                          </div>

                          <p
                            className={`text-sm leading-relaxed ${
                              isActive ? "text-black/80" : "text-zinc-400"
                            } `}
                          >
                            {model.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="mt-10 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-white">Translate to English</h4>
                    <p className="mt-1 text-sm text-zinc-500">Auto-detect source language</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEnabled((prev) => !prev);
                    }}
                    className={`relative flex h-8 w-16 items-center rounded-full border-[3px] transition-all duration-300 ${
                      enabled
                        ? `border-violet-300 bg-violet-400 shadow-[4px_4px_0px_#7c3aed]`
                        : `border-zinc-600 bg-[#1a1a24] shadow-[4px_4px_0px_#27272a]`
                    } `}
                  >
                    <div
                      className={`absolute h-5 w-5 rounded-full border-2 bg-white transition-all duration-300 ${
                        enabled ? "translate-x-9 border-black" : "translate-x-1 border-zinc-400"
                      } `}
                    />
                  </button>
                </div>
              </div>

              {/* Start Button */}
              <button
                className="mt-10 w-full rounded-2xl bg-linear-to-r from-indigo-300 via-violet-300 to-pink-300 px-6 py-5 text-lg font-bold text-black shadow-[0_20px_60px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(168,85,247,0.45)]"
                type="submit"
              >
                Initialize Engine
              </button>

              {/* Status Card */}
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-400/20 to-cyan-400/20 text-2xl shadow-lg">
                  ✨
                </div>

                <div>
                  <h3 className="font-semibold text-white">Nebula-4 Cluster</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                    Latency: 42ms • Region: Orbit-Alpha
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
