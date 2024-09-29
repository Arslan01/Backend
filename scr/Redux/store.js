import {configureStore} from '@reduxjs/toolkit';
import productSlice from './productSlice.js';
import counterReducer from './counterSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export default store


//in main.js file add <Provider store={store}><App /></Provider>
//products.jsx forntend file = 

Product =()=>{
    const products = useSelector((state) => state.product.products);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch],
    console.log(products)
);
}