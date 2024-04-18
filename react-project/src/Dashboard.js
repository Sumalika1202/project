import React, { useState, useEffect } from 'react';
import './styles.css'; 

function Subpage() {
    const [taskText, setTaskText] = useState('');
    const [deadline, setDeadline] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        showProfile();
    }, []);

    const handleTaskTextChange = (event) => {
        setTaskText(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const addTask = () => {
        if (taskText.trim() === '') {
            alert("You must enter a task.");
            return;
        }

        const currentDate = new Date();
        const newTask = {
            text: taskText,
            deadline: new Date(deadline),
            overdue: currentDate > new Date(deadline)
        };

        setTasks([...tasks, newTask]);
        setTaskText('');
        setDeadline('');
    };

    const removeTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const finishedTasks = tasks.filter(task => task.overdue);

    return (
        <div className="container">
            <div className="sidebar">
                <p><strong>Dashboard</strong></p>
                <button onClick={showProfile}><b>Profile</b></button>
                <button onClick={showTasks}><b>Tasks</b></button>
            </div>
            <div className="content">
                <div className="Profile" id="Profile">
                    <p><b>Your Profile</b></p>
                    <div className="box3">
                        <div className="box3-1">
                            <table cellSpacing="10" cellPadding="10">
                                <tr>
                                    <td id="finishedTasksTitle">Finished tasks</td>
                                    <td id="ongoingTasksTitle">On going tasks</td>
                                </tr>
                                <tr>
                                    <td id="finishedTasksCount">{finishedTasks.length}</td>
                                    <td id="ongoingTasksCount">{tasks.length - finishedTasks.length}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <ul>
                        {finishedTasks.map((task, index) => (
                            <li key={index} className={task.overdue ? 'overdue' : ''}>
                                {task.text}
                                <span onClick={() => removeTask(index)}>&times;</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="Tasks" id="Tasks">
                    <div className="box2">
                        <div className="tasks-list">
                            <p>Your Tasks</p>
                            <div className="text">
                                <input type="text" value={taskText} onChange={handleTaskTextChange} placeholder="Add your tasks" />
                                <input type="date" value={deadline} onChange={handleDeadlineChange} placeholder="Set Deadline" />
                                <button onClick={addTask} id="addbutton">Add</button>
                            </div>
                            <ul>
                                {tasks.map((task, index) => (
                                    <li key={index} className={task.overdue ? 'overdue' : ''}>
                                        {task.text}
                                        <span onClick={() => removeTask(index)}>&times;</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function showProfile() {
    document.getElementById("Profile").style.display = "block";
    document.getElementById("Tasks").style.display = "none";
}

function showTasks() {
    document.getElementById("Profile").style.display = "none";
    document.getElementById("Tasks").style.display = "block";
}

export default Subpage;

