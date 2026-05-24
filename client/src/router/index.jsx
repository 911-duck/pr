import { createBrowserRouter } from 'react-router'
import RootLayout from '../layouts/root/RootLayout'
import About from '../pages/About/About'
import Singin from '../pages/Singin/Singin'
import Signup from '../pages/Signup/Signup'
import GameLayout from './../layouts/game/GameLayout'
import Home from '../pages/Home/Home'
import Practice from '../pages/Practice/Practice'
import Sandbox from '../pages/Sandbox/Sandbox'
import PublicHome from '../pages/PublicHome/PublicHome'
import Create from '../pages/Create/Create'
import Profile from '../pages/Profile/Profile'

export const router = createBrowserRouter([	
	{
		path: '/',
		element: <RootLayout />,
		children:[
			{
				path: '/',
				element: <About />
			},
			{
				path: '/SINGIN',
				element: <Singin />
			},
			{
				path: '/SIGNUP',
				element: <Signup />
			}
		]
	}
	,
	{
		path: 'GAME',
		element: <GameLayout />,
		children:[
			{
				path: '/GAME/',
				element: <Home />
			},
			{
				path: '/GAME/PRACTICE',
				element: <Practice />
			},
			{
				path: '/GAME/SANDBOX',
				element: <Sandbox />
			},
			{
				path: '/GAME/PUBLIC',
				element: <PublicHome />
			},
			{
				path: '/GAME/CREATE',
				element: <Create />
			},
			{
				path: '/GAME/PROFILE',
				element: <Profile />
			}
		]
	}
])