import React, { useContext, useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import ModalUser from './ModalUser';
import { ColorRing } from 'react-loader-spinner'
const Dashboard = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    const [totalRows, setTotalRows] = useState(0)
    const [startingtRow, setStartingRow] = useState(0)
    const [endingRow, setEndingRow] = useState(0)
    //modal
    const [show, setShow] = useState(false);
    const [actionModal, setActionModal] = useState('')
    const [userInfoData, setUserInfoData] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        setActionModal('CREATE')
    };
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
                } else {
                    toast.warning(respone?.em)
                }
            }
        })
    }
    const handleUpdateUser = (data) => {
        setActionModal('UPDATE')
        //trường hợp bị null
        data.groupId === null ? data.groupId = 1 : data.groupId = data.groupId
        data.sex === null ? data.sex = "Male" : data.sex = data.sex
        data.address === null ? data.address = "" : data.address = data.address
        setUserInfoData(data)
        setShow(true)
    }
    const handleRefresh = () => {
        setShowLoader(true); // Hiển thị loader khi nút được nhấn
        fetchAllUsers()
        setTimeout(() => {
            setShowLoader(false); // Ẩn loader sau 3 giây
        }, 3000); // 3000 milliseconds (3 giây)
    }
    return (
        <div className='dashboard-container'>
            <div className='container'>
                <ModalUser userInfoData={userInfoData} actionModal={actionModal} show={show} handleClose={handleClose} fetchAllUsers={fetchAllUsers} />
                <div className='dashboard-header my-3'>
                    <div className='title'><h3>Users List</h3></div>
                    <div className='actions d-flex flex-md-row flex-column gap-3 align-items-center'>
                        <div><i onClick={handleRefresh} role='button' className="text-success fa-2x fa fa-refresh" aria-hidden="true"></i></div>
                        <div><i onClick={handleShow} role='button' className="text-primary fa fa-2x fa-user-plus" aria-hidden="true"></i></div>
                        <div className='d-flex gap-2 align-items-center col-6 col-md-3'>
                            <span>Show</span>
                            <select name='limit' value={limit} onChange={(e) => handleSetLimit(e)} className="form-select">
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                            </select>
                            <span>entries</span>
                        </div>
                        {showLoader && (
                            <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        )}
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
                                        <th>{(page - 1) * limit + index + 1}</th>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td>{item?.Group?.name}</td>
                                        <td className='d-flex gap-4'>
                                            <i onClick={() => handleUpdateUser(item)} role='button' className="fa fa-pencil fa-2x text-warning" aria-hidden="true"></i>
                                            <i onClick={() => handleDeleteUser(item.id)} role='button' className="fa fa-eraser fa-2x text-danger" aria-hidden="true"></i>
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