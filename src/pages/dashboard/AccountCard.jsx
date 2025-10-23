export default function AccountCard({
                                        title,
                                        subtitle,
                                        action,
                                        color = "from-purple-700 to-indigo-800",
                                    }) {
    return (
        <div
            className={`bg-gradient-to-br ${color} p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200`}
        >
            <p className="text-sm mb-1 opacity-80">{title}</p>
            <p className="text-2xl font-semibold mb-3">{subtitle}</p>
            <button className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 text-sm">
                {action}
            </button>
        </div>
    );
}
