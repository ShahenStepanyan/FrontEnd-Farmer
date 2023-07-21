import { useMemo } from "react";

export default function useKeyBy<T extends Record<any, any>>(
  collection: Array<T>,
  key: keyof T
) {
  return useMemo(() => {
    const map: Record<string, T> = {};
    collection.forEach((item) => {
      map[item[key]] = item;
    });
    return map;
  }, [collection]);
}
