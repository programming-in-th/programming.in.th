import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  return (
    <select
      value={theme}
      className="block w-28 rounded-md border border-gray-800 py-1 pl-3 text-base focus:outline-none sm:text-sm md:w-32"
      onChange={e => setTheme(e.target.value)}
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}

export default ThemeSwitch
