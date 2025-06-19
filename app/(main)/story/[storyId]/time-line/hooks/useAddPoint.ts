import { useTimeLineContext } from '../context/TimeLineContext'

export function useAddPoint(): AddPointFunction {
  const { timeLine, setTimeLine } = useTimeLineContext()
  return (position) => setTimeLine({ ...timeLine, addingPoint: position })
}

export type AddPointFunction = (position: { line: number; x: number }) => void
