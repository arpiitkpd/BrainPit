import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'

import Protected from './components/AuthLayout.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import Test from './components/test/Test.jsx'
import EditProfile from './pages/EditProfile.jsx'
import QueryPost from './pages/QueryPost.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:(
          
            <Protected authentication={true}>
              <Home/>
            </Protected>

        ), 
        children:[
          {
            path: "/queryPost/:query",
            element:(
              <Protected authentication>
                <QueryPost/>
              </Protected>
            )
          },
        ]   
        
      },
      {
        path:"/login",
        element:(
          <Protected authentication={false}>
            <Login/>
          </Protected>
        )
      },
      {
        path:"/signup",
        element:(
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        )
      },
      {
        path:"/profile",
        element:(
          <Protected authentication>
            <Profile/>
          </Protected>
        )
      },
      {
        path:"/addpost",
        element:(
          <Protected authentication>
            <AddPost/>
          </Protected>
        )
      },
              
      {
        path:"/infotech/posts",
        element:(
          <Protected authentication>
            <Home tag="IT"/>
          </Protected>
        )
      },
      {
        path:"/medical/posts",
        element:(
          <Protected authentication>
            <Home tag="Medical"/>
          </Protected>
        )
      },
      {
        path:"/engineering/posts",
        element:(
          <Protected authentication>
            <Home tag="Engineering"/>
          </Protected>
        )
      },
      {
        path:"/law/posts",
        element:(
          <Protected authentication>
            <Home tag="Law"/>
          </Protected>
        )
      },
      {
        path:"/management/posts",
        element:(
          <Protected authentication>
            <Home tag="Management"/>
          </Protected>
        )
      },
      {
        path:"/biotech/posts",
        element:(
          <Protected authentication>
            <Home tag="BioTechnology"/>
          </Protected>
        )
      },
      {
        path:"/test",
        element:(
          <Protected authentication>
            <Test/>
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element:(
          <Protected authentication>
            <Post/>
          </Protected>
        )
      },
      
      {
        path: "/edit-post/:slug",
        element:(
          <Protected authentication>
            <EditPost/>
          </Protected>
        )
      },
      {
        path: "/edit-profile",
        element:(
          <Protected authentication>
            <EditProfile/>
          </Protected>
        )
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
    
   // </React.StrictMode>
)
