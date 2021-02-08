export default function getFile(file){
    
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        
        

        reader.onload = () => {
          resolve(reader.result);
        };
    
        reader.onerror = reject;
    
        reader.readAsDataURL(file[0]);
      })
    
    // let reader = new FileReader();
    // let response = null

    // await 
    // reader.onload = () => {
    //     response = reader.result
    // }
    
    // console.log(response)
    // if (file[0].name.match(/.(jpg|jpeg|png|gif|webp)$/i)){
    //     return response    
    // }
    // else 
    //     return null
}