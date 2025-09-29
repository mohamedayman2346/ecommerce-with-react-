
export default function TransformDate(date){
    const dateNow = new Date(date);
    const year = dateNow.getFullYear();
    const month = (dateNow.getMonth() + 1).toString().padStart(2, '0');
    const day = dateNow.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}