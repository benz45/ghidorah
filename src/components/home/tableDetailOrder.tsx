'use client'

import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'
import RemoveIcon from '@mui/icons-material/Remove'

export default function TableDetailOrder() {
  return (
    <div className="bg-white flex flex-col justify-between lg:w-2/5 md:w-2/3">
      <div className="p-6">
        <div className="px-4 py-2 bg-primary text-white font-bold text-lg rounded-lg">Table No.</div>
        <div className="px-4 py-2 mt-4 bg-gray-100 text-gray-500 font-bold text-lg rounded-lg">Name</div>
        <div className="flex mt-8 pb-4">
          <div className="w-28 text-center font-semibold py-3 rounded-lg bg-white text-gray-400 mr-4">Dine In</div>
          <div className="w-28 text-center font-semibold py-3 rounded-lg bg-white text-gray-400 mr-4">To Go</div>
          <div className="w-28 text-center font-semibold py-3 rounded-lg bg-success text-white mr-4">Delivery</div>
        </div>
        <TableOrders />
      </div>
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between">
          <div>Sub total</div>
          <div>$1000</div>
        </div>
        <div className="flex justify-between">
          <div>Discount</div>
          <div>$100</div>
        </div>
        <div className="flex mt-4 justify-between">
          <div className="font-bold">Total Payment</div>
          <div className="font-bold">$100</div>
        </div>
        <div className="flex mt-8">
          <div className="w-28 text-center font-semibold py-3 rounded-lg bg-white text-gray-400 mr-4">Cancal</div>
          <div className="w-28 text-center font-semibold py-3 rounded-lg bg-white text-gray-400 mr-4">Add Items</div>
          <div className="w-28 text-center font-semibold py-3 rounded-lg bg-primary text-white mr-4">Pay</div>
        </div>
      </div>
    </div>
  )
}

function TableOrders() {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="h-14">
          <th className="text-start">Items</th>
          <th className="text-center">Qty</th>
          <th className="text-start">Price</th>
          <th className=""></th>
        </tr>
      </thead>
      <tbody>
        <RowTableOrder />
        <RowTableOrder />
        <RowTableOrder />
        <RowTableOrder />
        <RowTableOrder />
        <RowTableOrder />
      </tbody>
    </table>
  )
}

function RowTableOrder() {
  return (
    <tr className="h-14">
      <td>
        <div className="text-sm">The Sliding Mr. Bones</div>
        <div className="text-sm text-primary font-semibold">Discount: $11</div>
      </td>
      <td className="flex justify-center">
        <div className="w-24 font-semibold py-2 rounded-lg bg-primary text-sm text-white flex justify-center ">
          <RemoveIcon fontSize="small" />
          <div className="px-4">1</div>
          <AddIcon fontSize="small" />
        </div>
      </td>
      <td>
        <div className="font-semibold text-sm">$1961</div>
      </td>
      <td className="flex justify-end">
        <div className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-error hover:cursor-pointer flex">
          <CancelIcon />
        </div>
      </td>
    </tr>
  )
}
