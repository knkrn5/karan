import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type chatbotStore = {
    msgWithoutAuth: number
    cbMsgSessionHistory: { role: 'user' | 'system'; content: string }[]
    setMsgWithoutAuth: (value: number) => void
    setCbMsgSessionHistory: (value: { role: 'user' | 'system'; content: string }[]) => void
}

export const useChatbotStore = create<chatbotStore>()(
    persist(
        (set) => ({
            msgWithoutAuth: 0,
            setMsgWithoutAuth: (value: number) => set({ msgWithoutAuth: value }),

            cbMsgSessionHistory: [],
            setCbMsgSessionHistory: (value: { role: 'user' | 'system'; content: string }[]) => set({ cbMsg: value }),

        }),
        {
            name: 'chatbot',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)