const Books = [
    {
        id: 1,
        name: 'Đắc nhân tâm',
        user: {
            name: 'Lê Anh Quân',
            startDay: '10/02/2021',
            endDay: '21/5/2021',
        },
        type:false,
        update:false,
    },
    {
        id: 2,
        name: 'Pride and Prejudice',
        user: {
            name: 'Nguyễn Văn A',
            startDay: '05/04/2024',
            endDay: '15/5/2024',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 3,
        name: 'To Kill a Mockingbird',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 4,
        name: '1984',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 5,
        name: 'The Great Gatsby',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 6,
        name: 'Moby Dick',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 7,
        name: 'War and Peace',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 8,
        name: 'One Hundred Years of Solitude',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 9,
        name: 'The Catcher in the Rye',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    },
    {
        id: 10,
        name: 'The Lord of the Rings',
        user: {
            name: '',
            startDay: '',
            endDay: '',
        }
        ,
        type:false,
        update:false,
    }
];
localStorage.setItem('books',JSON.stringify(Books));
const storedCheckString = localStorage.getItem('books');
const initialBooks = storedCheckString ? JSON.parse(storedCheckString) : [];
const reducerBooks = (state = initialBooks, action: { type: string, payload: any }) => {
    switch (action.type) {
        case "DELETE":
            const deleteBooks=state.map(function(e:any){
                if(e.id===action.payload){
                    e.user.name='';
                    e.user.startDay='';
                    e.user.endDay='';
                    e.type=false;
                    e.update=false;
                }
                return e;
            })
            localStorage.setItem('books', JSON.stringify(deleteBooks));
            return deleteBooks;
        case "CHANGESTATE":
            const stateBooks=state.map((e:any)=>{
                if(e.id==action.payload){
                    if(e.type==false){
                        e.type=true;
                    }else{
                        e.type=false;
                    }
                }
                return e
            })
            localStorage.setItem('books', JSON.stringify(stateBooks));
            return stateBooks;
        case "SUBMITFORM":
            const addUserBook=state.map((e:any)=>{
                if(e.name===action.payload.id){
                    e.user.name=action.payload.user.name;
                    e.user.startDay=action.payload.user.startDay;
                    e.user.endDay=action.payload.user.endDay;
                    e.update=false;
                }
                return e;
            })
            localStorage.setItem('books', JSON.stringify(addUserBook));
            return addUserBook;
        case "UPDATE":
            const updateBooks=state.map(function(e:any){
                if(e.id===action.payload){
                   e.update=true;
                }
                return e;
            })
            localStorage.setItem('books', JSON.stringify(updateBooks));
            return updateBooks;

        default:
            return state;
    }
};
export default reducerBooks;
