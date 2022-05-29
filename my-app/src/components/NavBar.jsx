import {Link} from 'react-router-dom'

function NavBar(){
    return(
        <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to='/'>My React App</Link>
            
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className='nav-link' to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to='/admin/login'>Admin</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;