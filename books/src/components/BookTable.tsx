import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function BookTable() {
    const dispatch = useDispatch();
    const stateBooks:any = useSelector((state) => state);
    const books :any= stateBooks.reducerBooks;
    const handleDelete = (id:number) => {
        dispatch({
            type: 'DELETE',
            payload: id,
        });
    };
    const handleSelect=(e:any)=>{
        dispatch({
            type: 'CHANGESTATE',
            payload: e.target.id,
        });
    }
    const handleUpdate=(id:any)=>{
        dispatch({
            type:"UPDATE",
            payload:id,
        })
    }
    return (
        <div>
            <h2>Quản lý mượn trả sách</h2>
            <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên sách</th>
                    <th>Sinh viên mượn</th>
                    <th>Ngày mượn</th>
                    <th>Ngày trả</th>
                    <th>Trạng thái</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
                {books.map((e:any, index:number) => {
                    if (e.user.name === '') {
                        return null;
                    }
                    return (
                        <tr key={e.id}>
                            <td>1</td>
                            <td>{e.name}</td>
                            <td>{e.user.name}</td>
                            <td>{e.user.startDay}</td>
                            <td>{e.user.endDay}</td>
                            <td>
                                <select name="" value={e.type?"Đã trả":"Chưa trả"} id={e.id} onChange={(e)=>{handleSelect(e)}}>
                                    <option value="Chưa trả">Chưa trả</option>
                                    <option value="Đã trả">Đã trả</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={()=>handleUpdate(e.id)} >Sửa</button>
                                <button onClick={() => handleDelete(e.id)}>Xóa</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    );
}
