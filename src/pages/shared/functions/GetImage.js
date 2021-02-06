export default function getFile(file){
    let reader = new FileReader();

    if (!file[0].name.match(/.(jpg|jpeg|png|gif|webp)$/i))
        return null
    else {
        reader.readAsDataURL(file[0]);
        reader.onload = () => {
            return reader.result
        }
    }
    return null
}