import './loading.css'
export default function LoadingPage(){
    return(
        <div className = 'loading-page d-flex justify-content-center flex-column align-items-center '>
        <div className = 'd-flex justify-content-center align-items-center ' >
            <span className = 'spinner' ></span>
        </div>
            <h1 className = 'mt-3 text-white'>Loading...</h1>
        </div>
    )
}