import { useEffect, useState } from "react";
import * as UserService from "../services/userService";
import UserListItem from "./UserListItem";
import CreateUserModal from "./CreateUserModal";
import UserInfoModal from "./UserInfoModal";
import UserDeleteModal from "./UserDeleteModal";
import Spinner from "./Spinner";




const UserListTable = () =>{

   const [users, setUsers] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [showCreate, setShowCreate] = useState(false);
   const [showInfo, setShowInfo] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
   const [showDelete, setShowDelete] = useState(false);

   useEffect(() => {
     setIsLoading(true);
      UserService.getAll()
      .then(result => setUsers(result))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))

   }, []);

    const createUserClickHandler = () =>{
        setShowCreate(true); 
    }

    const hideCreateUserModal = () =>{
        setShowCreate(false); 
    }

    const userCreateHandler = async (e) =>{
        // Stop page from reloading
        e.preventDefault();
        
        // Get data from form data
        const data = Object.fromEntries(new FormData(e.currentTarget));

        // Create new uset at the server
        const newUser = await UserService.create(data);

        // Add newly created user to the local state
        setUsers(state => [...state, newUser]);
        
        // Close the modal
        setShowCreate(false); 
    }

    const userInfoClickHandler = async (userId) => {
        setSelectedUser(userId);
        setShowInfo(true);
    }


    const deleteUserHandlerClick = (userId) => {
       setSelectedUser(userId);
       setShowDelete(true);
 
    }

    const deleteUserHandler = async () => {
    // Remove user from server
       await userService.remove(selectedUser);

    // Remove user from state
       setUsers(state => state.filter(user => user._id !== selectedUser));

    // Close the delete modal
       setShowDelete(false);
  
    };


    return(<div className="table-wrapper">
        
        {showCreate && <CreateUserModal 
        onClose={hideCreateUserModal}
        onCreate={userCreateHandler}
        
        />}

        {showInfo && (<UserInfoModal onClose={() => setShowInfo(false)} userId={selectedUser}/>)}

        {showDelete && <UserDeleteModal 
        onClose={() => setShowDelete(false)}
        onDelete={deleteUserHandler}
        />}

        {isLoading && <Spinner/>}

        <table className="table">
          <thead>
            <tr>
              <th>
                Image
              </th>
              <th>
                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                  data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                  className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>
                Created
                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                  data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor"
                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                  </path>
                </svg>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
                <UserListItem 
                key={user._id}
                userId={user._id}
                createdAt={user.createdAt}
                email={user.email}
                firstName={user.firstName}
                imageUrl={user.imageUrl}
                lastName={user.lastName}
                phoneNumber={user.phoneNumber}
                onInfoClick={userInfoClickHandler}
                onDeleteClick={deleteUserHandlerClick}
                />
            ))}
          </tbody>
        </table>

        <button className="btn-add btn" onClick={createUserClickHandler}>Add new user</button>

       

      </div>)
}
export default UserListTable;