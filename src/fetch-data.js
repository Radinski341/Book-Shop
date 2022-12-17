import { useEffect } from "react"
import { useGlobalProvider } from './context';

const useFetch = (url, page) => {
    const {dispatch} = useGlobalProvider();
    
    useEffect(() => {
        dispatch({type: 'LOADING'})
        dispatch({type: 'CLEAR_SEARCH'})
        dispatch({type: 'CLOSE_NAV'})
        fetch(url)
        .then(request => request.json())
        .then(response => {
            dispatch({type: 'GET_DATA', payload: {results:response.results, records: response.count, page: page}})
        })
        .catch(error =>console.error(error))
    }, [url, dispatch, page])
}

export {useFetch}