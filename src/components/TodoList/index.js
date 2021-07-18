import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import {selectCurrentWeatherInfo} from '../../redux/weather'
import { useSelector } from 'react-redux';
import TodoItem from '../../model/TodoItem';
import moment from 'moment';
import WeatherWidget from '../WeatherWidget';

const TodoList = () => {
    //Get the current weather which already stores in the redux store
    const currentWeather = useSelector(selectCurrentWeatherInfo);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Run everytime the user clicks on 'Refresh' button of the WeatherWidget Component
        if(!currentWeather) {
            return;
        }
        const currentItems = [...items];
        // To check if there is any empty item and awaiting for user to input
        const firsIdx = currentItems.findIndex(node => !node.isSaved);
        //If there is available
        if(firsIdx >= 0) {
            //update the first empty item with latest weather information, which gets from redux store
            currentItems[firsIdx].weather = currentWeather;
            //update the list again
            setItems(currentItems);
        } else {
            // there is no empty item, add a first one
            addTodoList();
        }
    }, [currentWeather])

    //Add an empty item into the list
    const addTodoList = () => {
        const currentItems = [...items];
        currentItems.unshift(new TodoItem(currentWeather));
        setItems(currentItems);
    }

    //Store the new item including weather information, timestamp
    const saveTodoItem = (index) => {
        const newItems = [...items];
        newItems[index].isSaved = true;
        newItems[index].timestamp = new Date();
        newItems[index].weather = currentWeather;
        setItems(newItems);
    }

    //Remove item from the todo list
    const removeTodoItem = (index) => {
        const removeItems = [...items];
        removeItems.splice(index, 1);
        if(!removeItems.length) {
            removeItems.push(new TodoItem(currentWeather));
        }
        setItems(removeItems);
    }

    //Update note value when user inputs something
    const onChangeText = (event, item) => {
        item.note = event.target.value;
    }

    return (
        <div className="border border-1 p-4">
            <div className="row mb-3">
                <div className="col-sm-6">
                    <p>To-Do List</p>
                </div>
                <div className="col-sm-6 text-end">
                    {/* Add new todo item button  */}
                    <button type="button" onClick={addTodoList} className="btn btn-outline-primary" test-id="addBtnTest">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            {/* Render Todo list here */}
            <ul className="list-group">
                {
                    !!items.length && items.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div className="absolute-btn--right">
                                {/* Remove todo item from the list */}
                                <button type="button" onClick={() => removeTodoItem(index)} className="btn btn-light">
                                    <FontAwesomeIcon color="red" icon={faTimes} />
                                </button>
                            </div>
                            {/* If the weather info already capture it will display the item detail */}
                            {/* and weather information which is reused the WeatherWidget Component. */}
                            {/* Otherwise an "Add" button and a textfield will be displayed for us to input */}
                            <div className="mt-5">
                                <WeatherWidget weatherData={item.weather} />
                            </div>
                            {
                                !item.isSaved ? (<div className="mb-3 mt-4">
                                    <label htmlFor="weatherNote" className="form-label">Note</label>
                                    <textarea className="form-control" id="weatherNote" rows="3" onChange={(event) => onChangeText(event, item)} defaultValue={item.note}></textarea>
                                    <button type="button"  onClick={() => saveTodoItem(index)} className="btn btn-success mt-3">Add</button>
                                </div>) : (<div className="mb-3 mt-5">
                                    
                                    <p className="pt-3">Created Date</p>
                                    <p className="text-muted">{item.timestamp ? moment(item.timestamp).format('Do MMMM YYYY') : ''}</p>
                                    <p>Note</p>
                                    <p className="text-muted">{item.note}</p>
                                </div>)
                            }
                        </li>
                    ))
                }
            </ul>
            {
                !items.length && <div><p>There is no items</p></div>
            }
        </div>
    )
} 

export default TodoList;