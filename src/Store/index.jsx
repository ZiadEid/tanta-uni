import { create } from "zustand";

export const useStore = create((set) => (
  {
    // Dark And Light Mode
    theme: localStorage.getItem("theme") || "light",
    darkMode: (newMode) => set({ theme: newMode }),
    // close and open sidebar
    closeSide: localStorage.getItem("closeSide") || true,
    setCloseSide: () => set((state) => ({closeSide: !state.closeSide})),
    // Page Name
    pageName: "studyYears",
    profileActive: () => set({ pageName: "profile" }),
    yearsActive: () => set({ pageName: "studyYears" }),
    sectionsActive: () => set({ pageName: "sections" }),
    subjectsActive: () => set({ pageName: "subjects" }),
    doctorsActive: () => set({ pageName: "doctors" }),
    studentsActive: () => set({ pageName: "students" }),
    marksActive: () => set({ pageName: "markes" }),
    errorActive: () => set({ pageName: "error" }),
    // PopUp
    popUpToggel: false,
    popUpIsOpen: () => set({ popUpToggel: true }),
    popUpIsClosed: () => set({ popUpToggel: false }),
    popUpInitValues: {},
    setPopUpInitValues: (newPopUpInitValues) => set({popUpInitValues: {...newPopUpInitValues}}),
    // Years
    years: [],
    setYears: (newYears) => set({ years: [...newYears] }),
    // sections
    sections: [],
    setSections: (newSections) => set({ sections: [...newSections] }),
    // Subjects
    subjects: [],
    setSubjects: (newSubjects) => set({subjects: [...newSubjects]}),
    // Doctors
    doctors: [],
    setDoctors: (newDoctors) => set({doctors: [...newDoctors]}),
    // Students
    students: [],
    setStudents: (newStudents) => set({students: [...newStudents]}),
    // Marks
    marks: [],
    setMarks: (newMarks) => set({marks: [...newMarks]}),
  }
))