export default function Loader({ fullScreen = false }) {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 backdrop-blur-sm" role="status" aria-label="Loading">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-blue-600 font-medium animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );
}
