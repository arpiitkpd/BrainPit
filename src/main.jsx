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
import About from './pages/About.jsx'
import Setting from './pages/Setting.jsx'
import Trending from './pages/Trending.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:(  
              <Home/>
        ),
        children:[
          {
          path:"/post",
          element:(
            
              <Home/>
            

          )
        }
        ] 
      },
      
      
      {
        path:"/profile",
        element:(
          
            <Profile/>
       
        )
      },
      {
        path:"/addpost",
        element:(
        
            <AddPost/>
       
        )
      },
              
      {
        path:"/infotech/posts",
        element:(
          
            <Home tag="IT"/>
        
        )
      },
      {
        path:"/medical/posts",
        element:(
          
            <Home tag="Medical"/>
         
        )
      },
      {
        path:"/engineering/posts",
        element:(
         
            <Home tag="Engineering"/>
        
        )
      },
      {
        path:"/law/posts",
        element:(
     
            <Home tag="Law"/>
       
        )
      },
      {
        path:"/management/posts",
        element:(
        
            <Home tag="Management"/>
        
        )
      },
      {
        path:"/biotech/posts",
        element:(
         
            <Home tag="BioTechnology"/>
          
        )
      },
      {
        path:"/test",
        element:(
          
            <Test/>
     
        )
      },
      {
        path: "/post/:slug",
        element:(
         
            <Post/>
          
        )
      },
      
      {
        path: "/edit-post/:slug",
        element:(
         
            <EditPost/>
         
        )
      },
      {
        path: "/edit-profile",
        element:(
          
            <EditProfile/>
          
        )
      }, 
      {
        path: "/postQuery/:query",
        element:(
            <Home/>
         
        )
      },
      {
        path: "/postQuery/",
        element:(
        
            <Home/>
         
        )
      },
      {
        path: "/about",
        element:(
         
            <About/>
       
        )
      },
      {
        path: "/setting",
        element:(
         
            <Setting/>
       
        )
      },
      {
        path: "/trending",
        element:(
         
            <Trending/>
       
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
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
    
    </React.StrictMode>
)
