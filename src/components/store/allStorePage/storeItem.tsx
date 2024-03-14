import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import PrintIcon from '@mui/icons-material/Print'
import React from 'react'

export default function StoreItem() {
  const [isLoading, setIsLoading] = React.useState(true)
  if (isLoading) {
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
  return (
    <div className="bg-white rounded-lg animate-pulse ">
      <div className="flex flex-col p-6">
        <div className="w-full flex justify-between">
          <div className="text-sm font-semibold">Table No. 2A</div>
          <div className="text-sm font-semibold">#12345</div>
        </div>
        <div className="w-full flex justify-between mt-2">
          <div className="text-sm font-light">Name: Veerapan Boonbuth</div>
          <div className="text-sm font-light">$1000</div>
        </div>
        <div className="flex mt-4 justify-between">
          <div className="flex">
            <div className="px-8 py-1 text-xs text-center bg-primary text-white rounded-lg flex justify-center items-center mr-2">
              <div>Pay</div>
            </div>
            <div className="px-5 py-1 text-xs text-center bg-gray-100 text-gray-400 rounded-lg flex justify-center items-center">
              <div>Pay later</div>
            </div>
          </div>
          <div className="flex">
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <CloseIcon />
            </div>
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <PrintIcon />
            </div>
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <EditIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#EDFCF7] rounded-b-lg px-6 py-2 border-dashed border-t-2 border-success">
        <div className="text-success text-sm">Dine in</div>
      </div>
    </div>
  )
}