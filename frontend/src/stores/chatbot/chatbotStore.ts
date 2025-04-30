import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type chatbotStore = {
    msgWithoutAuth: number
    setMsgWithoutAuth: (value: number) => void
}

export const useChatbotStore = create<chatbotStore>()(
    persist(
        (set) => ({
            msgWithoutAuth: 0,
            setMsgWithoutAuth: (value: number) => set({ msgWithoutAuth: value }),
        }),
        {
            name: 'chatbot',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)