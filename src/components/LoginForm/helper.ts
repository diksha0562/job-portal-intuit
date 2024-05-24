export const validateLogin = (values)=>{
    return new Promise((resolve) => {
        setTimeout(()=>resolve(values), 500);
      });
}