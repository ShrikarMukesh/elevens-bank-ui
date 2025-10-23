export default function FavouriteLinks() {
    const links = [
        "Account Statement",
        "Open FD",
        "Download FD Summary",
        "Sweep-in / OD against FD",
        "CASA Interest Certificate",
    ];

    return (
        <div className="bg-blue-950 p-4 rounded-2xl shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-3">My Favourite Links</h3>
            <ul className="space-y-2 text-sm">
                {links.map((link) => (
                    <li
                        key={link}
                        className="flex justify-between items-center border-b border-blue-800 pb-2"
                    >
                        <span>{link}</span>
                        <span>›</span>
                    </li>
                ))}
            </ul>
            <button className="text-purple-400 text-sm mt-3">Add & Edit Links</button>
        </div>
    );
}
