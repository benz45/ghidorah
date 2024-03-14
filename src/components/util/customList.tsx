import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { Each } from '~/util/util'

export interface CustomListValueProps {
  id: number
  label: string
  href?: string
}

export interface CustomListProps {
  currentActive: CustomListValueProps
  isShowNumberOfList?: boolean
  values: CustomListValueProps[]
  onChange?: (event: CustomListValueProps) => void
}

export default function CustomList(props: CustomListProps) {
  const [currentActive, setCurrentActive] = React.useState(props.currentActive)
  const count = props.values.length
  const onChange = (event: CustomListValueProps) => {
    setCurrentActive(event)
    props.onChange?.(event)
  }
  React.useEffect(() => {
    setCurrentActive(props.currentActive)
  }, [props.currentActive])
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav>
        <List>
          <Each
            values={props.values}
            render={(elem, index) => (
              <React.Fragment key={'list_' + index}>
                <ListItem disablePadding sx={{ height: 80 }} onClick={() => onChange(elem)} disableGutters>
                  <ListItemButton component="a" href={elem.href}>
                    <ListItemText>
                      <div
                        className={`${
                          currentActive.id === elem.id ? 'text-primary font-semibold text-lg' : 'text-gray-400'
                        }`}
                      >
                        {`${props.isShowNumberOfList ? `${index + 1}. ` : ''} ${elem.label}`}
                      </div>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                {count !== index + 1 && <Divider />}
              </React.Fragment>
            )}
          />
        </List>
      </nav>
    </Box>
  )
}
