import { create } from 'zustand'
type StoreType = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	emblaActiveIndex: number
	setEmblaActiveIndex: (index: number) => void
	isUpdate: number
	setIsUpdate: (index: number) => void
	isKanjiCardTitle: string
	setKanjiCardTitle: (title: string) => void
	currentAi: 'chatgpt' | 'groq'
	setCurrentAi: (ai: 'chatgpt' | 'groq') => void
	isAddingReading: {
		title: string | null
		id: string | null
		jlptLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | null
	}
	setAddingReading: (
		id: string | null,
		title: string | null,
		jlptlevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | null
	) => void
}

export const useStore = create<StoreType>()(set => ({
	isOpen: true,
	setIsOpen: isOpen => set({ isOpen }),
	emblaActiveIndex: 0,
	setEmblaActiveIndex: index => set({ emblaActiveIndex: index }),
	isUpdate: 0,
	setIsUpdate: index => set({ isUpdate: index }),
	isKanjiCardTitle: '',
	setKanjiCardTitle: title => set({ isKanjiCardTitle: title }),
	currentAi: 'groq',
	setCurrentAi: ai => set({ currentAi: ai }),
	isAddingReading: { id: null, jlptLevel: null, title: null },
	setAddingReading: (id, title, jlptLevel) =>
		set({ isAddingReading: { id: id, jlptLevel: jlptLevel, title: title } }),
}))

// type StorageType = {
// 	currentReadingSection: ReadingSection[]
// 	setCurrentReadingSection: (data: ReadingSection[]) => void
// }
// export const useLocalStorege = create<StorageType>()(
// 	persist(
// 		set => ({
// 			currentReadingSection: [],
// 			setCurrentReadingSection: data => set({ currentReadingSection: data }),
// 		}),
// 		{
// 			name: 'current-section-title', // localStorage key
// 			getStorage: () => localStorage, // default, optional
// 		}
// 	)
// )
