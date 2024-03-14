import AddIcon from '@mui/icons-material/Add'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CustomizedMenus from '~/components/util/customMeno'

export default function OptionSelectStore() {
  return (
    <div className="flex">
      <CustomizedMenus
        variant="text"
        className="pr-4"
        menulabel="Store Name"
        options={[
          {
            icon: <StorefrontIcon />,
            label: 'Store Name',
            onClick: () => {}
          },
          {
            icon: <StorefrontIcon />,
            label: 'Store Name',
            isShowDividerBottom: true,
            onClick: () => {}
          },
          {
            icon: <AddIcon />,
            label: 'Create Store',
            onClick: () => {}
          }
        ]}
      />
    </div>
  )
}
