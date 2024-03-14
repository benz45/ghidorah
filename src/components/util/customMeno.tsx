import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Divider } from '@mui/material'
import Button, { ButtonOwnProps, ButtonPropsVariantOverrides } from '@mui/material/Button'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { alpha, styled } from '@mui/material/styles'
import * as React from 'react'
import { Each } from '~/util/util'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}))

interface CustomizedMenusProps {
  id?: string
  menulabel: string
  options: { icon: React.JSX.Element; label: string; onClick?: () => void; isShowDividerBottom?: boolean }[]
  variant?: ButtonOwnProps['variant']
  className?: string
}

export default function CustomizedMenus(props: CustomizedMenusProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event?: () => void) => {
    setAnchorEl(null)
    event?.()
  }

  return (
    <div className={`${props.className}`}>
      <Button
        id={props.id ?? ''}
        aria-controls={open ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant={props.variant ? props.variant : 'contained'}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {props.menulabel}
      </Button>
      <StyledMenu
        id="customized-menu"
        MenuListProps={{
          'aria-labelledby': 'customized-menu-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(undefined)}
      >
        <Each
          values={props.options}
          render={(elem, index) => (
            <React.Fragment>
              <MenuItem key={`menuOptions-${index}`} onClick={() => handleClose(elem.onClick)} disableRipple>
                {elem.icon}
                {elem.label}
              </MenuItem>
              {elem.isShowDividerBottom && <Divider />}
            </React.Fragment>
          )}
        />
      </StyledMenu>
    </div>
  )
}
