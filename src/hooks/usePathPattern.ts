import { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { breadcrumbMap } from "../router/routes";

function usePathPattern() {
  const { pathname } = useLocation();

  const pattern = useMemo(() => {
    for (const routePath of Object.keys(breadcrumbMap)) {
      const pathMatch = matchPath(routePath, pathname);
      if (pathMatch) {
        return pathMatch;
      }
    }
  }, [pathname]);

  return pattern;
}

export default usePathPattern;
