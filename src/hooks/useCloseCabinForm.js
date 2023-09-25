import { useEffect, useRef } from "react"

function useCloseCabinForm(handler, scope=true) {
  const ref = useRef()
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("click", handleClick, scope)

    return () => document.removeEventListener("click", handleClick, scope)
  }, [handler, ref, scope])
  return  ref
}

export default useCloseCabinForm