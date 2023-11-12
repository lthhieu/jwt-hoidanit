import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { fetchProjects, deleteProject } from '../../services/projectService'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';
import ModalProject from './ModalProject';
const TableProject = forwardRef((props, ref) => {
    const [projects, setProjects] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    const [totalRows, setTotalRows] = useState(0)
    const [startingRow, setStartingRow] = useState(0)
    const [endingRow, setEndingRow] = useState(0)
    useEffect(() => {
        fetchAllProjects()
    }, [page, limit])
    useImperativeHandle(ref, () => ({
        fetchAllProjectsAgain() {
            fetchAllProjects()
        }

    }));
    const fetchAllProjects = async () => {
        let response = await fetchProjects(page, limit)
        if (+response?.ec === 0) {
            setProjects(response?.dt?.projects)
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
    const handleDeleteProject = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            confirmButtonText: 'Yes, delete it',
            confirmButtonColor: '#3085d6',
            showCloseButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let response = await deleteProject(id)
                if (+response?.ec === 0) {
                    toast.success(response?.em)
                    await fetchAllProjects()
                } else {
                    toast.warning(response?.em)
                }
            }
        })
    }
    const handleUpdateProject = (role) => {
        setShow(true)
        setProjectData(role)
    }
    const [projectData, setProjectData] = useState({})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (<><hr />
        <ModalProject fetchAllProjects={fetchAllProjects} projectData={projectData} show={show} handleClose={handleClose} />
        <div className='d-flex gap-2 gap-md-4 flex-column flex-md-row'><h3>Project Table</h3>
            <div className='d-flex gap-2 align-items-center col-6 col-md-3'>
                <span>Show</span>
                <select name='limit' value={limit} onChange={(e) => handleSetLimit(e)} className="form-select">
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
                <span>entries</span>
            </div></div>
        <div className='table-role-body'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.length > 0 ? <>
                        {projects.map((item, index) => {
                            return (<tr key={`row-${index}`}>
                                <th>{(page - 1) * limit + index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>

                                <td className='d-flex gap-4'>
                                    <i onClick={() => handleUpdateProject(item)} role='button' className="fa fa-pencil fa-2x text-warning" aria-hidden="true"></i>
                                    <i onClick={() => handleDeleteProject(item.id)} role='button' className="fa fa-eraser fa-2x text-danger" aria-hidden="true"></i>
                                </td>
                            </tr>)
                        })}
                    </> : <><tr><td>No any projects</td></tr></>}
                </tbody>
            </table>
        </div>
        <div className='table-role-footer'>
            {totalPages > 0 &&
                <div className='row'>
                    <div className='col-12 col-md-6 text-center text-md-start'><span>Showing {startingRow} to {endingRow} of {totalRows} entries</span></div>
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
    </>
    );
})

export default TableProject;