"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.message || "Invalid email or password.",
        );
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError(
        "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071A33] px-4 py-8 sm:px-6">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#1597C7]/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#087E8B]/15 blur-3xl" />

        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-white/10" />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-2xl shadow-black/30">
          {/* Brand header */}
          <div className="px-6 pb-6 pt-8 text-center sm:px-10 sm:pt-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              <Image
                src="/logo.png"
                alt="The Musafir Diaries"
                width={96}
                height={96}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-5">
              <h1 className="text-2xl font-bold tracking-tight text-[#071A33] sm:text-[28px]">
                The Musafir Diaries
              </h1>

              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="h-px w-6 bg-[#F59E0B]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#64748B]">
                  Admin Portal
                </p>

                <span className="h-px w-6 bg-[#F59E0B]" />
              </div>
            </div>
          </div>

          {/* Form area */}
          <div className="px-6 pb-8 sm:px-10 sm:pb-10">
            <div className="mb-6 rounded-2xl border border-[#087E8B]/10 bg-[#F8FAFC] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                  <ShieldCheck
                    size={18}
                    strokeWidth={2}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#071A33]">
                    Secure administrator access
                  </p>

                  <p className="mt-0.5 text-[11px] leading-4 text-[#64748B]">
                    Sign in to manage your travel platform.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#475569]"
                >
                  Email Address
                </label>

                <div className="group relative">
                  <Mail
                    size={18}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors group-focus-within:text-[#087E8B]"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@themusafirdiaries.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                    className="
                      h-12 w-full rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-11 pr-4
                      text-sm text-[#071A33]
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-[#087E8B]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#087E8B]/10
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold uppercase tracking-wide text-[#475569]"
                  >
                    Password
                  </label>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    size={18}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors group-focus-within:text-[#087E8B]"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                    className="
                      h-12 w-full rounded-xl
                      border border-slate-200
                      bg-slate-50
                      pl-11 pr-12
                      text-sm text-[#071A33]
                      outline-none
                      transition-all
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-[#087E8B]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#087E8B]/10
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="
                      absolute right-2 top-1/2
                      flex h-8 w-8
                      -translate-y-1/2
                      items-center justify-center
                      rounded-lg
                      text-[#94A3B8]
                      transition
                      hover:bg-slate-100
                      hover:text-[#071A33]
                      disabled:opacity-50
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                >
                  <p className="text-xs font-medium leading-5 text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group flex h-12 w-full
                  items-center justify-center gap-2
                  rounded-xl
                  bg-[#087E8B]
                  px-5
                  text-sm font-bold
                  text-white
                  shadow-lg shadow-[#087E8B]/20
                  transition-all duration-200
                  hover:bg-[#076F7A]
                  hover:shadow-xl
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to Admin
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Card footer */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 text-center sm:px-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
              The Musafir Diaries · Administration
            </p>
          </div>
        </div>

        {/* Outside card */}
        <p className="mt-5 text-center text-[11px] text-white/40">
          Authorized administrators only
        </p>
      </div>
    </main>
  );
}