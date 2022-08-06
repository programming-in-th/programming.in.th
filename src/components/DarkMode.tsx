import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  return (
    <select
      value={theme}
      className="mt-1 block w-48 rounded-md border border-gray-800 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
      onChange={e => setTheme(e.target.value)}
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}

export default ThemeSwitch
