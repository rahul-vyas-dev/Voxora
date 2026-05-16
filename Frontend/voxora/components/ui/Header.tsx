import Link from "next/link";

const navigationItems = [
  {
    label: "Hub",
    href: "/dashboard/hub",
  },
  {
    label: "History",
    href: "/dashboard/history",
  },
  {
    label: "Share",
    href: "/share",
  },
];

export default function Header() {
  return (
    <header
      className="
        sticky top-0 z-50 w-full bg-black"
    >
      <nav
        aria-label="Main navigation"
        className="
          mx-auto flex
          items-center justify-between
          px-5
          py-2
        "
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Go to Voxora homepage"
            className="
            rounded-md
            text-xl font-extrabold
            transition-opacity
            hover:bg-[#262626]
            p-1.5
            "
          >
            VOXORA
          </Link>
        </div>

        {/* Navigation Links */}
        <ul
          className="
            flex items-center gap-3
            "
        >
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="
                  rounded-md p-1.5
                  text-sm font-semibold
                  transition-colors duration-200
                  hover:bg-neutral-100
                  hover:text-black
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
                  focus:ring-offset-2
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
