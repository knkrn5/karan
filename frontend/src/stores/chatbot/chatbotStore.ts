import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type chatbotStore = {
    msgWithoutAuth: number
    cbMsgSessionHistory: { role: 'user' | 'system'; content: string }[]
    setMsgWithoutAuth: () => void
    setCbMsgSessionHistory: (value: { role: 'user' | 'system'; content: string }[]) => void
}

export const useChatbotStore = create<chatbotStore>()(
    persist(
        (set, get) => ({
            msgWithoutAuth: 0,
            setMsgWithoutAuth: () => set({ msgWithoutAuth: get().msgWithoutAuth + 1 }),

            cbMsgSessionHistory: [],
            setCbMsgSessionHistory: (value: { role: 'user' | 'system'; content: string }[]) => set({ cbMsgSessionHistory: value }),

        }),
        {
            name: 'chatbot',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)