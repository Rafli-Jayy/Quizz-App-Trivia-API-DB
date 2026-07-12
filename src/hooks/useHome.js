import { useReducer, useEffect } from 'react'


export const initialConfig = {
  amount: "10",      
  category: "",      
  difficulty: "",   
  type: "",          
  duration: "15",    
};

function configReducer(state, action) {
  switch (action.type) {

    case 'UPDATE_FIELD':
      return {
        ...state, 
        [action.name]: action.value 
      };

    case 'RESET_CONFIG':
      return initialConfig;

    default:
      return state;
  }
}



export default function (){
    const [config, dispatch] = useReducer(configReducer, initialConfig);

    const handleChange = (e) => {
        dispatch({
            type: 'UPDATE_FIELD',
            name: e.target.name,
            value: e.target.value
        })
    }


    return {
        config,
        handleChange
    }
}