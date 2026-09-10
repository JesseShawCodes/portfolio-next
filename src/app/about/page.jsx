"use client";
import Terminal from "./MockLinux";
import { getLocale } from "../../config/locale";

export default function About() {
  const { about } = getLocale();

  return (
    <div className="container my-5">
      <h1>{about.heading}</h1>
      <Terminal />
    </div>
  )
}
