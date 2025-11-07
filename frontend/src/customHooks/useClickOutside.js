import { useEffect, useRef } from "react";

const useClickOutside = (isOpen, onClose, blockers = []) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const main = ref.current;
            const clickedInsideMain = main && main.contains(e.target);
            const clickedInsideBlocker = blockers.some(
                (blocker) => blocker.current && blocker.current.contains(e.target)
            );

            if (!clickedInsideMain && !clickedInsideBlocker) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("pointerdown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [isOpen, onClose, blockers]);

    return ref;
};

export default useClickOutside;