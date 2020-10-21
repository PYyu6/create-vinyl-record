const count = 12
const col_origin = {
            1: ['#F8B3B9', '#FAC8B5', '#FDD8B2', '#ffecb3', 
                '#fff9c4', '#dcedc8', '#c8e6c9', '#b2dfdb',
                '#b2ebf2', '#bbdefb', '#c5cae9', '#E3C3E4'],
            
            2: ['#F4879', '#F8A98C', '#FBC286', '#ffe082',
                '#fff59d', '#c5e1a5','#a5d6a7', '#80cbc4',
                '#80deea', '#90caf9', '#9fa8da', '#D3A1D4'],

            3:['#F05A67', '#F58960', '#FAAB58','#ffd54f',
                '#fff176','#aed581','#81c784','#4db6ac',
                '#4dd0e1', '#64b5f6', '#7986cb','#C37DC4'],

            4: ['#D44F5B', '#D87955','#dd974e', '#e3b700',
               '#fdd835', '#7cb342', '#43a047', '#00897b',
               '#00acc1', '#2A91C2', '#673ab7', '#AC6EAD'],

            5: ['#B7444E', '#BA6849', '#b67939', '#cea706',
                '#fbc02d', '#689f38', '#388e3c', '#00796b',
                '#0097a7', '#0d47a1', '#4527a0', '#945F95']
            }
const keyboard= ['a', 'w', 's', 'e', 'd', 'f','t', 'g', 'y', 'h', 'u', 'j']
const opa = Array(count).fill(0)
const col_display = Array(count).fill("white")

const pitch = ["C", "C#", "D", "D#", "E", "F", 
               "F#", "G","G#", "A", "A#", "B"]


// let data_collection = {key: keyboard, col_display: col_display, 
//                           opa:opa, col_origin: col_origin, pitch: pitch}

const datas = {}

Object.keys(col_origin).forEach(ind =>{
    let obj = []
    let data_collection = {key: keyboard, col_display: col_display, 
        opa:opa, col_origin: col_origin[ind], pitch: pitch}

    
    Object.keys(data_collection).forEach(key => {
        // for each array element of the property obj[key]
        data_collection[key].forEach((value, index) => {
        // if an object doesn't exists at the current index in result
        // create it
    
        if (!obj[index]) {
        obj[index] = {}
        }
        // at the result index, set the key to the current value
        obj[index][key] = value
        })
    })

    datas[ind] = obj
})
export default datas 