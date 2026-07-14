export default function Loading() {
  return (
    <div className="min-h-screen flex gap-3 justify-center items-center">
        <div>
            <p className="text-2xl">loading, please wait!!</p>
        </div>
      <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}