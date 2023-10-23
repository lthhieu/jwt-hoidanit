import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import ModalUser from './ModalUser';
const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const [totalPages, setTotalPages] = useState(0)
    const [totalRows, setTotalRows] = useState(0)
    const [startingtRow, setStartingRow] = useState(0)
    const [endingRow, setEndingRow] = useState(0)
    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        fetchAllUsers()
    }, [page, limit])
    const fetchAllUsers = async () => {
        let response = await fetchUsers(page, limit)
        if (+response?.ec === 0) {
            setUsers(response?.dt?.users)
            setTotalPages(response?.dt?.totalPages)
            setTotalRows(response?.dt?.totalRows)
            setStartingRow(response?.dt?.startingRow)
            setEndingRow(response?.dt?.endingRow)
        }
    }
    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }
    const handleSetLimit = (e) => {
        setLimit(e.target.value)
        setPage(1)
    }
    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            confirmButtonText: 'Yes, delete it',
            confirmButtonColor: '#3085d6',
            showCloseButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let respone = await deleteUser(id)
                if (+respone?.ec === 0) {
                    toast.success(respone?.em)
                    await fetchAllUsers()
                }
            }
        })
    }
    return (
        <div className='dashboard-container'>
            <div className='container'>
                <ModalUser title="Create user" show={show} handleClose={handleClose} fetchAllUsers={fetchAllUsers} />
                <div className='dashboard-header'>
                    <div className='title'><h3>Users List</h3></div>
                    <div className='actions d-flex flex-md-row flex-column gap-2'>
                        <div><button className='btn btn-success'>Refresh</button></div>
                        <div><button onClick={handleShow} className='btn btn-primary'>Create new user</button></div>
                        <div className='d-flex gap-2 align-items-center col-6 col-md-3'>
                            <span>Show</span>
                            <select name='limit' value={limit} onChange={(e) => handleSetLimit(e)} className="form-select">
                                <option value={2}>2</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                            </select>
                            <span>entries</span>
                        </div>
                    </div>
                </div>
                <div className='dashboard-body'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Group</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 ? <>
                                {users.map((item, index) => {
                                    return (<tr key={`row-${index}`}>
                                        <th>{index + 1}</th>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td>{item?.Group?.name}</td>
                                        <td className='d-flex gap-2'>
                                            <button className='btn btn-warning'>Edit</button>
                                            <button onClick={() => handleDeleteUser(item.id)} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>)
                                })}
                            </> : <><tr><td>No any users</td></tr></>}
                        </tbody>
                    </table>
                </div>
                <div className='dashboard-footer'>
                    {totalPages > 0 &&
                        <div className='row'>
                            <div className='col-12 col-md-6 text-center text-md-start'><span>Showing {startingtRow} to {endingRow} of {totalRows} entries</span></div>
                            <div className='col-12 col-md-6 mt-2 mt-md-0 d-flex justify-content-center justify-content-md-end'>
                                <ReactPaginate
                                    nextLabel="&raquo;"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={2}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPages}
                                    previousLabel="&laquo;"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;