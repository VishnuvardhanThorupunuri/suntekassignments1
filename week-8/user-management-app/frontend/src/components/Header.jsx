import { NavLink } from "react-router"

function Header() {
  return (
    <div className="flex justify-between px-10 py-5 bg-gray-500 items-center">
        <img className="rounded-full " width="80px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAAY1BMVEX///8AAADi4uK5ubnr6+sxMTHb29vy8vJzc3OgoKDIyMg1NTXBwcFRUVH6+vqYmJgnJyetra09PT3S0tJfX18fHx8aGhqPj48UFBRXV1empqZJSUmGhoYNDQ1ubm5CQkJ9fX37WWSoAAAEGUlEQVR4nO2c2XKrMAyG4wUIq9kSQpomff+nLDTNRgAvtRBnjr+bznR68Y8rW9IvJZuNw+FwOBwOh8PhcGAQVKwIRViwKsCWIoOGbZwfSM8hj9uQYguahhYlGVIW6xTMxeVNa89FcGxp77D3c72fL8MWN4DWk1p76lWFQ+TNiiXEi7AlPmA7iVhCdgW2yBtCqrVHYMu8EiqJJSTEFtpTKIolZAXBkByU1e7Rr5qfK4vtXgbsh6zVENu9u7hi1YP2CmpW82NNtSViLGSNpljUZ4zutdXGeAWZ/tESckRTayCW5FhifRO1BOuemQQCXnWjlxlutDhig/E+TEaJ8ypop4YrXoWiNtIpaB4ccLIv088NP+CUuUy9sn0BJz/8W2oTeae7IrWV2S37xIlbOu0lzbFPUNQaZgfPR1G7mfe+piiRTGizqgark6yM1GJ5IJmRWrRpRGog9oIldpMYqMV5v3q4/oubIg4h1JzbZzB9Rq4buTXqxI9pqsXpG+6ctcSecMVuuE5z1qJPfjXqxhKpnnlGPXTRjfweVccZLy+8UKg0aPlKxHbB8CkVu6bRqbR2jLGnOT9kvz+D7ZzWXZMN/h6Fanv8rVIyNt2l1bcMxo9bxGRWeN2LfwtIGo6/vCm75YSo7eIXraz57ctO939zcvZeHZG9t71nhOx0/V2DopXfQ7V9/HuzKDyd64/Siy9p/dVEj1Rb3TvkLUKJy5+c8fjFLMo49Svfpy9FwfGpnmgXl8tfL5VkcWawdnNZWG711uOcpvXS0/CPy0WfBn+kIfOa8XQVNSMrQkuWY3x8RWmXiuEBU5GO+6beYsEway7WIql8SruLlog5o2ypaXogd+t2O7kTvVBDOVsSaLBdQqzqQpWcBXYVIsO50wjwO0zcbLg7DrjNZOYwTwFc4ZgZzNPA5jSbcdADOv7Xtb3kAI6otS1FOYAXzf7RAh5uZv9ou8OFaoMjALFw7hjE0XaHCyOWg4glBOae2U1jD0ASWmA7M9wAccwNV5Tk5BD3zF5dOwSgzg30pjc6nO2HAoUKhC4U7DeUJhNoVeyb/LZ6xzHs95OGq2pKHGyLpYBi7e8768/2dbC97wxR2j6wXuQW8pmYKRC7gglY5gWZUgIVCiBlwkbhk6UmwI1UK7O99jliQP+DflgW+wHqOft2e7MUePxAbcpNwd387Mua2K8lJurCcLt9wGGhga+VPLHc5orCVEfGorPe499eXm/hD3P6f+klzouvsWWJ6fHmDGO7JgtNPp5RCqxlRl/onq/XYO4ycqFVpAuOumLVkdRqhWRer+OLYKpQ6jp9nkPkteYngqo4TxsO+y3z0feEB2SUndoyzvc32Yd9Hpdtw1axwjgOrxJ2DIXov3IrqVb4DUsOh8PhcDgcDofjP+AbAg80xSmjwukAAAAASUVORK5CYII=" alt="" />
        <ul className="flex gap-5 text-2xl">
        
            <li>
               <NavLink to="" className={({ isActive }) => (isActive ? "bg-blue-500 text-lime-50 rounded-xl p-2 shadow" : "")}>
            Home
          </NavLink>
            </li>
        <li>
          <NavLink
            to="/adduser"
            className={({ isActive }) => (isActive ? "bg-blue-500 text-lime-50 rounded-2xl p-2" : "")}
          >
            AddUser
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/userslist"
            className={({ isActive }) => (isActive ? "bg-blue-500 text-lime-50 rounded-2xl p-2" : "")}
          >
            UsersList
          </NavLink>
        </li>
        </ul>
        </div>
    
  )
}

export default Header