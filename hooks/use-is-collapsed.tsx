import * as React from "react";

const COLLAPSED_BREAKPOINT = 1100;
const MOBILE_BREAKPOINT = 768;

export function useIsCollapsed() {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const onChange = () => {
      const width = window.innerWidth;
      setIsCollapsed(
        width >= MOBILE_BREAKPOINT && width < COLLAPSED_BREAKPOINT,
      );
    };

    window.addEventListener("resize", onChange);
    onChange(); // Run once on mount

    return () => window.removeEventListener("resize", onChange);
  }, []);

  return !!isCollapsed;
}
