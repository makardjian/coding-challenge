# Backend API Documentation

## Read (GET)
app.get('/tasks', callback)
*Catalyst: User loads the application in the browser window
*Use-case: User wants to view her tasks
*Callback: Retrieves all the task, group, and dependency data from the db
*Request Params: None

## Update (PUT)
app.put('/')
*Catalyst: User toggles a task from incomplete to complete
*Use-case: User completes a task on her to-do list
*Callback: Adds current date to the completed_at column in the task table for the toggled task.
*Request Params: toggled task ID

## Update (PUT)
app.put('/')
*Catalyst: User toggles a task from incomplete to complete
*Use-case: User completes a task on her to-do list
*Callback: Updates the pre-req-completed column in the dependecies table to true for all rows whose pre-req-id is equal to to toggledtask ID
*Request Params: toggled task ID

## Update (PUT)
app.put('/')
*Catalyst: User toggles a task from complete back to incomplete
*Use-case: User had accidentally toggled the item as complete and now wants to revert to incomplete.
*Callback: Updates the pre-req-completed column in the dependecies table to false for all rows with the toggledTask Id in the pre-req-id column. Additionally, task_ids for all rows dependent on the toggled task will be added to a queue and any rows whose pre_req_id is equal to the task_ids in that queue must also be updated with a pre-req-status of 'false'. The callback should return a list of every task_id that was added to the queue.
*Request Params: toggled task ID

## Update (PUT)
app.put('/')
*Catalyst: User toggles a task from complete back to incomplete
*Use-case: User had accidentally toggled the item as complete and now wants to revert to incomplete.
*Callback: Updates the completed_at column to null for every id in the passed-in array
*Request Params: an array of task_ids




