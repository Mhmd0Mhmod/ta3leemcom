export function Spinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
            <div className="w-16 h-16 border-8 border-t-white border-gray-200 rounded-full animate-spin"></div>
        </div>
    );
}