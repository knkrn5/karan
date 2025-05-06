import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type chatbotStore = {
    msgWithoutAuth: number
    setMsgWithoutAuth: () => void
}

export const useChatbotStore = create<chatbotStore>()(
    persist(
        (set, get) => ({
            msgWithoutAuth: 0,
            setMsgWithoutAuth: () => set({ msgWithoutAuth: get().msgWithoutAuth + 1 }),
        }),
        {
            name: 'chatbot',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)