export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center space-x-2 my-10">
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
    )
};