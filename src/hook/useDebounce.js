//src/hook/useDenbounce
const useDebounce = (value, delay) => {


   const debounce = (func: AnalyserNode, timeout = 300) =>{
    let timer: any;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() =>{
                func.apply(this, args);
            }, timeout);
        };
    }
    return {debounce}
}

export default useDebounce;
