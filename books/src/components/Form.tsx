import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

interface User {
    name: string;
    startDay: string;
    endDay: string;
    nameBook:string;
}

export default function Form() {
    const userBook: any = useSelector((state) => state);
    const dispatch = useDispatch();
    const [user, setUser] = useState<User>({ name: '', startDay: '', endDay: '',nameBook:''});
    const [selected, setSelected] = useState<string>('');
    const [checked, setChecked] = useState<any>({ name: true, startDay: true, endDay: true, nameBook: true });
    const clearCheck=()=>{
        setChecked({ name: true, startDay: true, endDay: true, nameBook: true });
    }
    const clearUser=()=>{
        setUser({ name: '', startDay: '', endDay: '',nameBook:''});
    }
    useEffect(()=>{
        userBook.reducerBooks.forEach(function(e:any){
            if(e.update===true){
                clearCheck();
                clearUser();
               setUser({
                    name:e.user.name,
                    startDay:e.user.startDay,
                    endDay:e.user.endDay,
                    nameBook:e.name
                })
            }
        });
    },[])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        // Cập nhật trạng thái checked nếu người dùng nhập dữ liệu đúng
        if (value.trim() !== '') {
            setChecked((prevState: any) => ({ ...prevState, [name]: true }));
        }
    };

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
        // Kiểm tra xem sách đã được mượn chưa và cập nhật trạng thái nameBook
        // setChecked((prevState: any) => ({
        //     ...prevState,
        //     nameBook: findBook(event.target.value)
        // }));
    };

    const findBook = (name: string) => {
        if (!userBook.reducerBook || !Array.isArray(userBook.reducerBook)) {
            return false;
        }
        let find = userBook.reducerBook.find((e: any) => e.name === name);
        return find ? find.type !== false : false;
    };

    const handleRegister = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let ok = true;
        if (user.name.trim() === '') {
            setChecked((prevState: any) => ({ ...prevState, name: false }));
            ok = false;
        }
        if (user.startDay === '') {
            setChecked((prevState: any) => ({ ...prevState, startDay: false }));
            ok = false;
        }
        if (user.endDay === '') {
            setChecked((prevState: any) => ({ ...prevState, endDay: false }));
            ok = false;
        }
        // if (!findBook(selected)) {
        //     setChecked((prevState: any) => ({ ...prevState, nameBook: false }));
        //     ok = false;
        // }

        if (ok) {
            dispatch({
                type: 'SUBMITFORM',
                payload: {
                    id: selected,
                    user: user,
                },
            });
            clearCheck();
            clearUser();
        }
    };

    return (
        <form>
            <h4>Thêm thông tin mượn sách</h4>
            <div>
                <select name="books"  onChange={handleSelect}>
                    {userBook.reducerBooks.map((e: any) => (
                        <option key={e.id} value={e.name}>{e.name}</option>
                    ))}
                </select>
                {checked.nameBook ? null : <div>Sách đang có người mượn</div>}
            </div>
            <div>
                <label htmlFor="name">Tên người nhận</label>
                <br />
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
                {checked.name ? null : <div>Bạn chưa điền tên</div>}
            </div>
            <div>
                <label htmlFor="startDay">Ngày mượn</label>
                <br />
                <input
                    type="text"
                    name="startDay"
                    value={user.startDay}
                    onChange={handleChange}
                />
                {checked.startDay ? null : <div>Bạn chưa điền ngày mượn</div>}
            </div>
            <div>
                <label htmlFor="endDay">Ngày trả</label>
                <br />
                <input
                    type="text"
                    name="endDay"
                    value={user.endDay}
                    onChange={handleChange}
                />
                {checked.endDay ? null : <div>Bạn chưa điền ngày trả</div>}
            </div>
            <br />
            <button onClick={handleRegister}>Submit</button>
        </form>
    );
}
