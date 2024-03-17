import SearchIcon from '@mui/icons-material/Search'
export default function SearchInput() {
  return (
    <div className="flex w-96 h-14 bg-white px-4 rounded-lg items-center ">
      <SearchIcon className="text-primary" />
      <div className="text-gray-400 ml-2">Search for foods, drinks, etc.</div>
    </div>
  )
}
