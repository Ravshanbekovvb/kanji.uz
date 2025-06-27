import { create } from 'zustand'

type Store = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	emblaActiveIndex: number
	setEmblaActiveIndex: (index: number) => void
	isUpdate: number
	setIsUpdate: (index: number) => void
	isKanjiCardTitle: string
	setKanjiCardTitle: (title: string) => void
}

export const useStore = create<Store>()(set => ({
	isOpen: true,
	setIsOpen: isOpen => set({ isOpen }),
	emblaActiveIndex: 0,
	setEmblaActiveIndex: index => set({ emblaActiveIndex: index }),
	isUpdate: 0,
	setIsUpdate: index => set({ isUpdate: index }),
	isKanjiCardTitle: '',
	setKanjiCardTitle: title => set({ isKanjiCardTitle: title }),
}))
