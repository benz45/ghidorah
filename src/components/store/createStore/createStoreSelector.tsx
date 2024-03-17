'use client'
import ContentCreateStore from '@/components/store/createStore/contentCreateStore'
import CustomList, { CustomListValueProps } from '@/components/util/customList'
import { Box } from '@mui/material'
import React from 'react'

const CreateStoreSelector = () => {
  const listPages: CustomListValueProps[] = [
    { id: 1, label: 'General Info' },
    { id: 2, label: 'Store Address' },
    { id: 3, label: 'Complete' }
  ]
  const [currentActive, setCurrentActive] = React.useState<CustomListValueProps>(listPages[0])
  return (
    <React.Fragment>
      <div className="flex bg-white 3xl:w-3/4 xl:w-full md:w-full lg:w-full sm:w-full p-6 rounded-lg">
        <div className="block">
          <div className="text-2xl font-bold pb-6">Create Store</div>
          <Box display={'flex'} width={500} className="w-full pl-20">
            <CustomList
              values={listPages}
              currentActive={currentActive}
              onChange={e => setCurrentActive(e)}
              isShowNumberOfList
              disableElements={[2]}
            />
          </Box>
        </div>
        <div className="block w-full pr-8 pl-24 ">
          <div className=" font-semibold text-primary text-xl">{currentActive.id !== 3 && currentActive.label}</div>
          <div className="py-8 flex w-full">
            <ContentCreateStore
              activeId={currentActive.id}
              onPrevious={() => setCurrentActive(listPages[0])}
              onNext={() => setCurrentActive(listPages[1])}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default CreateStoreSelector
