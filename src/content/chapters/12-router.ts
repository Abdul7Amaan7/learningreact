
import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'router',
  number: 12,
  title: 'React Router',
  tagline:
    'Master client-side routing — URLs, navigation, dynamic routes, nested layouts, authentication, and data loading.',
  priority: 'high',

  topics: [
    topic(
      'what-is-react-router',
      'What is React Router?',
      'React Router is a library that helps us navigate between different pages or views in a React application without reloading the entire website. Think of it as a traffic controller: the URL tells React which component should be displayed.',
      [
        [
          'Why do we need routing?',
          `Imagine an e-commerce website with Home, Products, Cart, and Profile pages. Without routing, we would manually manage which component appears. React Router connects URLs to components automatically.

Example:
\`\`\`jsx
// URL: /products
function Products() {
  return <h1>Our Products</h1>
}

// URL: /cart
function Cart() {
  return <h1>Your Cart</h1>
}
\`\`\`

When the URL changes, React Router displays the matching component without a complete browser refresh.`,
        ],
        [
          'How React Router works',
          `1. The user visits or navigates to a URL.
2. React Router checks the route configuration.
3. It finds the matching route.
4. It renders the corresponding component.
5. If the route is nested, the child renders inside <Outlet />.

React Router v6 and v7 use a similar core routing mental model. Data APIs provide additional features such as loaders, actions, and error handling.`,
        ],
      ],
      [
        {
          q: 'What is React Router?',
          a: 'React Router is a routing library for React that maps URLs to components and supports navigation, dynamic parameters, nested layouts, and data loading without full page reloads.',
        },
        {
          q: 'Why is React Router used in SPAs?',
          a: 'It enables multiple URL-based views in a Single Page Application while maintaining client-side navigation and a smooth user experience.',
        },
      ],
    ),

    topic(
      'installing-react-router',
      'Installing React Router',
      'React Router is an external library. We install it using npm and import its components and hooks into our React application.',
      [
        [
          'Installation',
          `Run this command inside your React project:

\`\`\`bash
npm install react-router-dom
\`\`\`

Then import the required features:

\`\`\`jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
\`\`\``,
        ],
        [
          'Two ways to configure routing',
          `**Declarative routing:**

\`\`\`jsx
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
\`\`\`

**Data router:**

\`\`\`jsx
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
])

function App() {
  return <RouterProvider router={router} />
}
\`\`\`

Use the data router when you need features such as loaders, actions, and route-level error handling.`,
        ],
      ],
      [
        {
          q: 'How do you install React Router?',
          a: 'Run npm install react-router-dom and configure the application using BrowserRouter with Routes, or createBrowserRouter with RouterProvider.',
        },
        {
          q: 'When should you use createBrowserRouter?',
          a: 'Use it when you want React Router data APIs such as loaders, actions, route-level error handling, and data-aware navigation.',
        },
      ],
    ),

    topic(
      'browserrouter',
      'BrowserRouter',
      'BrowserRouter connects React Router to the browser history API. It allows us to use clean URLs such as /about and /products/10 instead of hash-based URLs.',
      [
        [
          'Example',
          `\`\`\`jsx
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  )
}
\`\`\`

BrowserRouter should normally wrap your application once, near the root.`,
        ],
        [
          'Other router types',
          `**BrowserRouter:** Uses normal URLs such as /products. Requires server fallback configuration for direct navigation to SPA routes.

**HashRouter:** Uses URLs such as /#/products. Useful when server rewrite configuration is unavailable.

**MemoryRouter:** Keeps navigation history in memory. Useful for tests and environments without a browser URL.

**StaticRouter:** Used in server-side rendering scenarios.`,
        ],
        [
          'Important deployment point',
          'When a user refreshes /products/10, the server must serve the React application entry file. Otherwise, the server may return a 404 even though the route works during client-side navigation.',
        ],
      ],
      [
        {
          q: 'BrowserRouter vs HashRouter?',
          a: 'BrowserRouter uses clean URLs and requires server fallback configuration. HashRouter uses the # fragment and generally avoids server rewrite requirements.',
        },
        {
          q: 'Where should BrowserRouter be placed?',
          a: 'Usually at the application root so all components that need routing functionality are inside the router context.',
        },
      ],
    ),

    topic(
      'routes',
      'Routes',
      '<Routes> is a container that checks its child Route elements and renders the best matching route branch for the current URL.',
      [
        [
          'Example',
          `\`\`\`jsx
import {
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}
\`\`\`

Only the matching route branch is rendered.`,
        ],
        [
          'Important v5 vs v6 difference',
          'In React Router v5, we used <Switch>. In v6 and v7, we use <Routes>. Routes ranks route matches instead of simply rendering the first matching route in order.',
        ],
      ],
      [
        {
          q: 'What replaced Switch in React Router v6?',
          a: '<Routes> replaced <Switch>. It uses route ranking to select the most specific matching route.',
        },
        {
          q: 'Can we put a normal component directly inside Routes?',
          a: 'No. Routes expects Route elements or fragments containing Route elements as its children.',
        },
      ],
    ),

    topic(
      'route',
      'Route',
      '<Route> defines a mapping between a URL pattern and the React element that should appear when that URL matches.',
      [
        [
          'Basic route',
          `\`\`\`jsx
<Routes>
  <Route
    path="/about"
    element={<About />}
  />

  <Route
    path="/products"
    element={<Products />}
  />
</Routes>
\`\`\`

The path represents the URL. The element represents the component to render.`,
        ],
        [
          'Index routes and wildcard routes',
          `**Index route:** Displays the default child when the parent URL matches exactly.

\`\`\`jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
</Route>
\`\`\`

**Wildcard route:**

\`\`\`jsx
<Route path="*" element={<NotFound />} />
\`\`\`

The wildcard route is useful for displaying a 404 page.`,
        ],
      ],
      [
        {
          q: 'How do you define a route in React Router v6?',
          a: 'Use <Route path="/url" element={<Component />} /> inside <Routes>, or define the route as an object when using createBrowserRouter.',
        },
        {
          q: 'What is an index route?',
          a: 'An index route is the default child route rendered when the parent URL matches exactly. It is defined using <Route index element={<Component />} />.',
        },
      ],
    ),

    topic(
      'link-vs-navlink',
      'Link vs NavLink',
      'Both Link and NavLink allow users to navigate between routes without a complete page reload. NavLink additionally provides information about whether its destination is currently active.',
      [
        [
          'Link',
          `Use Link for normal navigation.

\`\`\`jsx
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}
\`\`\``,
        ],
        [
          'NavLink',
          `Use NavLink when you need active navigation styling.

\`\`\`jsx
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? 'active' : ''
        }
      >
        Dashboard
      </NavLink>
    </nav>
  )
}
\`\`\`

NavLink automatically adds aria-current="page" when active, which also helps accessibility.`,
        ],
        [
          'Important mistake',
          'Avoid using <a href="/about"> for internal SPA navigation when you want client-side routing. Use <Link to="/about"> instead. Normal anchor links are still appropriate for external websites.',
        ],
      ],
      [
        {
          q: 'What is the difference between Link and NavLink?',
          a: 'Link performs client-side navigation. NavLink also exposes active-state information and automatically adds aria-current="page" when active.',
        },
        {
          q: 'Where should NavLink be used?',
          a: 'It is especially useful in navigation bars, sidebars, menus, and tabs where the current page should be visually highlighted.',
        },
      ],
    ),

    topic(
      'usenavigate',
      'useNavigate()',
      'useNavigate() is a React Router hook that lets us navigate programmatically. It is useful when navigation should happen after an action such as login, logout, form submission, or a button click.',
      [
        [
          'Basic example',
          `\`\`\`jsx
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  function handleLogin() {
    // Perform login logic
    navigate('/dashboard')
  }

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  )
}
\`\`\``,
        ],
        [
          'Navigation options',
          `\`\`\`jsx
navigate('/dashboard')

// Replace the current history entry
navigate('/dashboard', {
  replace: true,
})

// Pass temporary navigation state
navigate('/login', {
  state: { from: '/profile' },
})

// Go back
navigate(-1)

// Go forward
navigate(1)
\`\`\`

Use replace when you do not want the user to return to the previous page using the Back button.`,
        ],
        [
          'Best practice',
          'Call navigate inside event handlers or effects. Avoid calling it directly during rendering because navigation is a side effect.',
        ],
      ],
      [
        {
          q: 'How do you navigate programmatically?',
          a: 'Call useNavigate() inside a component and use the returned function, such as navigate("/dashboard"), in an event handler or effect.',
        },
        {
          q: 'What does navigate(-1) do?',
          a: 'It moves backward one entry in the browser history, similar to the Back button.',
        },
      ],
    ),

    topic(
      'useparams',
      'useParams()',
      'useParams() reads dynamic values from the URL. It is useful when different URLs should display different records using the same component.',
      [
        [
          'Example: user profile',
          `\`\`\`jsx
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams()

  return (
    <h1>User ID: {id}</h1>
  )
}

// Route
<Route
  path="/users/:id"
  element={<UserProfile />}
/>
\`\`\`

Visiting /users/101 returns id = "101".`,
        ],
        [
          'Important points',
          `- Dynamic route segments begin with a colon.
- Parameters are usually strings.
- Convert them when you need numeric values.
- Use the parameter to fetch the corresponding data.

Example:
\`\`\`jsx
const userId = Number(id)
\`\`\``,
        ],
      ],
      [
        {
          q: 'How do you read a dynamic route parameter?',
          a: 'Use const { id } = useParams() when the route contains a segment such as /users/:id.',
        },
        {
          q: 'Does useParams return a number?',
          a: 'No. Route parameters are strings. Convert them using Number(), parseInt(), or another appropriate method if required.',
        },
      ],
    ),

    topic(
      'uselocation',
      'useLocation()',
      'useLocation() returns information about the current URL and navigation. It helps us understand where the user is in the application.',
      [
        [
          'Example',
          `\`\`\`jsx
import { useLocation } from 'react-router-dom'

function CurrentPage() {
  const location = useLocation()

  return (
    <div>
      <p>Path: {location.pathname}</p>
      <p>Query: {location.search}</p>
      <p>Hash: {location.hash}</p>
    </div>
  )
}
\`\`\``,
        ],
        [
          'Location properties',
          `**pathname:** Current path, such as /products

**search:** Query string, such as ?category=books

**hash:** URL fragment, such as #reviews

**state:** Temporary state passed through Link or navigate

**key:** Unique key associated with the location entry`,
        ],
        [
          'Practical use cases',
          'Track page views, restore navigation context after login, read temporary state, and implement scroll restoration or location-dependent effects.',
        ],
      ],
      [
        {
          q: 'What does useLocation return?',
          a: 'It returns a location object containing pathname, search, hash, state, and key.',
        },
        {
          q: 'How can useLocation help with authentication?',
          a: 'It allows us to preserve the attempted destination in navigation state so that after login the user can return to the original page.',
        },
      ],
    ),

    topic(
      'usesearchparams',
      'useSearchParams()',
      'useSearchParams() reads and updates query parameters in the URL. Query parameters are useful for filters, sorting, pagination, and search because users can bookmark or share them.',
      [
        [
          'Example',
          `\`\`\`jsx
import {
  useSearchParams,
} from 'react-router-dom'

function ProductSearch() {
  const [searchParams, setSearchParams] =
    useSearchParams()

  const query = searchParams.get('q') || ''

  function handleChange(event) {
    setSearchParams({
      q: event.target.value,
    })
  }

  return (
    <input
      value={query}
      onChange={handleChange}
      placeholder="Search products"
    />
  )
}
\`\`\`

URL example: /products?q=laptop`,
        ],
        [
          'Reading multiple parameters',
          `\`\`\`jsx
const category = searchParams.get('category')
const page = searchParams.get('page')
const sort = searchParams.get('sort')
\`\`\`

Updating search parameters changes the URL and triggers navigation. Remember that searchParams is a stable but mutable object; prefer setSearchParams to update the URL.`,
        ],
      ],
      [
        {
          q: 'How do you handle query parameters in React Router?',
          a: 'Use useSearchParams(). It provides a URLSearchParams object and a setter that updates the URL and navigates.',
        },
        {
          q: 'Why put filters in the URL?',
          a: 'URL-based filters survive refresh, can be bookmarked, and can be shared with other users.',
        },
      ],
    ),

    topic(
      'dynamic-routing',
      'Dynamic routing',
      'Dynamic routing means a single route pattern can handle many URLs by reading variable segments from the URL.',
      [
        [
          'Example',
          `\`\`\`jsx
<Routes>
  <Route
    path="/products/:productId"
    element={<ProductDetails />}
  />
</Routes>
\`\`\`

Examples:
- /products/101
- /products/205
- /products/999

All three URLs use the same ProductDetails component. The component reads productId using useParams() and displays the correct product.`,
        ],
        [
          'Dynamic segments and splats',
          `**Dynamic segment:** /users/:id

**Multiple segments:** /users/:id/orders/:orderId

**Splat:** /docs/*

A splat captures the remaining URL path. Use it for wildcard matching, such as documentation routes or 404 handling.`,
        ],
        [
          'React Router vs Next.js',
          'React Router uses route declarations or route configuration. Next.js commonly derives routes from the file system. Both can use URL segments to identify dynamic content.',
        ],
      ],
      [
        {
          q: 'What is a dynamic route?',
          a: 'A route containing variable URL segments, such as /products/:productId, that allows the same component to display different records.',
        },
        {
          q: 'How do you access a dynamic segment?',
          a: 'Use useParams() in the matched component or access the parameter in a loader.',
        },
      ],
    ),

    topic(
      'nested-routing',
      'Nested routing',
      'Nested routing allows us to place child routes inside a parent route. The parent can provide a shared layout while the child content changes based on the URL.',
      [
        [
          'Example',
          `\`\`\`jsx
import {
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        {/* Dashboard navigation */}
      </nav>

      <Outlet />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard />}
      >
        <Route
          index
          element={<DashboardHome />}
        />
        <Route
          path="settings"
          element={<Settings />}
        />
        <Route
          path="profile"
          element={<Profile />}
        />
      </Route>
    </Routes>
  )
}
\`\`\`

URLs:
- /dashboard
- /dashboard/settings
- /dashboard/profile`,
        ],
        [
          'Why use nested routes?',
          `Without nested routes, you may repeat the same header, sidebar, and navigation in every page.

With nested routes:
- Parent component = shared layout
- Child component = page-specific content
- Outlet = placeholder for child content

This reduces duplication and makes layouts easier to maintain.`,
        ],
      ],
      [
        {
          q: 'How do nested routes work?',
          a: 'A parent Route contains child Routes. The parent component renders an Outlet where the matched child route appears.',
        },
        {
          q: 'What happens if a parent layout does not render Outlet?',
          a: 'The parent component can render, but the matched child route will not appear because there is no outlet placeholder.',
        },
      ],
    ),

    topic(
      'protected-routes',
      'Protected routes',
      'Protected routes restrict access to pages that require authentication. For example, a user must log in before accessing a dashboard or profile.',
      [
        [
          'Example',
          `\`\`\`jsx
import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

function ProtectedRoute({ user }) {
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}
\`\`\`

Route configuration:
\`\`\`jsx
<Route element={<ProtectedRoute user={user} />}>
  <Route
    path="/dashboard"
    element={<Dashboard />}
  />
  <Route
    path="/profile"
    element={<Profile />}
  />
</Route>
\`\`\``,
        ],
        [
          'After successful login',
          `\`\`\`jsx
const location = useLocation()
const navigate = useNavigate()

const from = location.state?.from?.pathname || '/'

function handleLogin() {
  // Validate credentials first
  navigate(from, { replace: true })
}
\`\`\`

This allows the user to return to the page they originally wanted to visit.`,
        ],
        [
          'Important security note',
          'A protected React route only controls the frontend experience. Real authorization must also be enforced by the backend API. Hiding a page is not sufficient security.',
        ],
      ],
      [
        {
          q: 'How do you implement protected routes?',
          a: 'Create a wrapper or layout route that checks authentication. If the user is not authenticated, redirect them to login; otherwise render Outlet or children.',
        },
        {
          q: 'Are protected routes enough to secure data?',
          a: 'No. The backend must verify authentication and authorization for every protected API request. Frontend route guards are not a security boundary.',
        },
      ],
    ),

    topic(
      'private-routes',
      'Private routes and role-based access',
      'Private routes usually mean routes that require a logged-in user. Role-based access control (RBAC) goes further by checking what the logged-in user is allowed to do.',
      [
        [
          'Authentication vs authorization',
          `**Authentication:** Who are you? Example: Is this user logged in?

**Authorization:** What are you allowed to access? Example: Can this user open the Admin page?

Example:
\`\`\`jsx
function AdminRoute({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/forbidden" replace />
  }

  return <Outlet />
}
\`\`\``,
        ],
        [
          'Role-based access control',
          `Common roles:
- Admin
- Manager
- Customer
- Employee

You can check user.role or a permission list before rendering a route. A user who is logged in but lacks permission should see a Forbidden / 403 page rather than the login page.`,
        ],
      ],
      [
        {
          q: 'What is the difference between authentication and authorization?',
          a: 'Authentication verifies identity. Authorization checks whether that identity has permission to access a resource.',
        },
        {
          q: 'What is RBAC?',
          a: 'Role-Based Access Control assigns roles to users and uses those roles to determine which resources or actions they can access.',
        },
      ],
    ),

    topic(
      'auth-routing',
      'Authentication-based routing',
      'Authentication-based routing changes what users can access depending on whether they are logged in. A good flow preserves the intended destination and handles loading while authentication is being checked.',
      [
        [
          'Login and logout flow',
          `**Login:**
1. User visits a protected page.
2. Router redirects to login.
3. Login succeeds.
4. User is redirected to the originally requested page.

**Logout:**
1. Clear authentication state.
2. Clear sensitive cached data where appropriate.
3. Redirect to a public page.

\`\`\`jsx
navigate(from, { replace: true })
\`\`\``,
        ],
        [
          'Avoid authentication flicker',
          'When authentication is still being restored from storage or a server session, show a loading state instead of briefly rendering protected content or redirecting prematurely.',
        ],
        [
          'Security best practice',
          'Prefer secure server-managed sessions, such as HttpOnly cookies, where appropriate. Do not rely on client-side route guards or storing sensitive tokens in insecure locations as the only protection.',
        ],
      ],
      [
        {
          q: 'How do you redirect a user back after login?',
          a: 'Store the intended destination in location.state when redirecting to login, then navigate to that destination with replace: true after successful authentication.',
        },
        {
          q: 'Why should we wait for authentication hydration?',
          a: 'To avoid rendering protected content or redirecting to login before the application knows whether the user already has a valid session.',
        },
      ],
    ),

    topic(
      'programmatic-navigation',
      'Programmatic navigation',
      'Programmatic navigation changes the current route through code rather than requiring the user to click a Link.',
      [
        [
          'Three common approaches',
          `**1. useNavigate() — event handlers and effects**
\`\`\`jsx
const navigate = useNavigate()

function handleSubmit() {
  navigate('/success')
}
\`\`\`

**2. Navigate — declarative redirect**
\`\`\`jsx
return isLoggedIn
  ? <Dashboard />
  : <Navigate to="/login" replace />
\`\`\`

**3. redirect() — loaders and actions**
\`\`\`jsx
import { redirect } from 'react-router-dom'

export async function loader() {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  return user
}
\`\`\``,
        ],
        [
          'When should each be used?',
          `- useNavigate(): after an event or effect
- Navigate: redirect as part of rendering
- redirect(): redirect inside data loaders or actions

Avoid triggering navigation directly during render with useNavigate().`,
        ],
      ],
      [
        {
          q: 'What is the difference between Navigate and useNavigate?',
          a: 'Navigate is a declarative component for redirects. useNavigate is a hook that provides a function for programmatic navigation in event handlers and effects.',
        },
        {
          q: 'What is redirect() in React Router?',
          a: 'redirect() returns a redirect response that can be used inside loaders and actions in data-router workflows.',
        },
      ],
    ),

    topic(
      '404-handling',
      '404 page handling',
      'A 404 page appears when the requested URL does not match any valid route. It helps users recover instead of seeing a blank screen.',
      [
        [
          'Example',
          `\`\`\`jsx
import {
  Routes,
  Route,
} from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
\`\`\``,
        ],
        [
          'Nested 404s and data-router errors',
          'A wildcard route can be placed inside a layout for section-specific not-found pages. Data routers also support errorElement or ErrorBoundary for errors thrown by loaders and actions, including responses with status 404.',
        ],
      ],
      [
        {
          q: 'How do you create a 404 page?',
          a: 'Add a wildcard Route using path="*" and render a NotFound component. For data routers, you can also handle 404 responses through route error boundaries.',
        },
        {
          q: 'What is the difference between a wildcard route and errorElement?',
          a: 'A wildcard route handles URLs that do not match a route. errorElement handles errors thrown or returned through route data APIs, such as loader or action errors.',
        },
      ],
    ),

    topic(
      'lazy-routes',
      'Lazy loading routes',
      'Lazy loading routes means loading a page’s JavaScript only when the user needs that page. This reduces the initial bundle size and can improve application startup.',
      [
        [
          'React.lazy + Suspense',
          `\`\`\`jsx
import {
  lazy,
  Suspense,
} from 'react'

const Dashboard = lazy(
  () => import('./Dashboard')
)

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Dashboard />
    </Suspense>
  )
}
\`\`\`

The fallback appears while the component's JavaScript is loading.`,
        ],
        [
          'Route-level lazy loading',
          `With a data router, React Router supports route.lazy:

\`\`\`jsx
const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/dashboard',
    lazy: () => import('./DashboardRoute'),
  },
])
\`\`\`

This can load route modules when users navigate to them.`,
        ],
        [
          'Why lazy load?',
          `Without lazy loading, a large application may download code for every page immediately.

With lazy loading:
- Smaller initial JavaScript bundle
- Faster initial loading
- Code downloaded when needed
- Better scalability for large applications`,
        ],
      ],
      [
        {
          q: 'How do you lazy load a React Router page?',
          a: 'Use React.lazy with Suspense for route components, or use the lazy property in a createBrowserRouter route configuration.',
        },
        {
          q: 'What is Suspense used for here?',
          a: 'Suspense displays a fallback UI while a lazy component is waiting for its JavaScript module to load.',
        },
      ],
    ),

    topic(
      'outlet',
      'Outlet',
      '<Outlet /> is a placeholder inside a parent route component. React Router renders the matched child route at that position.',
      [
        [
          'Example',
          `\`\`\`jsx
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <Header />
      <Sidebar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
\`\`\`

The Header, Sidebar, and Footer stay visible while the child page changes.`,
        ],
        [
          'Outlet context',
          `A parent can also pass context to its child route:

\`\`\`jsx
<Outlet context={{ user, theme }} />
\`\`\`

The child can access it with:
\`\`\`jsx
import { useOutletContext } from 'react-router-dom'

const { user, theme } = useOutletContext()
\`\`\``,
        ],
        [
          'Index routes',
          'An index route is the default child route for the parent URL. It renders inside the parent Outlet when no deeper child path matches.',
        ],
      ],
      [
        {
          q: 'What is Outlet in React Router?',
          a: 'Outlet renders the matched child route inside a parent layout. It allows shared layouts without duplicating UI across pages.',
        },
        {
          q: 'What is useOutletContext?',
          a: 'It reads the context value passed from a parent route through <Outlet context={...} />.',
        },
      ],
    ),

    topic(
      'loaders-actions',
      'Route loaders and actions',
      'Loaders and actions are features of React Router data APIs. A loader provides data before a route renders, while an action handles mutations such as submitting a form.',
      [
        [
          'Loader: fetching data',
          `\`\`\`jsx
import {
  useLoaderData,
} from 'react-router-dom'

async function productsLoader() {
  const response = await fetch('/api/products')

  if (!response.ok) {
    throw new Response(
      'Failed to load products',
      { status: response.status }
    )
  }

  return response.json()
}

function Products() {
  const products = useLoaderData()

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  )
}
\`\`\`

Route configuration:
\`\`\`jsx
{
  path: '/products',
  element: <Products />,
  loader: productsLoader,
}
\`\`\``,
        ],
        [
          'Action: submitting data',
          `\`\`\`jsx
import {
  Form,
  useActionData,
} from 'react-router-dom'

async function contactAction({ request }) {
  const formData = await request.formData()

  const name = formData.get('name')

  return {
    message: \`Hello, \${name}!\`,
  }
}

function Contact() {
  const data = useActionData()

  return (
    <div>
      <Form method="post">
        <input name="name" />
        <button type="submit">Submit</button>
      </Form>

      {data?.message && <p>{data.message}</p>}
    </div>
  )
}
\`\`\`

The action processes the form submission and its returned data can be read using useActionData().`,
        ],
        [
          'Important data-router hooks',
          `**useLoaderData():** Reads data returned by the matched route loader.

**useActionData():** Reads the result returned by the most recent route action.

**useFetcher():** Performs data interactions without navigating to another page.

**Form:** Submits data through React Router and supports progressive enhancement.

**errorElement / ErrorBoundary:** Displays route-specific error UI when data loading or actions fail.`,
        ],
        [
          'Why use loaders instead of useEffect?',
          'A loader can fetch data as part of route navigation, reducing the need for a component to render first and then start fetching data in useEffect. This can help avoid loading waterfalls and centralize route data handling.',
        ],
      ],
      [
        {
          q: 'What is a loader in React Router?',
          a: 'A loader is a function associated with a route that runs before the route renders and provides data through useLoaderData().',
        },
        {
          q: 'What is an action in React Router?',
          a: 'An action handles data mutations such as creating, updating, or deleting information, commonly through Form submissions.',
        },
        {
          q: 'What is the difference between useLoaderData and useActionData?',
          a: 'useLoaderData reads data returned by the route loader. useActionData reads the result returned by the most recent route action.',
        },
      ],
    ),
  ],
}

export default ch
