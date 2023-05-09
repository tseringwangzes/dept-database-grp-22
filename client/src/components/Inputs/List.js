import React, { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ToastContainer, toast } from 'react-toastify';
import { st_home_post, ft_home_post } from '../../services/Apis';

const InputableList = (props) => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [check, setCheck] = useState(true);
  var res, resRe;
  
  useEffect(() => {
    setItems(props.list || []);
  }, [props.list]);
  

  
//console.log('my array= ',props.list);
 

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = async () => {
    if (inputValue.trim() !== '') {
      const newList = [...items, inputValue];
      setItems(newList);
      setInputValue('');

      const myList = {
        email: props.emailID,
        subList: newList,
        type: 'List'
      }
      if (props.userType === 'F') {
        res = await ft_home_post(myList);
      } else {
        res = await st_home_post(myList);
      }
     

      if (res.status !== 200) {
        toast.error('Error While Adding New Item...')
      } else if (res.status === 200) {
        toast.success('Data Added!')
      }


    } else {
      toast.error('Server Error')
    }
  };

  const handleRemoveItem = async(index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    const myListRe = {
      email: props.emailID,
      subList: updatedItems,
      type: 'List'
    }

    try {

      if ( props.userType === 'F') {
        resRe = await ft_home_post(myListRe);
      } else {
        resRe = await st_home_post(myListRe);
      }
      
      if (resRe.status === 200) {
        toast.success('List Item Removed')
      } else {
        toast.error('Error While Removing Item')
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Erro!')
    }


  };

  if ( items === undefined || items === null) {
    setCheck(false);
  }

  return (
    <>
    <ToastContainer/>
    <div className="space-y-1">
      <div className="flex" style={{ width: '600px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter an item"
          className="border border-gray-300 rounded-lg px-4 py-2 w-96"
        />
        <button
          onClick={handleAddItem}
          className="ml-2 flex items-center justify-center bg-teal-500 hover:bg-teal-700 text-white rounded-full w-8 h-8 mt-1"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      {check && (
              <ul className="list-disc list-outside pl-2" style={{ width: '528px' }}>
                {items.map((item, index) => (
                  <li key={index} className="flex">
                    <span style={{ fontSize: '20px' }}>
                      <span className="" />
                      &#9679; {item}
                    </span>

                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="ml-auto flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 mt-0.5"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
      )}

    </div>
    </>
  );
};

export default InputableList;
