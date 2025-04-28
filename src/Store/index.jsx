import { create } from "zustand";

export const useStore = create((set) => (
  {
    // API's Base url
    BASE_URL: 'http://localhost:3000/',
    // Token
    token: localStorage.getItem('token') || null,
    setToken: (accessToken) => {
      set({token: accessToken});
      localStorage.setItem('token', accessToken);
    },
    clearToken: () => {
      set({token: null});
      localStorage.removeItem("token");
    },
    // User Data
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: (newUser) => {
      set({ user: newUser })
      localStorage.setItem('user', JSON.stringify(newUser));
    },
    // Dark And Light Mode
    theme: localStorage.getItem("theme") || "light",
    darkMode: (newMode) => set({ theme: newMode }),
    // close and open sidebar
    closeSide: localStorage.getItem("closeSide") || true,
    setCloseSide: () => set((state) => ({closeSide: !state.closeSide})),
    // Page Name
    pageName: "",
    profileActive: () => set({ pageName: "profile" }),
    yearsActive: () => set({ pageName: "studyYears" }),
    sectionsActive: () => set({ pageName: "sections" }),
    subjectsActive: () => set({ pageName: "subjects" }),
    doctorsActive: () => set({ pageName: "doctors" }),
    studentsActive: () => set({ pageName: "students" }),
    singleSubjectActive: () => set({ pageName: "singleSubject" }),
    markesActive: () => set({ pageName: "markes" }),
    doctorSubjectActive: () => set({ pageName: "doctorSubject" }),
    errorActive: () => set({ pageName: "error" }),
    // PopUp
    popUpToggel: false,
    popUpIsOpen: () => set({ popUpToggel: true }),
    popUpIsClosed: () => set({ popUpToggel: false }),
    popUpInitValues: {},
    setPopUpInitValues: (newPopUpInitValues) => set({popUpInitValues: {...newPopUpInitValues}}),
    mSections: [],
    setMSections: (newMSections) => set({ mSections: newMSections }),
    // Single Subject Data
    singleSubject: JSON.parse(localStorage.getItem("singleSubject")) || null,
    setSingleSubject: (newSingleSubject) => {
      set({ singleSubject: newSingleSubject })
      localStorage.setItem('singleSubject', JSON.stringify(newSingleSubject));
    },
    clearUser: () => {
      set({singleSubject: null});
      localStorage.removeItem("singleSubject");
    },
  }
))