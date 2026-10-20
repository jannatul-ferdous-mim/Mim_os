// Dark desktop backdrop: two slow drifting glows and a faint grid that
// scrolls diagonally. Everything animates with transforms only, so it stays
// cheap inside the 3D scene's iframe.
export default function Background() {
    return (
        <div className="bg" aria-hidden="true">
            <div className="bg-glow bg-glow-a" />
            <div className="bg-glow bg-glow-b" />
            <div className="bg-grid-mask">
                <div className="bg-grid" />
            </div>
            <div className="bg-vignette" />
        </div>
    );
}
