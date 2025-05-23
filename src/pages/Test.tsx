import { create } from 'zustand'

interface TestStore {
    a: string
    b: {
        ba: number
        bb: string
    }
    c: { id: string, x: number }[]
}

interface TestActions {
    setValue: (path: string, value: unknown) => void
}

const deepPartial = (path: string, value: unknown) => path.split('.').reduceRight((result, subpath) => ({[subpath]: result}), value)

const useStore = create<TestStore & TestActions>()((set) => ({
    a: 'xyz',
    b: {
        ba: 0,
        bb: '',
    },
    c: [],
    setValue: (path, value) => set(() => deepPartial(path, value))
}))

export default function Test() {
    const a = useStore(state => state.a)
    const setValue = useStore(state => state.setValue)
    return (
        <>
            <span>{a}</span>
            <button onClick={() => setValue('a', 'asd')} type="button">ASD</button>
        </>
    )
}