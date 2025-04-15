import { create } from "zustand";

export const useStore = create((set) => (
  {
    theme: localStorage.getItem("theme") || "light",
    darkMode: (newMode) => set({ theme: newMode }),
    pageName: "studyYears",
    yearsActive: () => set((state) => ({pageName: "studyYears"})),
    sectionsActive: () => set((state) => ({pageName: "sections"})),
    subjectsActive: () => set((state) => ({pageName: "subjects"})),
    doctorsActive: () => set((state) => ({pageName: "doctors"})),
    studentsActive: () => set((state) => ({pageName: "students"})),
    popUpToggel: false,
    popUpIsOpen: () => set((state) => ({popUpToggel: true})) ,
    popUpIsClosed: () => set((state) => ({popUpToggel: false})) ,
  }
))