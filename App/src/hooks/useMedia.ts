import {useEffect, useState} from "react";

export const useMedia = (query: string) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, [query]);

    return matches;
};
