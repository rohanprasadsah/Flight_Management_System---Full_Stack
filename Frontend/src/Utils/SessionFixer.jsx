import { useEffect } from "react";
import {
  debugAuthState,
  repairAuthSession,
  isFullyAuthenticated,
} from "./authUtils";

/**
 * SessionFixer - Automatically fixes localStorage session issues
 *
 * This component runs automatically when the app loads and fixes
 * common localStorage issues like missing role data.
 */
const SessionFixer = () => {
  useEffect(() => {
    const fixLocalStorage = () => {
      try {
        const authState = debugAuthState();
        if (authState.isComplete) {
          return;
        }
        const repaired = repairAuthSession();

        if (repaired) {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else if (authState.hasToken || authState.hasUser) {
        } else {
        }
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    };
    const timer = setTimeout(fixLocalStorage, 800);

    return () => clearTimeout(timer);
  }, []);
  return null;
};

export default SessionFixer;
