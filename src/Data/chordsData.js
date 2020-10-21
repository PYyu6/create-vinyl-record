

const pitch = ["C", "C#", "D", "D#", "E", "F", 
"F#", "G","G#", "A", "A#", "B"]


// let data_collection = {key: keyboard, col_display: col_display, 
//                           opa:opa, col_origin: col_origin, pitch: pitch}

const datas = {}

pitch.forEach((value, ind) =>{


datas[value] = ind
})

export default datas