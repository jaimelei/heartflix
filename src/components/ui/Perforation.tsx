export default function Perforation() {
    return (
        <div
            aria-hidden="true"
            style={{
                height: "14px",
                flexShrink: 0,
                backgroundImage:
                    "radial-gradient(circle at 10px 7px, transparent 5.5px, var(--color-surface) 6px)",
                backgroundSize: "18px 14px",
                backgroundRepeat: "repeat-x",
            }}
        />
    );
}