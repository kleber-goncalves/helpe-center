import { DesktopNavbar } from "./DesktopNavbar";
import { MobileHeader } from "./MobileHeader";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function Header() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? <DesktopNavbar /> : <MobileHeader />;
}
