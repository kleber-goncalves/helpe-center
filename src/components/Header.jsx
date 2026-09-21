import { DesktopNavbar } from "./DesktopNavbar";
import { MobileHeader } from "./MobileHeader";

export function Header() {
    return (
        <>
            {/* Desktop */}
            <div className="hidden md:block">
                <DesktopNavbar />
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <MobileHeader />
            </div>
        </>
    );
}
