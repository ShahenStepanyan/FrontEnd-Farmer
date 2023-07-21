import { useEffect, useRef, useState } from "react";

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  });
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    function onResize() {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setScreenSize({
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        });
      }, 250);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return screenSize;
}
