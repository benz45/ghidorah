import { StoreEmployeePageResponse } from '@/model/store/storeEmployeePageResponse'
import { ToggleComponent } from '@/util/util'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Edit from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
export default function StoreDetailBox({
  store,
  isSelected,
  onClick
}: {
  store: StoreEmployeePageResponse
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div className="bg-white rounded-lg ">
      <div className="flex flex-col p-6">
        <div className="w-full flex justify-between">
          <div className="text-sm font-semibold">Store No. {store.id}A</div>
          <div className="text-sm font-semibold">#12345</div>
        </div>
        <div className="w-full flex justify-between mt-2">
          <div className="text-sm font-light">Name: {store.name ?? ''}</div>
        </div>
        <div className="flex mt-4 justify-between">
          <div className="flex">
            <div
              className="px-8 py-1 text-xs text-center bg-primary text-white rounded-lg flex justify-center items-center mr-2 cursor-pointer"
              onClick={() => onClick()}
            >
              <ToggleComponent
                toggle={isSelected}
                begin={<div className="pr-2">Select</div>}
                then={
                  <>
                    <div className="pr-2">Selected</div>
                    <CheckCircleIcon style={{ fontSize: 16 }} />
                  </>
                }
              />
            </div>
          </div>
          <div className="flex">
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <VisibilityIcon />
            </div>
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <Edit />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#EDFCF7] rounded-b-lg px-6 py-2 border-dashed border-t-2 border-success">
        <div className="text-success text-sm">Store Active</div>
      </div>
    </div>
  )
}
