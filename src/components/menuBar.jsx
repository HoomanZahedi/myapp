import React, { useState, useEffect,useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/auth';


export default function MenuBar() {
const context = useContext(AuthContext);
 const handleItemClick = (e, { name }) =>{
   setactiveItem(name);
  } 
  const [pathName, setPathName] = useState('');
  useEffect(() => {
    setPathName(window.location.pathname);
  }, [])
  const path=pathName==='/'?'home':pathName.substring(1);
  const [activeItem, setactiveItem] = useState(path)

    return (
      <div>
        {context.user?(
          <Menu pointing secondary color='teal'>
          <Menu.Item
            name={context.user.userName}
            active
            as={Link}
            to={'/'}
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='logout'
                onClick={context.logout}
            />
          </Menu.Menu>
        </Menu>
        ):(
          <Menu pointing secondary color='teal'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to={'/'}
          />
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to={'/login'}
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to={'/register'}
            />
          </Menu.Menu>
        </Menu>
        )}
        
      </div>
    )
  
}