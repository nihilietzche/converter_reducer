export default function(state, action){
    switch(action.type){
        case 'changeToCurrency':{
            return{
                    fromCurrency: state.fromCurrency,
                    toCurrency: action.toCurrency,
                }
        }
        case 'changeFromCurrency':{
            return{
                    toCurrency: state.toCurrency,
                    fromCurrency: action.fromCurrency,
                }
        }
        case 'changeFromPrice':{
            return{
                ...state,
                toPrice: action.toPrice,
                fromPrice: action.fromPrice,
            }
        }
        case 'changeToPrice':{
            return{
                ...state,
                fromPrice: action.fromPrice,
                toPrice: action.toPrice,
            }
        }
    }
}