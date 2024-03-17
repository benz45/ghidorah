export default function StoreItemLoading() {
  return (
    <div className=" bg-white bg-opacity-70 rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-6">
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-5">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-white rounded col-span-1"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-3"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
              <div className="h-2 bg-slate-300 rounded col-span-3"></div>
            </div>
          </div>
          <div className="h-2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}
