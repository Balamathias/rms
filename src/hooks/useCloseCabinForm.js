import { useEffect, useRef } from "react"

function useCloseCabinForm(handler) {
  const ref = useRef()
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("click", handleClick, true)

    return () => document.removeEventListener("click", handleClick, true)
  }, [handler, ref])
  return  ref
}

export default useCloseCabinForm