"use client";

import { useSidebar } from "@/utils/sidebar.context";

export default function Page() {
  const { open } = useSidebar();

  return (
    <main className={`relative min-h-screen overflow-hidden bg-[#07090f] text-white ${open ? "" : "ml-20"} transition-all duration-300`}>
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          {/* Heading */}
          <div className="space-y-3">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[0.2em] text-zinc-300 backdrop-blur-xl">
              AI SPEECH TRANSCRIPTION
            </span>

            <h1 className="bg-gradient-to-r from-white via-zinc-200 to-indigo-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
              STT Studio
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
              Upload audio recordings, preview speech files, and convert voice
              into highly accurate structured transcription powered by Nebula
              neural inference.
            </p>
          </div>

          {/* Upload Card */}
          <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-indigo-400/30 hover:bg-white/[0.06]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-black/20 px-6 text-center transition-all duration-300 hover:border-indigo-400/40 hover:bg-black/30">
              {/* Upload Icon */}
              <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 shadow-[0_0_80px_rgba(99,102,241,0.25)] backdrop-blur-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-14 w-14 text-indigo-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V3.75m0 0L7.5 8.25M12 3.75l4.5 4.5M3.75 15v2.25A2.25 2.25 0 006 19.5h12a2.25 2.25 0 002.25-2.25V15"
                  />
                </svg>
              </div>

              <h2 className="mb-3 text-4xl font-semibold tracking-tight text-white">
                Drop your audio file
              </h2>

              <p className="mb-10 max-w-lg text-base leading-relaxed text-zinc-400">
                Drag & drop WAV, MP3, FLAC, or M4A recordings into the
                transcription engine. Real-time processing and waveform preview
                supported.
              </p>

              {/* Upload Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="rounded-2xl bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 px-8 py-4 text-base font-semibold text-black shadow-[0_10px_40px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(168,85,247,0.45)]">
                  Browse Files
                </button>

                <button className="rounded-2xl border border-white/10 bg-white/[0.05] px-8 py-4 text-base font-medium text-zinc-300 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:text-white">
                  Live Recording
                </button>
              </div>

              {/* Audio Preview */}
              <div className="mt-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/20 text-indigo-200">
                      🎵
                    </div>

                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-white">
                        nebula-podcast-recording.mp3
                      </h3>
                      <p className="text-xs text-zinc-500">
                        8.4 MB • 04:12 Duration
                      </p>
                    </div>
                  </div>

                  <button className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white">
                    Remove
                  </button>
                </div>

                {/* Fake Waveform */}
                <div className="flex h-20 items-end gap-[4px] overflow-hidden rounded-xl bg-white/[0.03] px-3 py-4">
                  {Array.from({ length: 70 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full rounded-full bg-gradient-to-t from-indigo-400 to-cyan-300 opacity-80"
                      style={{
                        height: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Processing Card */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 shadow-xl backdrop-blur-2xl">
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
                Processing...
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-zinc-300 backdrop-blur-xl">
              <p className="leading-8 text-zinc-400">
                “Welcome to Nebula Studio. Today we are exploring how advanced
                neural speech recognition models convert complex human audio
                patterns into semantically structured data pipelines...”
              </p>
            </div>

            {/* Progress */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>Upload Progress</span>
                <span>74%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 shadow-[0_0_20px_rgba(129,140,248,0.7)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Config Panel */}
        <aside className="w-full max-w-sm">
          <div className="sticky top-8 rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-2xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/20 to-pink-400/20 text-2xl shadow-lg">
                ⚙️
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Configuration
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Optimize transcription intelligence
                </p>
              </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                Model Size
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Tiny",
                    desc: "Fastest speed",
                  },
                  {
                    name: "Base",
                    desc: "Efficient balance",
                  },
                  {
                    name: "Medium",
                    desc: "Best overall",
                    active: true,
                  },
                  {
                    name: "Large",
                    desc: "Highest accuracy",
                  },
                ].map((model) => (
                  <button
                    key={model.name}
                    className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                      model.active
                        ? "border-indigo-300/40 bg-indigo-400/10 shadow-[0_0_40px_rgba(129,140,248,0.15)]"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-semibold text-white">
                        {model.name}
                      </span>

                      {model.active && (
                        <div className="h-3 w-3 rounded-full bg-indigo-300 shadow-[0_0_15px_rgba(129,140,248,1)]" />
                      )}
                    </div>

                    <p className="text-xs leading-relaxed text-zinc-500">
                      {model.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Translate to English",
                  desc: "Auto-detect source language",
                  active: true,
                },
                {
                  title: "Voice Activity Detection",
                  desc: "Skip silent intervals",
                  active: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                  </div>

                  <button
                    className={`relative h-8 w-14 rounded-full transition-all duration-300 ${
                      item.active
                        ? "bg-indigo-300 shadow-[0_0_20px_rgba(129,140,248,0.5)]"
                        : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ${
                        item.active ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Start Button */}
            <button className="mt-10 w-full rounded-2xl bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 px-6 py-5 text-lg font-semibold text-black shadow-[0_20px_60px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_80px_rgba(168,85,247,0.45)]">
              Initialize Engine
            </button>

            {/* Status Card */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 text-2xl shadow-lg">
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
      </section>
    </main>
  );
}
