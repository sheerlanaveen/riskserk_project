import React, { useEffect, useState } from "react";
import "./records.css"
import axios from "axios";
import { Col, PageItem, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";



export const Records = () => {
    const [data, setData] = useState([])
    const [value, setValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [pageLimit] = useState(5)

    const sortOptions = ["name", "salary"]

    const fetchingData = async (start, end, increase) => {
        return await axios
            .get(`http://localhost:5000/records?_start=${start}&_end=${end}`)
            .then(response => {
                setData(response.data);
                setCurrentPage(currentPage + increase)
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        fetchingData(0, 5, 0);
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault()
        return await axios
            .get(`http://localhost:5000/records?q=${value}`)
            .then((res) => {
                setData(res.data)
                setValue("");
            })
            .catch((error) => console.log(error))
    }
    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value)
        return await axios
            .get(`http://localhost:5000/records?_sort=${value}`)
            .then((res) => {
                setData(res.data)
                setValue("");
            })
            .catch((error) => console.log(error))
    }

    const renderPagination = () => {
        if (currentPage === 0) {
            return (
                <Pagination>
                    <PageItem>
                        <Link>1</Link>
                    </PageItem>
                    <PageItem>
                        <button onClick={() => fetchingData(4,8,1)}>Next</button>
                    </PageItem>
                </Pagination>
            );

        }
        else if (currentPage < pageLimit - 1 && data.length === pageLimit) { 
        return (

            <Pagination>
                <PageItem>
                    <button onClick={() => fetchingData((currentPage - 1) * 4, currentPage * 4, -1)}>Prev</button>
                </PageItem>
                <PageItem>
                    <Link>{currentPage + 1}</Link>
                </PageItem>
                <PageItem>
                    <button onClick={() => fetchingData((currentPage + 1) * 4, (currentPage + 2) * 4, 1)}>Next</button>
                </PageItem>
            </Pagination>
        )
        }
        else{
            return(
                <Pagination>
                    <PageItem>
                    <button onClick={() => fetchingData(4, 8)}>Prev</button>
                </PageItem>
                <PageItem>
                    <Link>{currentPage +1 }</Link>
                </PageItem>
                
            </Pagination>
            )
        }
    }
   

    return (
        <>
            <div  >
                < div className="d-flex justify-content-start">
                    <form className="d-flex input-grop w-auto" onSubmit={handleSearch} >
                        <input type="text" className="d-flex align-item-center" placeholder="search" value={value} onChange={(e) => setValue(e.target.value)} style={{ height: '40px', width: '50%', borderRadius: '5px' }} />
                        <button type="submit" style={{ height: '40px', width: '25%', borderRadius: '5px' }}>search</button>
                    </form>
                    <Col size={8} style={{ marginLeft: '10px' }}> <h6>sortBy:</h6>
                        <span><select style={{ width: "15%", borderRadius: '2px', height: '30px' }}
                            onChange={handleSort}
                            value={sortValue}>
                            <option>Please selct value</option>
                            {sortOptions.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select></span>
                    </Col>
                    <button type="button" class="btn btn-primary">+ New Project</button>

                </div>
            </div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Naame</th>
                            <th scope="col">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>{renderPagination()}</div>
            </div>
        </>
    )
}