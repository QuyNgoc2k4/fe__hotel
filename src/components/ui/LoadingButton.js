interface LoadingButtonProgs{
    loading: Boolean,
    text: String,
    className: String,
}
const LoadingButton = ({loading, text, className}: LoadingButtonProgs) => {
    return(
        <>
          <button type="submit" className={className}
                disabled={loading} >
                {loading ? ( <i className="fa-solid fa-sync fa-spin"></i>) : (text)}
              </button>
        </>
    )
}

export default LoadingButton
